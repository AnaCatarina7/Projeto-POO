import * as User from '../models/userModel.js';
import { generateTutorCard,clickTutorCard } from "../views/tutorCatalogView.js";
//import { loadTutorProfile } from "../views/tutorView.js";
let users = User.initUsers();

if (!User.isLogged()) {

    window.location.href = '/html/login.html';
}

document.addEventListener('DOMContentLoaded', function () {
    renderStudentWelcome()
    unlockRewords()
    changeData();
    renderFav()
})

// Student hero section

function renderStudentWelcome() {
    const loggedUser = User.getLoggedUser();

    const heroConteiner = document.getElementById('hero-student-section')
    heroConteiner.innerHTML = `
   
    <div class="d-flex align-items-center">
    <div class="student-foto-wrapper me-4">
       <img src="/assets/img/pexels-ann-h-45017-1762851.jpg" alt="foto" class="student-foto">
    
    </div>
    <div class="text-white">
      <h2 class="fw-bold mb-1">${loggedUser.name} ${loggedUser.surname}</h2>
      <p class="mb-0"> Aluno | ${loggedUser.location}</p>
    </div>
  </div>
   `
   
}

// Students edit data view
function changeData() {// Function to change user data (password and location)
    const loggedUser = User.getLoggedUser();
    //console.log(loggedUser.password, loggedUser.location);

    document.getElementById("editStudentForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const newPassword = document.getElementById("editStudentPasswordConfirm").value;
        const confirmPassword = document.getElementById("editStudentPassword").value;
        const newLocation = document.getElementById("editStudentLocation").value;
        console.log(newLocation, newPassword, confirmPassword);

        if (loggedUser) {

            const userEmail = loggedUser.email;
            let user = users.find(user => user.email === userEmail);
            if (user) {

                if (newPassword || confirmPassword) {
                    if (newPassword.length<6){
                        alert("A palavra passe deve ter pelo menos 6 caracteres")
                        return
                    }

                    if (newPassword !== confirmPassword) {
                        alert("As palavras-passe não coincidem. Por favor, tente novamente.");
                        return;
                    }

                    if (newPassword === User.password) {
                        alert("A nova palavra-passe não pode ser igual à atual.")
                        return;
                    }
                    user.password = newPassword;
                    loggedUser.password=newPassword;
                }
                user.location = newLocation;
                loggedUser.location=newLocation
                User.updateStorages(loggedUser)
                alert("Dados atualizados com sucesso!");
                console.log(user,loggedUser);

                let modal = bootstrap.Modal.getInstance(document.getElementById('editStudentModal'))
                if (modal) {
                    modal.hide();
                }
                console.log("Modal closed");
            } else {
                alert("Erro ao atualizar os dados. Por favor, tente novamente.");
            }
        }
    })
}

// Students favourites tutors view
function renderFav() {
    const favTutorsCatalog = document.getElementById('favTutorsCatalog')
    favTutorsCatalog.innerHTML = ""

    let loggedUser = User.getLoggedUser()

    if (!loggedUser || loggedUser.userType !== 'aluno' || !loggedUser.favourites || loggedUser.favourites.length === 0) {
        favTutorsCatalog.innerHTML = " <h4>Não tem tutores favoritos :(</h4>"
        console.log(loggedUser.favourites);
        return
    }
    try {
        loggedUser.favourites.forEach(tutor => {
            favTutorsCatalog.innerHTML += generateTutorCard(tutor)
        });
    } catch (error) {
        console.log(error);
    }
    document.querySelectorAll('.tutor-favoritebtn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            const tutorEmail = event.currentTarget.dataset.tutorId;
            const isCurrentlyFav = User.isFavourite(tutorEmail);

            try {
                if (isCurrentlyFav) {
                    User.removeFavourite(tutorEmail);
                    renderFav()
                    console.log("Removendo favorito");
                }
            } catch (error) {
                alert(error.message);
            }
        });
    });

     clickTutorCard()
  
}

// Students rewords view
function unlockRewords() {
    const loggedUser = User.getLoggedUser();
    let lessons = loggedUser.classesTaken || [];
    let totalLessons = lessons.length
    if (!Array.isArray(loggedUser.rewardUsed)) {
        loggedUser.rewardUsed = [];
    }
    console.log(loggedUser.rewardUsed, 'ok', totalLessons)


    if (totalLessons >= 0) {
        activateRewardCard(1, "1º Aula gratuíta") // esta sempre ativo

    }
    if (loggedUser.rewardUsed.includes("5% de Desconto")) {
        activateRewardCard(2, "Ganhou uma aula gratuita com este tutor!")

    }
    if (loggedUser.rewardUsed.includes("Aula gratuita com tutor")) {
        activateRewardCard(3, "Tem 25% de desconto disponível!")


    }
    if (loggedUser.rewardUsed.includes("25% de Desconto")) {
        activateRewardCard(4, "Desbloqueou 50% de reembolso!")


    }
    if (loggedUser.rewardUsed.includes("10% de Reembolso")) {
        activateRewardCard(5, "Receba 10% de reembolso numa aula anterior.")

    }
    if (loggedUser.rewardUsed.includes("Materiais de apoio")) {
        activateRewardCard(6, "Agora é um aluno Premium! Acesso a materiais!")

    }

}

function activateRewardCard(id) {
    const card = document.querySelector(`.reward-card[data-reward-id="${id}"]`)
    if (!card) return
    card.classList.remove('locked')
}

