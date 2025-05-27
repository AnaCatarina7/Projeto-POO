let admins;

// GET ADMINS FROM LOCALSTORAGE
export function init() {
  admins = localStorage.admins ? JSON.parse(localStorage.admins) : [];
}

// LOGIN ADMINS 
export function loginAdmin(email, password) {
  const admin = admins.find(
    (admin) => admin.email === email && admin.password === password);
  if (admin) {
    sessionStorage.setItem("loggedAdmin", JSON.stringify(admin));
    return true;
  } else {
    throw Error("Invalid login!");
  }
}

// LOGOUT DO ADMIN
export function logout() {
  sessionStorage.removeItem("loggedAdmin");
}

// ADMIN CLASS
class Admin {

    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.userType = 'admin';

    };

}