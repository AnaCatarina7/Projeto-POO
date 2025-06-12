let students;

// GET students FROM LOCALSTORAGE
// export function init() {
//   students = localStorage.students ? JSON.parse(localStorage.students) : [];
// }

// // ADD STUDENT
// export function addStudent(name,surname,email,location,password) {
//   if (students.some((student) => student.email === email)) {
//     throw Error(`User with email "${inputEmail}" already exists!`);
//   } else {
//     students.push(new Student(name,surname,email,location,password));
//     localStorage.setItem("students", JSON.stringify(students));
//   }
// }

// // LOGIN STUDENTS 
// export function loginStudent(inputEmail, inputPassword) {
//   const student = students.find(
//     (student) => student.email === inputEmail && student.password === inputPassword
//   );
//   if (student) {
//     sessionStorage.setItem("loggedStudent", JSON.stringify(student));
//     return true;
//   } else {
//     throw Error("Invalid login!");
//   }
// }

// // LOGOUT DO STUDENT
// export function logout() {
//   sessionStorage.removeItem("loggedStudent");
// }

// STUDENT CLASS
class Student {

    constructor(name,surname, email,location, password) {
        this.name = name;
        this.surname=surname;
        this.email = email;
        this.location=location;
        this.password = password;
        this.userType = 'student';

    };

}