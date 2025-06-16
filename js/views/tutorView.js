import * as User from '../models/userModel.js';

// Check if a user is logged in and if they are a tutor
// If not, redirect them to the login page
if (!User.isLogged() || User.getLoggedUser()?.userType !== 'tutor') {
    window.location.href = '/html/login.html';
} else {
    loadTutorProfile();
}


function loadTutorProfile() {
    const tutor = User.getLoggedUser(); // Get the logged-in tutor's data.

    // Get DOM elements for the profile information
    const name = document.querySelector('#tutor-profile-name');
    const bio = document.querySelector('#tutor-profile-bio');
    const phone = document.querySelector('#tutor-phone');
    const email = document.querySelector('#tutor-email');
    const subjectsContainer = document.querySelector('#tutor-subjects-container');
    const modality = document.querySelector("#tutor-modality-container")
    const price = document.querySelector('#tutor-price');
    const educationLevel = document.querySelector("#tutor-educationLevel");
    const specialNeeds = document.querySelector("#tutor-specialNeeds");

    // Display tutor's basic info
    name.textContent = `Sobre ${tutor.name} ${tutor.surname}`;
    bio.textContent = tutor.bio || 'Sem descrição';
    phone.textContent = tutor.phone || 'Não informado';
    email.innerHTML = `<a href="mailto:${tutor.email}">${tutor.email}</a>`;
    price.textContent = tutor.price ? `${tutor.price}€/aula` : 'Sem informação';
    specialNeeds.innerHTML = `<span class="badge">${tutor.specialNeeds === 'yes' ? 'Sim' : 'Não'}</span>`;
    modality.innerHTML = tutor.modality.map(m => `<span class="badge">${m}</span>`).join(' ') || 'Não informado';


    // Display education levels (Básico, Secundário, ou ambos)
    if (tutor.educationLevel === 'ambos') {
    educationLevel.innerHTML = `
        <span class="badge">Ensino Básico</span>
        <span class="badge">Ensino Secundário</span>
    `;
    } else {
    educationLevel.innerHTML = `<span class="badge">${tutor.educationLevel}</span>`;
    }



    // Display the subjects the tutor teaches
    const subjects = tutor.subjects ?? [];
    if (subjects.length > 0) {
        subjectsContainer.innerHTML = subjects.map(subj =>
            `<span class="badge">${subj.replace(" - ", " ")}</span>`).join(' ');
    } else {
        subjectsContainer.innerHTML = 'Não informado';
    }

}



