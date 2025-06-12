import * as User from '../models/userModel.js';
let users = User.initUsers();

if (!User.isLogged()) {
    window.location.href = '/html/login.html';
}

export function changeData() {// Function to change user data (password and location)
    const loggedUser = User.getLoggedUser();
    console.log(loggedUser.password, loggedUser.location);

    document.getElementById("editStudentForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const newPassword = document.getElementById("editStudentPasswordConfirm").value;
        const confirmPassword = document.getElementById("editStudentPassword").value;
        const newLocation = document.getElementById("editStudentLocation").value;
        console.log(newLocation, newPassword, confirmPassword);



        if (loggedUser) {

            const userEmail = loggedUser.email;
            let user = users.find(user => user.email === userEmail);
            if (user) {

                if (newPassword || confirmPassword) {
                    if (newPassword !== confirmPassword) {
                        alert("As palavras-passe não coincidem. Por favor, tente novamente.");
                        return;
                    }

                    if (newPassword === User.password) {
                        alert("A nova palavra-passe não pode ser igual à atual.")
                        return;
                    }

                    user.password = newPassword;

                }

                
                user.location = newLocation;
                localStorage.setItem("users", JSON.stringify(users));
                alert("Dados atualizados com sucesso!");
                console.log(user);

                let modal = bootstrap.Modal.getInstance(document.getElementById('editStudentModal'))
                if(modal){
                   modal.hide();
                } 
                console.log("Modal closed");
            } else {
                alert("Erro ao atualizar os dados. Por favor, tente novamente.");
            }
        }
    })
}
changeData();





