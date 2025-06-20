
let users;

// GET USERS FROM LOCALSTORAGE
export function initUsers() {
    users = localStorage.users ? JSON.parse(localStorage.users) : [];
    return users;
}
// ADD USER
export function addUser(name, surname, email, location, password, userType, tutorInfo = {}) {
    if (users.some((user) => user.email === email)) {
        throw Error(`User with email "${email}" already exists!`);
    }

    try {
        users.push(new User(name, surname, email, location, password, userType, tutorInfo));
        localStorage.setItem("users", JSON.stringify(users));
    } catch (error) {
        alert(error.message);
        console.error(error.message);
    }
}

export function getAuthorizedTutors() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.filter(user => user.userType === 'tutor' && user.isAuthorized === true);
}


// LOGIN USERS 
export function loginUser(email, password) {
    const user = users.find(
        (user) => user.email === email && user.password === password);
    if (user) {
        if(user.userType==='tutor'&& user.isAuthorized===false){
            throw new Error("Conta de tutor ainda não autorizada pelo administrador.");
            
        }
        sessionStorage.setItem("loggedUser", JSON.stringify(user));
        return true;
    } else {
        throw Error("Invalid login!");
    }
}

// LOGGED USER
export function isLogged() {
    return sessionStorage.getItem("loggedUser") ? true : false;

}

export function getLoggedUser() {
    return JSON.parse(sessionStorage.getItem("loggedUser"));
}

// LOGOUT DO USER
export function logout() {
    sessionStorage.removeItem("loggedUser");
}

// CHECK IF TUTOR IS FAVOURITE
export function isFavourite(tutorEmail) {
    const loggedUser = getLoggedUser();
    if (!loggedUser || loggedUser.userType !== 'aluno') {
        return false;
    }
    return loggedUser.favourites.some(fav => fav.email === tutorEmail);
}

export function updateStorages(loggedUser) {

    sessionStorage.setItem("loggedUser", JSON.stringify(loggedUser)); // update loggedUser in sessionStorage


    const userIndex = users.findIndex(user => user.email === loggedUser.email);// find the index of the logged user in the localstorage users array 
    if (userIndex !== -1) {
        users[userIndex] = loggedUser;
    } else {
        throw new Error("User não encontrado!");
    }
    localStorage.setItem("users", JSON.stringify(users)); // update users in localstorage 
}

// ADD TUTOR TO FAVOURITES
export function addFavourite(tutorEmail) { // receive a userType 'tutor' to add to favourites
    const loggedUser = getLoggedUser();
    if (!loggedUser) {
        throw Error("Crie uma conta ou faça login para adicionar favoritos!");
    }
    if (loggedUser.userType !== 'aluno') {
        throw Error("Apenas alunos podem adicionar favoritos!");
    }
    if (isFavourite(tutorEmail)) {
        throw Error("Este tutor já está nos seus favoritos!");
    }
    let tutorToAdd = users.find(user => user.email === tutorEmail && user.userType === 'tutor');
    if (!tutorToAdd) {
        throw new Error("Tutor não encontrado!");
    }
    try {
        tutorToAdd.favoriteCount = (tutorToAdd.favoriteCount || 0) + 1; //Increment the favoriteCount of the tutor

        loggedUser.favourites.push(tutorToAdd);
        sessionStorage.setItem("loggedUser", JSON.stringify(loggedUser)); // update loggedUser in sessionStorage


        const userIndex = users.findIndex(user => user.email === loggedUser.email);// find the index of the logged user in the localstorage users array 
        if (userIndex !== -1) {
            users[userIndex] = loggedUser;
            console.log("User updated in localstorage:", users[userIndex].favourites);

        } else {
            throw new Error("User não encontrado!");
        }
        localStorage.setItem("users", JSON.stringify(users)); // update users in localstorage  

    } catch (error) {
        alert(error.message);
        console.error(error.message);
    }
}

// REMOVE TUTOR FROM FAVOURITES
export function removeFavourite(tutorEmail) {
    const loggedUser = getLoggedUser();
    if (!loggedUser || loggedUser.userType !== 'aluno') {
        throw new Error("Apenas alunos logados podem remover favoritos!")
    }

    const tutorIndex = users.findIndex(user => user.email === tutorEmail && user.userType === 'tutor');
    if (tutorIndex !== -1) {
        users[tutorIndex].favoriteCount = Math.max(0, (users[tutorIndex].favoriteCount || 0) - 1);  //Decrement the favoriteCount of the tutor
    }

    const userIndex = users.findIndex(user => user.email === loggedUser.email);// find the index of the logged user in the localstorage users array 
    if (userIndex === -1) {
        throw new Error("User não encontrado!");
    }

    users[userIndex].favourites = users[userIndex].favourites.filter(fav => fav.email !== tutorEmail); // remove tutor from favourites in localstorage
    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("loggedUser", JSON.stringify(users[userIndex]));
}

export function bookLesson(tutorEmail) {
    const loggedUser = getLoggedUser();

    if (loggedUser.userType !== 'aluno') {
        alert('Apenas alunos podem marcar aulas')
    }

    if (!loggedUser.classesTaken) {
        loggedUser.classesTaken = [];
    }

    try {
        const sameTutorLessons = loggedUser.classesTaken.filter(lesson => lesson.tutorEmail === tutorEmail);
        const numLessonWithTutor = sameTutorLessons.length + 1;
        const newClass = {
            tutorEmail: tutorEmail,
            date: new Date().toISOString().slice(0, 10),
            numLesson: numLessonWithTutor
        };
        loggedUser.classesTaken.push(newClass)
        giveReword(loggedUser, numLessonWithTutor)
        updateStorages(loggedUser)
        console.log(loggedUser.classesTaken);
    } catch (error) {
        console.log(error)
    }
}

