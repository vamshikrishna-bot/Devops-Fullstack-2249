const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function main() {
  await client.connect();
  const db = client.db("collegeDB");
  const collection = db.collection("students");

  await collection.insertOne({ name: "Ravi", age: 21 });

  const result = await collection.find().toArray();
  console.log(result);
}

main();