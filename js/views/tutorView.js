import * as User from '../models/userModel.js';
const users = User.initUsers();
// Check if a user is logged in
// If not, redirect them to the login page
if (!User.isLogged()) {
    window.location.href = '/html/login.html';
} else {
    document.addEventListener('DOMContentLoaded', function () {
        loadTutorProfile();
        changeTutorData();
        subjectDropdown();
    })
}

export function loadTutorProfile() {
    // First check if we're viewing a specific tutor from localStorage (clicked from tutorCatalog)
    const tutorEmail = localStorage.getItem('selectedTutorEmail');
    let tutor;

    // Logic to determine which tutor to load:
    if (tutorEmail) {
        tutor = users.find(user => user.email === tutorEmail);

        if (!tutor) {
            alert('Tutor not found!');
            window.location.href = '/index.html';
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
    const level = document.querySelector("#tutor-levels");
    const specialNeeds = document.querySelector("#tutor-specialNeeds");

    // Display tutor's basic info
    name.textContent = `About ${tutor.name} ${tutor.surname}`;
    bio.textContent = tutor.bio || 'No description';
    phone.textContent = tutor.phone || 'Not provided';
    email.innerHTML = `<a href="mailto:${tutor.email}">${tutor.email}</a>`;
    price.textContent = tutor.price ? `${tutor.price}€/aula` : 'Preço não informado';
    specialNeeds.innerHTML = `<span class="badge">${tutor.specialNeeds || 'Não informado'}</span>`;

    // Safe handling for modality
    modality.innerHTML = typeof tutor.modality === 'string' ? `<span class="badge">${tutor.modality}</span>` :
        (tutor.modality?.map(m => `<span class="badge">${m}</span>`).join(' ') || 'Não Informado');


    // Subjects 
    const subjects = tutor.subjects ?? [];
    subjectsContainer.innerHTML = subjects.length > 0 ?
        subjects.map(subj => `<span class="badge">${subj.replace(" - ", " ")}</span>`).join(' ') :
        'Não Informado';

    const displayValue = User.getDisplayLevels(tutor.levels); //Get the function from the user model (function that converts de values)

    if (Array.isArray(displayValue)) {
        level.innerHTML = displayValue.map(lvl => 
            `<span class="badge">${lvl}</span>`
        ).join(' ');
    } else {
        level.innerHTML = `<span class="badge">${displayValue}</span>`;
    }

    displayTutorMedals(tutor);

    // Contact tutor
    document.getElementById('contact-btn').addEventListener('click', () => {
    User.bookLesson(tutor.email)
    showSuccessMessage();
});

};

function changeTutorData() {
    // Get currently logged in user
    const loggedUser = User.getLoggedUser();

    // Fill form when modal opens
    document.getElementById('editProfileModal').addEventListener('show.bs.modal', () => {
        // Basic info
        document.getElementById("firstName").value = loggedUser.name || '';
        document.getElementById("lastName").value = loggedUser.surname || '';
        document.getElementById("email").value = loggedUser.email || '';
        document.getElementById("phone").value = loggedUser.phone || '';
        document.getElementById("signup-city").value = loggedUser.location || '';
        document.getElementById("bio").value = loggedUser.bio || '';
        document.getElementById("price").value = loggedUser.price || '';
        document.getElementById("specialNeedsYes").checked = loggedUser.specialNeeds === "Sim";
        document.getElementById("specialNeedsNo").checked = loggedUser.specialNeeds === "Não";
        document.getElementById("levels").value = loggedUser.levels || '';

        // Modalities (checks if its an array or not)
        const modalities = Array.isArray(loggedUser.modality) ? loggedUser.modality : [loggedUser.modality];
        document.getElementById("online").checked = modalities.includes('Online');
        document.getElementById("inPerson").checked = modalities.includes('Presencial');


        // Subjects (checkboxes)
        const subjects = loggedUser.subjects || [];
        document.querySelectorAll('.dropdown-menu input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = subjects.includes(checkbox.value);
        });
    });

    // Handle form submission when user clicks on "Save Changes"
    document.getElementById("saveChangesBtn").addEventListener("click", (e) => {
        e.preventDefault();

        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (newPassword && newPassword !== confirmPassword) {
            alert("As palavras-passes são diferentes!");
            return;
        } // Validate password confirmation

        // Collect updated data from the form
        const updatedData = {
            name: document.getElementById("firstName").value,
            surname: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            location: document.getElementById("signup-city").value,
            bio: document.getElementById("bio").value,
            price: document.getElementById("price").value,
            levels: document.getElementById("levels").value,
            modality: [
                document.getElementById("online").checked ? 'Online' : null,
                document.getElementById("inPerson").checked ? 'Presencial' : null
            ].filter(Boolean),
            specialNeeds: document.getElementById("specialNeedsYes").checked ? "Sim" : "Não",
            subjects: Array.from(document.querySelectorAll('.dropdown-menu input[type="checkbox"]:checked'))
                .map(checkbox => checkbox.value)
        };

        // Include password only if the user entered a new one
        if (newPassword) {
            updatedData.password = newPassword;
        }

        // Find the index of the logged-in user in the users array
        const userIndex = users.findIndex(u => u.email === loggedUser.email);
        
        if (userIndex !== -1) { // If user exists in the array
            users[userIndex] = { ...users[userIndex], ...updatedData };
            
        User.updateStorages(users[userIndex]);   // Synchronize data across all storage

        loadTutorProfile();

        const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
        modal.hide();  // Close the modal window
    }
    });
};

// For the Subjects Dropdown(Styling)
function subjectDropdown() {
    const subjectCheckboxes = document.querySelectorAll('#subjectDropdown + .dropdown-menu input[type="checkbox"]');
    const subjectButton = document.getElementById('subjectDropdown');
    const subjectHidden = document.getElementById('selectedSubjects');

    function updateSubjectSelection() {
        const selected = [];
        subjectCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selected.push(checkbox.value.replace("-", " - "));
            }
        });

        subjectHidden.value = selected.join(',');

        if (selected.length > 0) {
            subjectButton.innerHTML = selected.map(val => `<span class="badge-subject">${val}</span>`).join(' ');
        } else {
            subjectButton.textContent = 'Selecionar disciplinas';
        }
    }

    subjectCheckboxes.forEach(cb => cb.addEventListener('change', updateSubjectSelection));
    updateSubjectSelection();
}

// Contact tutor
document.getElementById('contact-btn').addEventListener('click', () => {
    // First check if we're viewing a specific tutor from localStorage (clicked from tutorCatalog)
    const tutorEmail = localStorage.getItem('selectedTutorEmail');
    let tutor;
    // Logic to determine which tutor to load:
    if (tutorEmail) {
        tutor = users.find(user => user.email === tutorEmail);
    }
    // console.log(tutorEmail);
    User.bookLesson(tutor.email)
    showSuccessMessage();
});

// Show alert
function showSuccessMessage() {

    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();

    setTimeout(() => {
        modal.hide();
    }, 2500);

}

// Badges
function displayTutorMedals(tutor) {
    const medalsContainer = document.querySelector('#tutor-medals');
    if (!tutor.badges || tutor.badges.length === 0) {
        medalsContainer.innerHTML = '<span class="text-muted small">Este tutor ainda não ganhou conquistas</span>';
        return;
    }

    medalsContainer.innerHTML = tutor.badges.map(badge => {
        return `<span class="tutor-medal">${badge}</span>`;
    }).join(' ');
}