function giveReword(loggedUser, numLessonWithTutor,sameTutorLessons) {
    let totalLessons = loggedUser.classesTaken.length

    if (totalLessons >= 0 && !loggedUser.rewardUsed.includes("1ª Aula Grátis")) {
        loggedUser.rewardUsed.push("1ª Aula Grátis")
    }

    if (totalLessons >= 3 && !loggedUser.rewardUsed.includes("5% de Desconto")) {
        loggedUser.rewardUsed.push("5% de Desconto")
        console.log(numLessonWithTutor);

    }

    if (numLessonWithTutor >= 5 && !loggedUser.rewardUsed.includes("Aula gratuita com tutor")) {
        loggedUser.rewardUsed.push("Aula gratuita com tutor")
        console.log(numLessonWithTutor);
    }
    if (totalLessons >= 7 && !loggedUser.rewardUsed.includes("25% de Desconto")) {
        loggedUser.rewardUsed.push("25% de Desconto")
        console.log(numLessonWithTutor);
    }
    if (numLessonWithTutor >= 15 && !loggedUser.rewardUsed.includes("10% de Reembolso")) {
        loggedUser.rewardUsed.push("10% de Reembolso")

    }
    if (numLessonWithTutor >= 10 && !loggedUser.rewardUsed.includes("Materiais de apoio")) {
        loggedUser.rewardUsed.push("Materiais de apoio")
        console.log(sameTutorLessons);
        

    }
    console.log(loggedUser.rewardUsed, numLessonWithTutor);
}

// FILTER TUTORS
export function getTutors(levelFilter = null, modalityFilter = null, locationFilter = null, subjectFilter = null, searchTerm = "", orderBy = null){
  let filteredTutors = getAuthorizedTutors();  // Use let instead of const
  
  // Education Level Filter
  if (levelFilter && levelFilter !== "Nível de ensino") {
    filteredTutors = filteredTutors.filter(tutor => {
      if (!tutor.levels) return false;
      
      const levelMap = {
        "Ensino Básico": "basico",
        "Ensino Secundário": "secundario",
        "Ambos": "ambos"
      };
      
      const levelToFind = levelMap[levelFilter];
      
      if (levelFilter === "Ambos") {
        return tutor.levels.includes("ambos") || 
              (tutor.levels.includes("basico") && tutor.levels.includes("secundario"));
      }
      
      return tutor.levels.includes(levelToFind);
    });
  }

  // Modality Filter
  if (modalityFilter && modalityFilter !== "Online / Presencial") {
    filteredTutors = filteredTutors.filter(tutor => {
      if (!tutor.modality) return false;
      
      // Normalize modality values
      const tutorModalities = Array.isArray(tutor.modality) 
        ? tutor.modality.map(m => m.toLowerCase())
        : [tutor.modality.toLowerCase()];
      
      const filterModality = modalityFilter.toLowerCase();
      
      return tutorModalities.includes(filterModality);
    });
  }

    // Location Filter
  if (locationFilter && locationFilter !== "Localidade") {
    filteredTutors = filteredTutors.filter(tutor => {
      return tutor.location === locationFilter;
    });
  }

    // Subject Filter
  if (subjectFilter && subjectFilter !== "Disciplinas") {
    filteredTutors = filteredTutors.filter(tutor => {
      if (!tutor.subjects || tutor.subjects.length === 0) return false;
      
      return tutor.subjects.some(subject => 
        subject.toLowerCase().includes(subjectFilter.toLowerCase())
      );
    });
  }

    // Search Term Filter on the navBar
  if (searchTerm && searchTerm.trim() !== "") {
    const term = searchTerm.toLowerCase().trim();
    filteredTutors = filteredTutors.filter(tutor => {
      const fullText = `
        ${tutor.name.toLowerCase()} 
        ${tutor.surname.toLowerCase()} 
        ${tutor.subjects?.join(' ').toLowerCase() || ''}
        ${tutor.bio?.toLowerCase() || ''}
      `;
      return fullText.includes(term);
    });
  }

    // Order logic
  if (orderBy) {
    switch(orderBy) {
        case "Preço mais baixo":
            filteredTutors.sort((a, b) => a.price - b.price); // Ascending
            break;
        case "Preço mais alto":
            filteredTutors.sort((a, b) => b.price - a.price); // Descending
            break;
        case "Mais recentes":
            filteredTutors.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
            });
            break;
        case "Mais populares":
            filteredTutors.sort((a, b) => (b.favoriteCount || 0) - (a.favoriteCount || 0));
            break;
        }
  }
  
  return filteredTutors;
}


// REMOVE TUTOR (ADMIN)
export function deleteTutor(users, tutorToDelete) {
  users = users.filter(user => user.email !== tutorToDelete)
  localStorage.setItem("users", JSON.stringify(users));
  console.log(tutorToDelete);

}

class User {
    constructor(name, surname, email, location, password, userType, tutorInfo = {}) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.location = location;
        this.password = password;
        this.userType = userType;


        if (userType === 'aluno') {
            this.favourites = []
            this.rewardUsed = []
            this.classesTaken = []
        }

        if (userType === 'tutor') {
            this.subjects = tutorInfo.subjects || [];
            this.phone = tutorInfo.phone || '';
            this.bio = tutorInfo.bio || '';
            this.educationLevel = tutorInfo.educationLevel || '';
            this.price = tutorInfo.price || 0;
            this.modality = tutorInfo.modality || '';
            this.specialNeeds = tutorInfo.specialNeeds || '';
            this.availability = tutorInfo.availability || '';
            this.image = tutorInfo.image || '';
            this.favoriteCount = tutorInfo.favoriteCount || 0;
            this.createdAt = new Date().toISOString();
            this.isAuthorized= false
        }
    };

}



