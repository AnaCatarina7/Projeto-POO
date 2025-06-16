import * as User from "../models/userModel.js";

User.initUsers();

// Handle form submission for both student and tutor
document.querySelector('#signup-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form field values 
  const name = document.querySelector('#signup-Fname').value.trim();
  const surname = document.querySelector('#signup-Lname').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const location = document.querySelector('#signup-city').value.trim();
  const password = document.querySelector('#signup-password').value.trim();
  const userType = document.querySelector('#userType').value.trim().toLowerCase();

  if (!name || !surname || !email || !location || !password) {
    alert('Preencha todos os campos!');
    return;
  }

  try {
    if (userType === 'aluno') {
      // Create regular student account
      User.addUser(name, surname, email, location, password, 'aluno');
      alert('Aluno registrado com sucesso!');
    } 
    else if (userType === 'tutor') {
      // Create tutor account with extended information
      const tutorInfo = {
        phone: document.getElementById('phone').value.trim(),
        image: selectedImage,
        bio: document.getElementById('bio').value.trim(),
        subjects: document.getElementById('selectedSubjects').value.split(','),
        educationLevel: document.getElementById('educationLevel').value,
        price: parseFloat(document.getElementById('price').value),
        modality: [
            ...(document.getElementById('inPerson').checked ? ['Presencial'] : []),
            ...(document.getElementById('online').checked ? ['Online'] : [])
        ],
        specialNeeds: document.querySelector('input[name="specialNeeds"]:checked').value,
      };

      // Validate required tutor fields
      if (!tutorInfo.phone || !tutorInfo.bio || tutorInfo.subjects.length === 0) {
        throw new Error("Preencha todos os campos do tutor!");
      }

      // Validate image was selected
      if (!selectedImage) {
      alert('Por favor, selecione uma imagem!');
      return;
      }

      User.addUser(name, surname, email, location, password, 'tutor', tutorInfo);
      alert('Tutor registado com sucesso!');
    }
    
    // Redirect to login page after successful registration
    window.location.href = '/html/login.html';
  } catch (error) {
    alert(error.message);
    console.error(error.message);
  }
});


// Manage tutor-specific form fields visibility
function handleTutorForm() {
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

/////// For the PROFILE PICTURE ///////
// Variable to store the selected image in the forms
let selectedImage = null;

// Converts uploaded image to Base64 (string) for localStorage and displays preview
document.getElementById('photo').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        // Convert image to Base64 for storage
        reader.onload = function(e) {
            selectedImage = e.target.result;
            // Display preview
            document.getElementById('photo-preview').src = selectedImage;
            document.getElementById('photo-preview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});


handleTutorForm();