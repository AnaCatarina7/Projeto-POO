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

//***MANEGE EDUCATION LEVELS */
// GET SUBJECTS FROM LOCAL STORAGE

export function initSubjects() {
  return JSON.parse(localStorage.getItem('subjects'))||[]
}

// ADD SUBJECTS
export function addSubject(subjects,newSubject) {
  if (subjects.some((subj) => subj.toLowerCase()===newSubject.toLowerCase())) {
    throw Error(`The subject "${newSubject}" already exists!`);
  } else {
    subjects.push(newSubject);
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }
}

// DELETE SUBJECTS
export function deleteSubject(subjects,subjectToDelete) {
  subjects=subjects.filter(subj=>subj!== subjectToDelete)
  localStorage.setItem('subjects', JSON.stringify(subjects))
}

// EDIT A SUBJECT
export function editSubject(subjects,oldSubject,updatedSubject) {
  if (subjects.some((subj) => subj.toLowerCase()===updatedSubject.toLowerCase())) {
    throw Error(`The subject "${updatedSubject}" already exists!`);
  } else if (oldSubject===updatedSubject) {
    throw Error(`The subject "${oldSubject}" is the same as the updated subject!`);
  }
  const updatedSubjects=subjects.map(subj=>subj===oldSubject? updatedSubject:subj)
  localStorage.setItem('subjects', JSON.stringify(updatedSubjects))
  return updatedSubjects
}
