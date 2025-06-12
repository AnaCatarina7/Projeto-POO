import * as User from "../models/userModel.js"

console.log( User.initUsers());

document.querySelector('#signup-form').addEventListener('submit', (e) => {
    e.preventDefault()

    // get dom elements 
    let inputName = document.querySelector('#signup-Fname').value.trim()
    let inputSurname = document.querySelector('#signup-Lname').value.trim()
    let inputEmail = document.querySelector('#signup-email').value.trim()
    let inputLocation = document.querySelector('#signup-city').value.trim()
    let userTypeSelect = document.querySelector('#userType').value.trim().toLowerCase()
    let inputPassword = document.querySelector('#signup-password').value.trim()
    // let submitBtn = document.querySelector('#submitBtn')

    // inputs validation
   if (!inputName ||
        !inputSurname ||
        !inputEmail||
        !inputLocation ||
        !inputPassword) {
       alert('Unfilled data');
    }

    try {
         User.addUser(inputName, inputSurname, inputEmail, inputLocation, inputPassword,userTypeSelect)
         alert('user signed up')
        window.location.href = '/html/login.html'

    } catch (error) {
        alert(error.message);
        console.error(error.message);   
    }
})



// import * as Student from "../models/studentModel.js"
// import * as Tutor from "../models/tutorModel.js"
// document.querySelector('#signup-form').addEventListener('submit', (e) => {
//     e.preventDefault()

//     let inputName = document.querySelector('#signup-Fname').value.trim()
//     let inputSurname = document.querySelector('#signup-Lname').value.trim()
//     let inputEmail = document.querySelector('#signup-email').value.trim()
//     let inputLocation = document.querySelector('#signup-city').value.trim()
//     let userTypeSelect = document.querySelector('#userType').value.trim().toLowerCase()
//     let inputPassword = document.querySelector('#signup-password').value.trim()
//     // let submitBtn = document.querySelector('#submitBtn')

//    if (!inputName ||
//         !inputSurname ||
//         !inputEmail||
//         !inputLocation ||
//         !inputPassword) {
//        alert('Unfilled data');
//     }

//     try {
//         switch (userTypeSelect) {
//             case 'aluno':
//                 Student.addStudent(inputName, inputSurname, inputEmail, inputLocation, inputPassword)
//                 alert('Student signed up')
//                 window.location.href = '/html/login.html'
//                 break;
//             case 'tutor':
//                 Tutor.addTutor(inputName, inputSurname, inputEmail, inputLocation, inputPassword)
//                 alert('Tutor signed up')
//                 window.location.href = '/html/login.html'
//                 break;
//             default:
//                 throw new Error("Invalid user");
//         }
//     } catch (error) {
//         alert(error.message);
//         console.error(error.message);   
//     }
// })

