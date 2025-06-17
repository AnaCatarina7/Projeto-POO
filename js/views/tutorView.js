import * as User from '../models/userModel.js';

// Check if a user is logged in
// If not, redirect them to the login page
if (!User.isLogged()) {
    window.location.href = '/html/login.html';
} else {
    loadTutorProfile();
}

function loadTutorProfile() {
    // First check if we're viewing a specific tutor from localStorage (clicked from tutorCatalog)
    const tutorEmail = localStorage.getItem('selectedTutorEmail');

    let tutor;

    // Logic to determine which tutor to load:
    if (tutorEmail) {
        const users = User.initUsers();
        tutor = users.find(user => user.email === tutorEmail);

        if (!tutor) {
            alert('Tutor not found!');
            window.location.href = 'tutorCatalog.html';
            return;
        }

        localStorage.removeItem('selectedTutorEmail');

        } else {
            tutor = User.getLoggedUser();
        }

    // Get DOM elements for profile information
    const name = document.querySelector('#tutor-profile-name');
    const bio = document.querySelector('#tutor-profile-bio');
    const phone = document.querySelector('#tutor-phone');
    const email = document.querySelector('#tutor-email');
    const subjectsContainer = document.querySelector('#tutor-subjects-container');
    const modality = document.querySelector("#tutor-modality-container");
    const price = document.querySelector('#tutor-price');
    const educationLevel = document.querySelector("#tutor-educationLevel");
    const specialNeeds = document.querySelector("#tutor-specialNeeds");

    // Display tutor's basic info
    name.textContent = `About ${tutor.name} ${tutor.surname}`;
    bio.textContent = tutor.bio || 'No description';
    phone.textContent = tutor.phone || 'Not provided';
    email.innerHTML = `<a href="mailto:${tutor.email}">${tutor.email}</a>`;
    price.textContent = tutor.price ? `${tutor.price}€/aula` : 'Preço não informado';
    specialNeeds.innerHTML = `<span class="badge">${tutor.specialNeeds || 'Não informado'}</span>`;
    
    // Safe handling for modality (can be string or array)
    modality.innerHTML = typeof tutor.modality === 'string' ? 
        `<span class="badge">${tutor.modality}</span>` :
        (tutor.modality?.map(m => `<span class="badge">${m}</span>`).join(' ') || 'Não Informado');

    // Education Level (original logic preserved)
    if (tutor.educationLevel === 'ambos') {
        educationLevel.innerHTML = `
            <span class="badge">Ensino Básico</span>
            <span class="badge">Ensino Secundário</span>
        `;
    } else {
        educationLevel.innerHTML = `<span class="badge">${tutor.educationLevel || 'Não Informado'}</span>`;
    }

    // Subjects (with safer handling)
    const subjects = tutor.subjects ?? [];
    subjectsContainer.innerHTML = subjects.length > 0 ? 
        subjects.map(subj => `<span class="badge">${subj.replace(" - ", " ")}</span>`).join(' ') : 
        'Não Informado';

    // Specific logic for when it's the tutor's own profile
    if (!tutorEmail && User.getLoggedUser()?.email === tutor.email) {
        console.log("Tutor a ver o seu perfil");
    }
}