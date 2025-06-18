// USER CLASS
class User {
    constructor(name, surname, email, location, password, userType, tutorInfo = {}) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.location = location;
        this.password = password;
        this.userType = userType;

        this.favourites = []
        this.reward = []

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
            this.createdAt = new Date().toISOString();
        }
    };
}

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

// LOGIN USERS 
export function loginUser(email, password) {
    const user = users.find(
        (user) => user.email === email && user.password === password);
    if (user) {
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
        loggedUser.favourites.push(tutorToAdd);
        sessionStorage.setItem("loggedUser", JSON.stringify(loggedUser)); // update loggedUser in sessionStorage


        const userIndex = users.findIndex(user => user.email === loggedUser.email);// find the index of the logged user in the localstorage users array 
        if (userIndex !== -1) {
           users[userIndex]= loggedUser; 
           console.log("User updated in localstorage:", users[userIndex].favourites);
           
        }else{
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

    const userIndex = users.findIndex(user => user.email === loggedUser.email);// find the index of the logged user in the localstorage users array 
    if (userIndex === -1) {
        throw new Error("User não encontrado!");
    }

    users[userIndex].favourites = users[userIndex].favourites.filter(fav => fav.email !==tutorEmail); // remove tutor from favourites in localstorage
    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("loggedUser", JSON.stringify(users[userIndex]));
}


// FILTER TUTORS
export function getTutors(levelFilter = null, modalityFilter = null, locationFilter = null, orderBy = null) {
  let filteredTutors = users.filter(user => user.userType === 'tutor');  // Use let instead of const
  
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
        filteredTutors.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
  }
  
  return filteredTutors;
}



