export default class Admin {

    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.userType = 'admin';

    };

    ValidateCredentials(inputEmail, inputPassword) {
       return this.email === inputEmail && this.password === inputPassword;
    }
}


export let admins = [
    new Admin("Ken", "ken@123", "123"),
    new Admin("Catarina", "cat@123", "123"),
    new Admin("esmadAdmin", "esmad@123", "123")
];



export function saveAdminInLocalStorage(admin){
    localStorage.setItem('loggedAdmin',JSON.stringify(admin))
}

export function getAdminFromLocalStorage(){
    return JSON.parse(localStorage.getItem('loggedAdmin'))
}

export function logout(){
    localStorage.removeItem('loggedAdmin')
     window.location.href = "/index.html";
}





// ------------------------------------------------------
import { admins,saveAdminInLocalStorage } from "../models/adminModel.js";



    let inputEmail= document.querySelector('#login_email')
    let inputPasword= document.querySelector('#login_password')
    let submitBtn= document.querySelector('#submitBtn')

    function fillInputs() {
     if(inputEmail.value.trim()!==''&& inputPasword.value.trim()!==''){
        submitBtn.disabled=false
    }else{
        submitBtn.disabled=true
    } }  

    inputEmail.addEventListener('input',fillInputs)
    inputPasword.addEventListener('input',fillInputs)
    
    


document.querySelector('#login-form').addEventListener('submit',(e)=>{
    e.preventDefault() 

    let IsAdmin=admins.find(admin=>admin.ValidateCredentials(inputEmail.value.trim(),inputPasword.value.trim()))
    console.log(IsAdmin);

    if(IsAdmin){
        saveAdminInLocalStorage(IsAdmin)
        alert('login feito com sucesso')
        window.location.href='/html/adminTT.html'
    }else{
        alert('login inválido')
    }
})