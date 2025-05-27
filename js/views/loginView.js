import * as Student from "../models/studentModel.js"
import * as Tutor from "../models/tutorModel.js"
import * as Admin from "../models/adminModel.js"

Student.init()
Tutor.init()
Admin.init()


document.querySelector('#login-form').addEventListener('submit', (e) => {
    e.preventDefault()

    
    let inputEmail = document.querySelector('#signup-email').value.trim()
    let inputPassword = document.querySelector('#signup-password').value.trim()
    // let submitBtn = document.querySelector('#submitBtn')

   if (!inputEmail||!inputPassword) {
       alert('Unfilled data');
    }
    // Student.loginStudent()
    // Tutor.logintutor()
    // Admin.loginAdmin()
})

