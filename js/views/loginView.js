import * as Student from "../models/studentModel.js"
import * as Tutor from "../models/tutorModel.js"
import * as Admin from "../models/adminModel.js"

Student.init()
Tutor.init()
Admin.init()


document.querySelector('#login-form').addEventListener('submit', (e) => {
    e.preventDefault()


    let inputEmail = document.querySelector('#login-email').value.trim()
    let inputPassword = document.querySelector('#login-password').value.trim()
    // let submitBtn = document.querySelector('#submitBtn')

    if (!inputEmail || !inputPassword) {
        alert('Unfilled data');
    }


    try {
        if (Admin.loginAdmin(inputEmail, inputPassword))
        alert('Admin logged')
        window.location.href = '/html/admin.html'
        return
    } catch {}

     try {
        if (Tutor.logintutor(inputEmail, inputPassword))
        alert('Tutor logged')
        window.location.href = '/html/profileTutor.html'
        return
    } catch {}

     try {
        if (Student.loginStudent(inputEmail, inputPassword))
        alert('Student logged')
        window.location.href = '/html/profileStudent.html'
        return
    } catch {}

})

