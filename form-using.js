// form-using.js - validation, preview, and summary for registration form
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('registrationForm');
	const profilePic = document.getElementById('profilePic');
	const imagePreview = document.getElementById('imagePreview');
	const summary = document.getElementById('summary');
	const summaryCard = document.getElementById('summaryCard');

	// image preview
	profilePic.addEventListener('change', (e) => {
		const file = e.target.files && e.target.files[0];
		imagePreview.innerHTML = '';
		if (!file) return;
		if (!file.type.startsWith('image/')) return;
		const img = document.createElement('img');
		img.alt = 'Profile';
		img.src = URL.createObjectURL(file);
		imagePreview.appendChild(img);
	});

	function collectHobbies() {
		return Array.from(document.querySelectorAll('input[name="hobby"]:checked')).map(i => i.value);
	}

	function validatePasswords() {
		const pw = document.getElementById('password').value;
		const cpw = document.getElementById('confirmPassword').value;
		if (pw !== cpw) {
			document.getElementById('confirmPassword').setCustomValidity('Passwords do not match');
			return false;
		}
		document.getElementById('confirmPassword').setCustomValidity('');
		return true;
	}

	document.getElementById('confirmPassword').addEventListener('input', validatePasswords);
	document.getElementById('password').addEventListener('input', validatePasswords);

	form.addEventListener('submit', function (ev) {
		ev.preventDefault();
		// run built-in constraints
		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}
		if (!validatePasswords()) return;

		// build summary
		const data = {
			name: `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`.trim(),
			email: document.getElementById('email').value,
			dob: document.getElementById('dob').value,
			gender: document.getElementById('gender').value,
			phone: document.getElementById('phone').value,
			website: document.getElementById('website').value,
			address: document.getElementById('address').value,
			city: document.getElementById('city').value,
			state: document.getElementById('state').value,
			zip: document.getElementById('zip').value,
			country: document.getElementById('country').value,
			occupation: document.getElementById('occupation').value,
			company: document.getElementById('company').value,
			social: document.getElementById('social').value,
			hobbies: collectHobbies()
		};

		const file = profilePic.files && profilePic.files[0];
		let imgHtml = '';
		if (file && file.type.startsWith('image/')) {
			imgHtml = `<div style="margin-bottom:10px"><img src="${URL.createObjectURL(file)}" alt="avatar" style="max-width:120px;border-radius:8px;"/></div>`;
		}

		summaryCard.innerHTML = `
			${imgHtml}
			<div><strong>Name:</strong> ${escapeHtml(data.name)}</div>
			<div><strong>Email:</strong> ${escapeHtml(data.email)}</div>
			<div><strong>DOB:</strong> ${escapeHtml(data.dob)}</div>
			<div><strong>Gender:</strong> ${escapeHtml(data.gender)}</div>
			<div><strong>Phone:</strong> ${escapeHtml(data.phone)}</div>
			<div><strong>Website:</strong> ${escapeHtml(data.website)}</div>
			<div><strong>Address:</strong> ${escapeHtml(data.address)}</div>
			<div><strong>Location:</strong> ${escapeHtml([data.city, data.state, data.zip, data.country].filter(Boolean).join(', '))}</div>
			<div><strong>Occupation / Company:</strong> ${escapeHtml([data.occupation, data.company].filter(Boolean).join(' / '))}</div>
			<div><strong>Social:</strong> ${escapeHtml(data.social)}</div>
			<div><strong>Hobbies:</strong> ${escapeHtml(data.hobbies.join(', '))}</div>
		`;

		summary.classList.remove('hidden');
		summary.scrollIntoView({ behavior: 'smooth' });
	});

	// small helper to avoid injecting raw HTML
	function escapeHtml(str) {
		if (!str && str !== 0) return '';
		return String(str).replace(/[&<>"']/g, function (m) {
			return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[m];
		});
	}
});
