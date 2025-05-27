let tutors;

// GET tutors FROM LOCALSTORAGE
export function init() {
  tutors = localStorage.tutors ? JSON.parse(localStorage.tutors) : [];
}

// ADD TUTOR
export function addTutor(name,surname,email,location,password) {
  if (tutors.some((tutor) => tutor.email === inputEmail)) {
    throw Error(`User with email "${inputEmail}" already exists!`);
  } else {
    tutors.push(new Tutor(name,surname,email,location,password));
    localStorage.setItem("tutors", JSON.stringify(tutors));
  }
}

// LOGIN TUTOR 
export function logintutor(inputEmail, inputPassword) {
  const tutor = tutors.find(
    (tutor) => tutor.email === inputEmail && tutor.password === inputPassword
  );
  if (tutor) {
    sessionStorage.setItem("loggedTutor", JSON.stringify(tutor));
    return true;
  } else {
    throw Error("Invalid login!");
  }
}

// LOGOUT DO TUTOR
export function logout() {
  sessionStorage.removeItem("loggedTutor");
}

// TUTOR CLASS
class Tutor {

    constructor(name,surname, email,location, password) {
        this.name = name;
        this.surname=surname;
        this.email = email;
        this.location=location;
        this.password = password;
        this.userType = 'tutor';

    };

}