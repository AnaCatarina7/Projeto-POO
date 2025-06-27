import * as User from "../models/userModel.js";

User.initUsers();

document.addEventListener('DOMContentLoaded', () => {
  renderSubjects();
  handleTutorForm();
});

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
  if (password.length < 6) {
    alert("A palavra passe deve ter pelo menos 6 caracteres")
    return
  }

  try {
    if (userType === 'aluno') {
      // Create regular student account
      User.addUser(name, surname, email, location, password, 'aluno');
      alert('Aluno registado com sucesso!');
    }
    else if (userType === 'tutor') {
      // Create tutor account with extended information
      const tutorInfo = {
        phone: document.getElementById('phone').value.trim(),
        image: selectedImage,
        bio: document.getElementById('bio').value.trim(),
        subjects: document.getElementById('selectedSubjects').value.split(','),
        levels: document.getElementById('levels').value,
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
}

/////// Subjects Functions ///////
function renderSubjects() {
  const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
  
  // Get containers for basic and secondary education subjects
  const basicEducationDiv = document.getElementById('basicEducationSubjects');
  const secondaryEducationDiv = document.getElementById('secondaryEducationSubjects');
  
  // Clear existing content
  basicEducationDiv.innerHTML = '';
  secondaryEducationDiv.innerHTML = '';
  
  // Process each subject
  subjects.forEach(subject => {
    // Check if subject belongs to basic education
    const isBasicEducation = [
      "Português", "Inglês", "Francês", "Espanhol",
      "História", "Geografia", "Matemática",
      "Ciências Naturais", "Físico-Química"
    ].includes(subject);
    
    // Set prefix (EB for basic, ES for secondary)
    const prefix = isBasicEducation ? 'EB' : 'ES';
    const container = isBasicEducation ? basicEducationDiv : secondaryEducationDiv;    // Choose correct container div
    
    // Create list item for each subject
    const li = document.createElement('li');
    // Make sure the id doesn't have spaces and is in lower case. And applies to every checkbox(g-global)
    li.innerHTML = `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${prefix}-${subject}" 
               id="${prefix.toLowerCase()}${subject.replace(/\s+/g, '')}">
        <label class="form-check-label" for="${prefix.toLowerCase()}${subject.replace(/\s+/g, '')}">
          ${subject}
        </label>
      </div>
    `;
    
    // Add to correct container
    container.appendChild(li);
  });
  
  // Setup checkbox event listeners
  setupSubjectCheckboxes();
}

// Handles subject selection logic
function setupSubjectCheckboxes() {
  const subjectCheckboxes = document.querySelectorAll('#subjectsDropdownMenu input[type="checkbox"]');
  const subjectHidden = document.getElementById('selectedSubjects');
  const subjectDropdown = document.getElementById('subjectDropdown');

  // Add change event to each checkbox
  subjectCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => updateSubjectSelection());
  });

  // Updates selected subjects display
  function updateSubjectSelection() {
    // Get array of selected checkbox values
    const selected = Array.from(subjectCheckboxes)
      .filter(cb => cb.checked) // Only checked boxes
      .map(cb => cb.value); // Get their values
    
    subjectHidden.value = selected.join(',');   // Store selected values as comma-separated string
    
    subjectDropdown.innerHTML = selected.length > 0 
      ? selected.map(val => `<span class="badge-subject">${val}</span>`).join(' ')
      : 'Selecionar disciplinas';
  }
}

/////// For the PROFILE PICTURE ///////
// Variable to store the selected image in the forms
let selectedImage = null;

// Converts uploaded image to Base64 (string) for localStorage and displays preview
document.getElementById('photo').addEventListener('change', function (e) {
  const file = e.target.files[0]; //Get the photo file
  if (file) {
    const reader = new FileReader(); // a js method to read files like this one(image)
    // Convert image to Base64 for storage
    reader.onload = function (e) {
      selectedImage = e.target.result;
      // Display preview
      document.getElementById('photo-preview').src = selectedImage;
      document.getElementById('photo-preview').style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

handleTutorForm();