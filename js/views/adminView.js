// SUBJECTSVIEW
import { initSubjects, addSubject, deleteSubject, editSubject } from "../models/adminModel.js"
let subjects = initSubjects()
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
        console.log('ok');
        button.addEventListener("click", () => {
            const subjectToDelete = button.dataset.subject;
            if (confirm(`Deseja mesmo remover a disciplina?`)) {
                deleteSubject(subjects, subjectToDelete);
                location.reload();
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

renderSubjects()




