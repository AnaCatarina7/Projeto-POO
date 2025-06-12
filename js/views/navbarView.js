import * as User from '../models/userModel.js';

function navbarView() {
    User.initUsers();

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

    if (User.isLogged()) {
        result += `
        
        <div class="dropdown">
        <div class="profile-pic-wrapper d-flex justify-content-center align-items-center rounded-circle bg-white icon-wrapper" data-bs-toggle="dropdown" aria-expanded="false">
          <iconify-icon icon="mdi:account-circle" class="icon" width="45" height="45"></iconify-icon>
        </div>
        <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href="">
                <iconify-icon icon="iconamoon:profile" width="20" height="20" class="me-2" style="color: #395d7f;"></iconify-icon>
                Meu Perfil
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="">
                <iconify-icon icon="tabler:edit" width="20" height="20" class="me-2" style="color: #395d7f;"></iconify-icon>
                Editar Perfil
              </a>
            </li>
            <hr class="dropdown-line">
            <li>
              <a class="dropdown-item" href="">
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
              <a class="dropdown-item" href="">
                <iconify-icon icon="iconamoon:profile" width="20" height="20" class="me-2" style="color: #395d7f;"></iconify-icon>
                Criar conta 
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="">
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

    //Click sign up btn

    //Click login btn

    // Click Myprofile btn

    // Click Edit Profile btn

    // Click Logout btn

}

document.addEventListener("DOMContentLoaded", () => {
    navbarView();
})