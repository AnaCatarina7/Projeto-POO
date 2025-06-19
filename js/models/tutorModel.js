let tutors;

// // GET tutors FROM LOCALSTORAGE
// export function init() {
//   tutors = localStorage.tutors ? JSON.parse(localStorage.tutors) : [];
// }

// // ADD TUTOR
// export function addTutor(name, surname, email, location, password, profileData) {
//   if (tutors.some((tutor) => tutor.email === email)) {
//     throw Error(`User with email "${email}" already exists!`);
//   } else {
//     tutors.push(new Tutor(name, surname, email, location, password, profileData));
//     localStorage.setItem("tutors", JSON.stringify(tutors));
//   }
// }

// // LOGIN TUTOR 
// export function logintutor(inputEmail, inputPassword) {
//   const tutor = tutors.find(
//     (tutor) => tutor.email === inputEmail && tutor.password === inputPassword
//   );
//   if (tutor) {
//     sessionStorage.setItem("loggedTutor", JSON.stringify(tutor));
//     return true;
//   } else {
//     throw Error("Invalid login!");
//   }
// }

// // LOGOUT DO TUTOR
// export function logout() {
//   sessionStorage.removeItem("loggedTutor");
// }

// Get the logged tutor
export function getLoggedTutor() {
  return JSON.parse(sessionStorage.getItem("loggedTutor"));
}

// TUTOR CLASS
class Tutor {
  //constructor
  constructor(name, surname, email, location, password, {
    bio = '',
    photo = 'default.jpg',
    subjects = [],
    educationLevel = '',
    languages = ['Português'],
    price = 0,
    teachingMode = [],
    specialNeeds = false,
    availability = {
      morning: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
      afternoon: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }
    }
  } = {}) {

    //the main inputs, the ones always visible to the user
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.location = location;
    this.password = password;
    this.userType = 'tutor';
    this.isTutor = true;
    
    // The inputs that appear after selecting tutor as the userType
   this.bio = bio;
    this.photo = photo;
    this.subjects = subjects;
    this.educationLevel = educationLevel;
    this.languages = languages;
    this.price = price;
    this.teachingMode = teachingMode;
    this.specialNeeds = specialNeeds;
    this.availability = availability;
    this.rating = 0;
    this.reviews = [];
    this.createdAt = new Date().toISOString();
  }
}

export function updateTutor(updatedTutor) {
  const index = tutors.findIndex(t => t.email === updatedTutor.email);
  if (index !== -1) {
    tutors[index] = updatedTutor;
    localStorage.setItem("tutors", JSON.stringify(tutors));
    sessionStorage.setItem("loggedTutor", JSON.stringify(updatedTutor));
  }
}