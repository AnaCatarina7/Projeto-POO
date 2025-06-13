import * as User from "../models/userModel.js"

User.initUsers()

document.querySelector('#signup-form').addEventListener('submit', (e) => {
  e.preventDefault();

  let inputName = document.querySelector('#signup-Fname').value.trim();
  let inputSurname = document.querySelector('#signup-Lname').value.trim();
  let inputEmail = document.querySelector('#signup-email').value.trim();
  let inputLocation = document.querySelector('#signup-city').value.trim();
  let userTypeSelect = document.querySelector('#userType').value.trim().toLowerCase();
  let inputPassword = document.querySelector('#signup-password').value.trim();

  if (!inputName || !inputSurname || !inputEmail || !inputLocation || !inputPassword) {
    alert('Unfilled data');
    return;
  }

  try {
    switch (userTypeSelect) {
      case 'aluno':
        Student.addStudent(inputName, inputSurname, inputEmail, inputLocation, inputPassword);
        alert('Student signed up');
        window.location.href = '/html/login.html';
        break;
      case 'tutor':
        const subjects = document.getElementById('selectedSubjects').value;
        Tutor.addTutor(inputName, inputSurname, inputEmail, inputLocation, inputPassword, subjects);
        alert('Tutor signed up');
        window.location.href = '/html/login.html';
        break;
      default:
        throw new Error("Invalid user");
    }
  } catch (error) {
    alert(error.message);
    console.error(error.message);
  }
});

// Setup tutor-specific UI elements
function setupTutorUI() {
  const userTypeSelect = document.getElementById('userType');
  const tutorFields = document.getElementById('tutorFields');
  
  // Update tutor fields visibility based on user type selection
  function updateTutorFieldsVisibility() {
    const isTutor = userTypeSelect.value.toLowerCase() === 'tutor';
    tutorFields.style.display = isTutor ? 'block' : 'none';
    document.getElementById('phone').required = isTutor;
    document.getElementById('bio').required = isTutor;
  }

  // Initialize visibility on page load
  updateTutorFieldsVisibility();
  
  // Update visibility when user type changes
  if (userTypeSelect) {
    userTypeSelect.addEventListener('change', updateTutorFieldsVisibility);
  }

  // Handle subject selection dropdown
  const subjectDropdown = document.getElementById('subjectDropdown');
  const subjectCheckboxes = document.querySelectorAll('#subjectDropdown + .dropdown-menu input[type="checkbox"]');
  const subjectHidden = document.getElementById('selectedSubjects');

  // For the subjects selection dropdown
  function updateSubjectSelection() {
    const selected = [];
    subjectCheckboxes.forEach(cb => {
      if (cb.checked) {
        selected.push(cb.value.replace("-", " - "));
      }
    });
    subjectHidden.value = selected.join(',');

    if (selected.length > 0) {
      subjectDropdown.innerHTML = selected.map(val => `<span class="badge-subject">${val}</span>`).join(' ');
    } else {
      subjectDropdown.textContent = 'Selecionar disciplinas';
    }
  }

  // Initialize subject selection events
if (subjectCheckboxes) {
    subjectCheckboxes.forEach(cb => {
      cb.addEventListener('change', updateSubjectSelection);
    });
    updateSubjectSelection();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', setupTutorUI);
