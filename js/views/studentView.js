import * as User from '../models/userModel.js';

let users = User.initUsers();

if (!User.isLogged()) {
    window.location.href = '/html/login.html';
}

export function changeData() {// Function to change user data (password and location)
    const loggedUser = User.getLoggedUser();
    console.log(loggedUser.password, loggedUser.location);

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
                    if (newPassword !== confirmPassword) {
                        alert("As palavras-passe não coincidem. Por favor, tente novamente.");
                        return;
                    }

                    if (newPassword === User.password) {
                        alert("A nova palavra-passe não pode ser igual à atual.")
                        return;
                    }

                    user.password = newPassword;

                }
                user.location = newLocation;
                localStorage.setItem("users", JSON.stringify(users));
                alert("Dados atualizados com sucesso!");
                console.log(user);

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
changeData();

export function renderFav() {
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
                    location.reload();
                    console.log("Removendo favorito");

                } 
            } catch (error) {
                alert(error.message);
            }
        });
    });



}

function generateTutorCard(tutor) {
    const modalityText = tutor.modality === 'online' ? 'Online' : tutor.modality === 'inPerson' ? 'Presencial' :
        Array.isArray(tutor.modality) ? tutor.modality.join('/') : 'Não informado';

    const heartColor = User.isFavourite(tutor.email) ? 'red' : 'white';

    return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card border-0 shadow-sm rounded-4 position-relative overflow-hidden">
                <img src="${tutor.image || '/assets/svg/tutor1.svg'}" class="card-img-top" alt="Foto do tutor">
                <div class="position-absolute top-0 end-0 p-2">
                    <button class="tutor-favoritebtn" data-tutor-id="${tutor.email}" style="background: transparent; border: none;">
                        <iconify-icon icon="mdi:heart" width="40" height="40" style="color: ${heartColor};"></iconify-icon>
                    </button>
                </div>
                <div class="card-body px-4 pt-3">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="rating fw-semibold" style="font-size: 0.9rem;">
                            ${tutor.rating || '5'} 
                            <iconify-icon icon="mdi:star" style="color: #f8c100;" width="16" height="16"></iconify-icon>
                        </span>
                        <span class="text-muted small category-text">${tutor.subjects?.[0] || 'Geral'}</span>
                    </div>
                    <h6 class="fw-bold mb-1">${tutor.name} ${tutor.surname}</h6>
                    <p class="text-muted mb-2" style="font-size: 0.85rem;">
                        ${tutor.location || 'Não informado'} (${modalityText})
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-dark">${tutor.price ? tutor.price + '€/h' : 'Preço não informado'}</span>
                        ${tutor.firstClassFree ?
            '<span class="text-warning fw-semibold small">• 1ª Aula Grátis</span>' : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

renderFav()

