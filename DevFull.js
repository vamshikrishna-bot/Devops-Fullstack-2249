/*
// Event Management System with MongoDB - Complete Backend

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/eventManagement', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

// Event Schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
    validate: {
      validator: function(v) {
        return v >= new Date();
      },
      message: 'Event date must be in the future'
    }
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true
  },
  participants: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  }],
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  maxParticipants: {
    type: Number,
    min: [1, 'Must allow at least 1 participant']
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
eventSchema.index({ date: 1 });
eventSchema.index({ title: 'text', location: 'text' });

const Event = mongoose.model('Event', eventSchema);

// ==================== CRUD OPERATIONS ====================

// CREATE - Add a new event
app.post('/api/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Error creating event',
      error: err.message
    });
  }
});

// READ - Get all events with optional filters
app.get('/api/events', async (req, res) => {
  try {
    const { status, startDate, endDate, search, page = 1, limit = 10 } = req.query;
    
    const query = {};
    
    if (status) query.status = status;
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const skip = (page - 1) * limit;
    
    const events = await Event.find(query)
      .sort({ date: 1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Event.countDocuments(query);
    
    res.json({
      success: true,
      data: events,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching events',
      error: err.message
    });
  }
});

// READ - Get single event by ID
app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      data: event
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching event',
      error: err.message
    });
  }
});

// UPDATE - Update an event
app.put('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Event updated successfully',
      data: event
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Error updating event',
      error: err.message
    });
  }
});

// UPDATE - Add participant to event
app.post('/api/events/:id/participants', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    if (event.maxParticipants && event.participants.length >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Event is full'
      });
    }
    
    const emailExists = event.participants.some(p => p.email === req.body.email);
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Participant already registered'
      });
    }
    
    event.participants.push(req.body);
    await event.save();
    
    res.json({
      success: true,
      message: 'Participant added successfully',
      data: event
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Error adding participant',
      error: err.message
    });
  }
});

// DELETE - Remove participant from event
app.delete('/api/events/:id/participants/:participantId', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    event.participants = event.participants.filter(
      p => p._id.toString() !== req.params.participantId
    );
    
    await event.save();
    
    res.json({
      success: true,
      message: 'Participant removed successfully',
      data: event
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error removing participant',
      error: err.message
    });
  }
});

// DELETE - Delete an event
app.delete('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting event',
      error: err.message
    });
  }
});

// Get event statistics
app.get('/api/stats/events', async (req, res) => {
  try {
    const stats = await Event.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalParticipants: { $sum: { $size: '$participants' } }
        }
      }
    ]);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: err.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

module.exports = app;
*/