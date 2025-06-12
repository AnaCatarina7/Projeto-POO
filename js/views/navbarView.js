import * as User from '../models/userModel.js';
let users = User.initUsers();

function navbarView() {
  User.initUsers();
  const loggedUser = User.getLoggedUser()

  let result = `
          <a class="navbar-brand" href="/index.html">
        <img src="../assets/svg/logo.svg" alt="Logo" height="40">
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto ms-4">
          <li class="nav-item">
            <a class="nav-link active" href="/index.html">Início</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/html/becomeTT.html">Torna-te Tutor</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/html/about.html">Sobre nós</a>
          </li>
        </ul>

        <form class="search-bar d-flex align-items-center me-3">
          <input class="form-control bg-transparent text-white border-0" type="search" placeholder="Pesquisar..."
            aria-label="Pesquisar">
          <button class="btn-search " type="submit">
            <iconify-icon icon="healthicons:magnifying-glass" width="30" height="30" class="search-icon"></iconify-icon>
          </button>
        </form>
    `

  if (loggedUser) {
    result += `
        
        <div class="dropdown">
        <div class="profile-pic-wrapper d-flex justify-content-center align-items-center rounded-circle bg-white icon-wrapper" data-bs-toggle="dropdown" aria-expanded="false">
          <iconify-icon icon="mdi:account-circle" class="icon" width="45" height="45"></iconify-icon>
        </div>
        <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href="" id="profile_link">
                <iconify-icon icon="iconamoon:profile" width="20" height="20" class="me-2" style="color: #395d7f;"></iconify-icon>
                Meu Perfil
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="" id="editProfile_link" >
                <iconify-icon icon="tabler:edit" width="20" height="20" class="me-2" style="color: #395d7f;"></iconify-icon>
                Editar Perfil
              </a>
            </li>
            <hr class="dropdown-line">
            <li>
              <a class="dropdown-item" href="" id="logout_link">
                <iconify-icon icon="ic:round-logout" width="20" height="20" class="me-2" style="color: #395d7f;"></iconify-icon>
                Terminar Sessão
              </a>
            </li>
          </ul>
      </div>
      `

  } else {
    result += `
        
        <div class="dropdown">
          <div
            class="profile-pic-wrapper d-flex justify-content-center align-items-center rounded-circle bg-white icon-wrapper"
            data-bs-toggle="dropdown" aria-expanded="false">
            <iconify-icon icon="mdi:account-circle" class="icon" width="45" height="45"></iconify-icon>
          </div>
          <ul class="dropdown-menu dropdown-menu-end">
             <li>
              <a class="dropdown-item" href="/html/signUp.html">
                <iconify-icon icon="iconamoon:profile" width="20" height="20" class="me-2" style="color: #395d7f;"></iconify-icon>
                Criar conta 
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/html/login.html">
                <iconify-icon icon="tabler:edit" width="20" height="20" class="me-2" style="color: #395d7f;"></iconify-icon>
                Iniciar sessão
              </a>
            </li>
           
          </ul>
        </div>
     `
  }

  // Add content to the navbar
  let navbar = document.getElementById("navbar");
  navbar.innerHTML = result;

  // Click Myprofile btn
  document.getElementById("profile_link").addEventListener("click", (e) => {
    e.preventDefault();

    try {

      if (loggedUser) {
        console.log(loggedUser);
        switch (loggedUser.userType) {
          case 'aluno':
            window.location.href = '/html/profileStudent.html'
            break;
          case 'tutor':
            window.location.href = '/html/profileTutor.html'
            break;
          case 'admin':
            window.location.href = '/html/admin.html'
            break;
        }
      }

      return
    } catch (error) {
      console.log(error.message)
    }
  })

  // Click Edit Profile btn

  document.getElementById("editProfile_link").addEventListener("click", (e) => {
    e.preventDefault();

    const userEmail = loggedUser.email;
    let user = users.find(user => user.email === userEmail);
    document.getElementById("editStudentFname").value = user.name;
    document.getElementById("editStudentLocation").value = user.location;
    document.getElementById("editStudentEmail").value = user.email;
    document.getElementById("editStudentUserType").value = user.userType;
    document.getElementById("editStudentLname").value = user.surname;

    let modal = new bootstrap.Modal(document.getElementById('editStudentModal'))
    modal.show();
    console.log("Modal opened");


  });

  // Click Logout btn
  document.getElementById("logout_link").addEventListener("click", (e) => {
    e.preventDefault();
    User.logout();
    window.location.href = "/index.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  navbarView();
})

