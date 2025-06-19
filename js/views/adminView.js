// SUBJECTSVIEW
import { initSubjects, addSubject, deleteSubject, editSubject, initEducationLevels, deleteLevel } from "../models/subjectsLevelModel.js"
import * as User from "../models/userModel.js";

document.addEventListener('DOMContentLoaded', function () {
    renderSubjects()
    renderEducationLevels()
    renderTutors()

})
let subjects = initSubjects()
let educationLevels = initEducationLevels()
let users = User.initUsers();

console.log(educationLevels)

let subjectToEdit = null;
const input = document.getElementById('subject-input')

// Add a new subject
document.querySelector('#subjects-form').addEventListener('submit', (e) => {
    e.preventDefault()
    let newSubject = input.value.trim()
    if (subjectToEdit) {
        try {
            subjects = editSubject(subjects, subjectToEdit, newSubject)
            subjectToEdit = null;
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }

    } else {
        try {
            addSubject(subjects, newSubject)

        } catch (error) {
            alert(error.message)
            console.log(error.message)
        }
    }

    input.value = ''
    renderSubjects()

})

function renderSubjects() {
    const tbody = document.getElementById('subjects-table-body')
    tbody.innerHTML = ""

    // Subjects table 
    subjects.forEach(subject => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${subject}</td>
        <td><button type="button" class="btn btn-secondary editSubject "  data-subject="${subject}"> <i class="fa-solid fa-pen"></i> Edit</button></td>
        <td><button type="button" class="btn btn-danger removeSubject" data-subject="${subject}"  > <i class="fa-solid fa-trash-can"></i> Delete</button></td>
        `
        tbody.appendChild(row)
    });


    // Remove a subject
    document.querySelectorAll(".removeSubject").forEach(button => {
        //console.log('ok');
        button.addEventListener("click", () => {
            const subjectToDelete = button.dataset.subject;
            if (confirm(`Deseja mesmo remover a disciplina?`)) {
                deleteSubject(subjects, subjectToDelete);
                renderSubjects() 
                //location.reload();
            }
        });
    });


    // Edit a subject
    document.querySelectorAll(".editSubject").forEach(button => {
        button.addEventListener("click", () => {
            subjectToEdit = button.dataset.subject;
            input.value = subjectToEdit
            // let editedSubject=subjectToEdit
            input.focus();
        });
    });


}

// render education levels
function renderEducationLevels() {
    const tbody = document.getElementById('education-levels-table-body')
    tbody.innerHTML = ""

    // levels table 
    educationLevels.forEach(level => {
        const row = document.createElement('tr');
        const levelSubjectsList = level.subjects.map(subject => `<p>${subject}</p>`).join('');
        row.innerHTML = `
        <td>${level.name}</td>
      <td>${levelSubjectsList}</td>
      <td>
        <button type="button" class="btn btn-secondary editLevel" data-id="${level.id}">
          <i class="fa-solid fa-pen"></i> Edit
        </button>
      </td>
      <td>
        <button type="button" class="btn btn-danger removeLevel" data-id="${level.id}">
          <i class="fa-solid fa-trash-can"></i> Delete
        </button>
      </td>
    `
        tbody.appendChild(row)
    });


    // Remove an Education Level
    document.querySelectorAll(".removeLevel").forEach(button => {
        //console.log('ok');
        button.addEventListener("click", () => {
            const levelToDelete = button.dataset.id;
            if (confirm(`Deseja mesmo remover a disciplina?`)) {
                deleteLevel(educationLevels, levelToDelete);
                //console.log(levelToDelete);
                location.reload();
                //console.log(levelToDelete);
            }
        });
    });

    // Edit an Education Level
    //   document.querySelectorAll(".editSubject").forEach(button => {
    //         button.addEventListener("click", () => {
    //             subjectToEdit = button.dataset.subject;
    //             input.value = subjectToEdit
    //             // let editedSubject=subjectToEdit
    //             input.focus();
    //         });
    //     });

}
function createSubjectsSelctor(subjects) {
    const subjectsSelect = document.getElementById('subjects-select')
    subjectsSelect.innerHTML = ""

    let options = '';
    subjects.forEach(subject => {
        options += `<option value="${subject}">${subject}</option>`;
    })
    subjectsSelect.innerHTML = options
}
createSubjectsSelctor(subjects)


function renderTutors() {
    const tbody = document.getElementById('tutors-table-body')
    tbody.innerHTML = ""

    users.forEach(user => {
        if (user.userType === 'tutor') {

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name} ${user.surname}</td>
                ${user.isAuthorized
                    ? `<td><button type="button" class="btn btn-secondary authorizeTutor disabled" data-tutor="${user.email}"><i class="fa-solid fa-check"></i> Autorizado</button></td>`
                    : `<td><button type="button" class="btn btn-success authorizeTutor" data-tutor="${user.email}"><i class="fa-solid fa-check"></i> Autorizar</button></td>`
                }
               
                <td><button type="button" class="btn btn-danger removeTutor" data-tutor="${user.email}"  > <i class="fa-solid fa-trash-can"></i> Delete</button></td>
                `
            tbody.appendChild(row)
        }

    });


    // REMOVE A TUTOR
    document.querySelectorAll(".removeTutor").forEach(button => {

        button.addEventListener("click", () => {
            const tutorToDelete = button.dataset.tutor;
            if (confirm(`Deseja mesmo remover o explicador?`)) {
                User.deleteTutor(users, tutorToDelete);
                location.reload();
            }
        });
    });

    // AUTHORIZE A TUTOR
    document.querySelectorAll(".authorizeTutor").forEach(button => {

        button.addEventListener("click", () => {
            const tutorEmail = button.dataset.tutor;
            let tutorIndex = users.findIndex(user => user.email === tutorEmail)

            if (tutorIndex !== -1) {
                users[tutorIndex].isAuthorized = true
                localStorage.setItem('users', JSON.stringify(users));
                renderTutors()
            }
        });
    });



}


