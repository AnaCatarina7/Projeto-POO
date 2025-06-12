// Importações originais (código da sua colega)
import * as Student from "../models/studentModel.js";
import * as Tutor from "../models/tutorModel.js";

Student.init();
Tutor.init();

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

// Inputs da secção do  tutor
function setupTutorUI() {
  const userTypeSelect = document.getElementById('userType');
  const tutorFields = document.getElementById('tutorFields');
  
  // Mostrar/ocultar campos do tutor
  if (userTypeSelect) {
    userTypeSelect.addEventListener('change', function() {
      const isTutor = this.value === 'Tutor';
      tutorFields.style.display = isTutor ? 'block' : 'none';
      document.getElementById('phone').required = isTutor;
      document.getElementById('bio').required = isTutor;
    });
  }

  const subjectDropdown = document.getElementById('subjectDropdown');
  const subjectCheckboxes = document.querySelectorAll('#subjectDropdown + .dropdown-menu input[type="checkbox"]');
  const subjectHidden = document.getElementById('selectedSubjects');

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

  // Inicializar eventos
  if (subjectCheckboxes) {
    subjectCheckboxes.forEach(cb => {
      cb.addEventListener('change', updateSubjectSelection);
    });
    updateSubjectSelection();
  }
}

document.addEventListener('DOMContentLoaded', setupTutorUI);
