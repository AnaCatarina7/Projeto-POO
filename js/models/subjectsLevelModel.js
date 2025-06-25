
//***MANEGE EDUCATION LEVELS */
export function initEducationLevels() {
  return JSON.parse(localStorage.getItem('educationLevels')) || []
}
export function addLevel(educationLevels,name,subjects ) {
  if (educationLevels.some((level) => level.name.toLowerCase() === name.toLowerCase())) {
    throw Error(`O nível de ensino "${name}" já existe!!`);
  } else {
    const id=getNextId(educationLevels)
    educationLevels.push(new EducationLevel(id,name,subjects));
    localStorage.setItem("educationLevels", JSON.stringify(educationLevels));
  }
}

//EDIT LEVELS
export function updateLevel(educationLevels, updatedLevel) {
  const index = educationLevels.findIndex(level => level.id === updatedLevel.id);
  if (index === -1) {
    throw new Error(`Nível com id ${updatedLevel.id} não encontrado.`);
  }

  // Atualizar name e subjects
  educationLevels[index].name = updatedLevel.name;
  educationLevels[index].subjects = Array.isArray(updatedLevel.subjects) ? updatedLevel.subjects : [];

  // Guardar no localStorage
  localStorage.setItem("educationLevels", JSON.stringify(educationLevels));

  return educationLevels;
}


// DELETE LEVELS
export function deleteLevel(educationLevels, levelToDeleteId) {
  educationLevels = educationLevels.filter(level => level.id !== parseInt(levelToDeleteId))
  localStorage.setItem('educationLevels', JSON.stringify(educationLevels))
  console.log(educationLevels);

}

function getNextId(educationLevels) {
  if (educationLevels.length === 0) return 1
  return Math.max(...educationLevels.map(level => level.id)) + 1
}

////**SUBJECTS */
// GET SUBJECTS FROM LOCAL STORAGE

export function initSubjects() {
  return JSON.parse(localStorage.getItem('subjects')) || []
}

// ADD SUBJECTS
export function addSubject(subjects, newSubject) {
  if (subjects.some((subj) => subj.toLowerCase() === newSubject.toLowerCase())) {
    throw Error(`The subject "${newSubject}" already exists!`);
  } else {
    subjects.push(newSubject);
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }
}

// DELETE SUBJECTS
export function deleteSubject(subjects, subjectToDelete) {
  subjects = subjects.filter(subj => subj !== subjectToDelete)
  localStorage.setItem('subjects', JSON.stringify(subjects))
}

// EDIT A SUBJECT
export function editSubject(subjects, oldSubject, updatedSubject) {
  if (subjects.some((subj) => subj.toLowerCase() === updatedSubject.toLowerCase())) {
    throw Error(`The subject "${updatedSubject}" already exists!`);
  } else if (oldSubject === updatedSubject) {
    throw Error(`The subject "${oldSubject}" is the same as the updated subject!`);
  }
  const updatedSubjects = subjects.map(subj => subj === oldSubject ? updatedSubject : subj)
  localStorage.setItem('subjects', JSON.stringify(updatedSubjects))
  return updatedSubjects
}


class EducationLevel {
  constructor(id, name, subjects) {
    this.id = id;
    this.name = name;
    this.subjects = subjects;
  }
}

