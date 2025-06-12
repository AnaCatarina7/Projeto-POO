let users;

// GET USERS FROM LOCALSTORAGE
export function initUsers() {
    users = localStorage.users ? JSON.parse(localStorage.users) : [];
    return users;
}
// ADD USER
export function addUser(name, surname, email, location, password, userType) {
    if (users.some((user) => user.email === email)) {
        throw Error(`User with email "${email}" already exists!`);
    }

    try {
        users.push(new User(name, surname, email, location, password, userType));
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

export function addFavourite(tutor) { // receive a userType 'tutor' to add to favourites
    const loggedUser = getLoggedUser();
    if (!loggedUser) {
        throw Error("Crie uma conta ou faça login para adicionar favoritos!");
    }
    if (loggedUser.userType != 'aluno') {
        throw Error("Apenas alunos podem adicionar favoritos!");
    }
    try {
        loggedUser.favourites.push(tutor);

    } catch (error) {
        alert(error.message);
        console.error(error.message);
    }
}




class User {
    constructor(name, surname, email, location, password, userType) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.location = location;
        this.password = password;
        this.userType = userType;

        this.favourites = []
        this.reward = []

    };
}