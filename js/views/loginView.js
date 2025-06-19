
import * as User from "../models/userModel.js"

User.initUsers()

document.querySelector('#login-form').addEventListener('submit', (e) => {
    e.preventDefault()


    let inputEmail = document.querySelector('#login-email').value.trim()
    let inputPassword = document.querySelector('#login-password').value.trim()
    // let submitBtn = document.querySelector('#submitBtn')

    // inputs validation
    if (!inputEmail || !inputPassword) {
        alert('Unfilled data');
    }

    try {
        if (User.loginUser(inputEmail, inputPassword))
        alert('user logged')
        const loggedUser = User.getLoggedUser()
        if (loggedUser) {
            
            console.log(loggedUser);
              switch (loggedUser.userType) {
            case 'aluno':
                alert('Student logged')
                 window.location.href = '/html/profileStudent.html'
                break;
            case 'tutor':

                alert('Tutor logged')
                window.location.href = '/html/profileTutor.html'
                break;
            case 'admin':
                alert('Admin logged')
                 window.location.href = '/html/admin.html'
                break;
        }
            }

        return
    } catch(error) {
        alert(error);
       console.log(error.message) 
    }
})


