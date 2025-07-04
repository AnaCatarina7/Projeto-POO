import * as User from "../models/userModel.js";

document.addEventListener('DOMContentLoaded', function () {
    tutorCatalogView();
})

export function tutorCatalogView() {
    User.initUsers();

    const isLandingPage = !window.location.pathname.includes('filter.html'); // Verifies if its the landingPage

    // Retrieve any previous search term saved in localStorage
    const searchTerm = localStorage.getItem('searchTerm'); //When searching something in the navbar, it was saved in Ls

    let tutors = searchTerm
        ? User.getTutors(null, null, null, null, searchTerm)
        : User.getTutors();

    // Order tutors by favoriteCount (only 8) for the landingPage
    if (isLandingPage) {
        tutors = tutors
            .sort((a, b) => (b.favoriteCount || 0) - (a.favoriteCount || 0))
            .slice(0, 8);
    }

    renderTutorCatalog(tutors);
    localStorage.removeItem('searchTerm');

    // Handle filter and search button click
    if (!isLandingPage) {
        document.querySelector("#btnFilter").addEventListener("click", () => {
            const newSearch = document.querySelector("#navbarSearchInput").value.trim();

            renderTutorCatalog(
                User.getTutors(
                document.querySelector("#filter-level").value, // Get education level filter
                document.querySelector("#filter-modality").value, // Get modality filter
                document.querySelector("#filter-location").value,  // Get location filter
                document.querySelector("#filter-subject").value,   // Get subject filter
                newSearch,                                                                         // searchTerm 
                document.querySelector("#order").value             // Get sort order
                )
            );
         });
    }

    addFavouriteBtn();
}

// Render Tutor Catalog
function renderTutorCatalog(tutors = []) {
    let result = '';

    for (const tutor of tutors) {
        result += generateTutorCard(tutor);
    }

    // The tutors are going to be display inside this container
    document.querySelector("#tutor-catalog-container").innerHTML =
       `
        <div class="row px-4 align-items-center justify-content-center flex-wrap display-flex tutor-catalog-row">
            ${result}
        </div>
    `;
    clickTutorCard();
}

export function clickTutorCard() {
    document.querySelectorAll('.tutor-card').forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.closest('.tutor-favoritebtn')) return;

            const tutorEmail = this.getAttribute('data-tutor-email');
            localStorage.setItem('selectedTutorEmail', tutorEmail);
            window.location.href = '/html/profileTutor.html';
        });
    });
}

// Tutor Card
export function generateTutorCard(tutor) {
        const modalityText = tutor.modality === 'online' ? 'Online' : tutor.modality === 'inPerson' ? 'Presencial' :
            Array.isArray(tutor.modality) ? tutor.modality.join('/') : 'Não informado';

        const heartColor = User.isFavourite(tutor.email) ? 'red' : 'white';

        return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card border-0 shadow-sm rounded-4 position-relative overflow-hidden tutor-card" 
                 data-tutor-email="${tutor.email}"
                 style="cursor: pointer;">
                <img src="${tutor.image || './assets/svg/tutor1.svg'}" class="card-img-top" alt="Foto do tutor">
                <div class="position-absolute top-0 end-0 p-2">
                    <button class="tutor-favoritebtn" data-tutor-id="${tutor.email}" 
                            style="background: transparent; border: none;">
                        <iconify-icon icon="mdi:heart" width="40" height="40" style="color: ${heartColor};"></iconify-icon>
                    </button>
                </div>
                <div class="card-body px-4 pt-3">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="popularity fw-semibold" style="font-size: 0.9rem;">
                            ${tutor.favoriteCount || 0} 
                            <iconify-icon icon="mdi:heart" style="color: #ff4081;" width="16" height="16"></iconify-icon>
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
    `
}

// Favourite Button
function addFavouriteBtn() {
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

                } else {
                    User.addFavourite(tutorEmail);
                    location.reload();
                    console.log("Tutor adicionado ");
                }
            } catch (error) {
                alert(error.message);
            }
        });
    });
}

