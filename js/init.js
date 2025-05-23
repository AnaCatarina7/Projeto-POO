initdata();

function initdata() {
  //Admins

  if (!localStorage.admins) {
    const admins = [
      {
        nome: "Ken",
        email: "ken@123",
        password: "123",
        userType: "admin"
      },
      {
        nome: "Catarina",
        email: "cat@123",
        password: "123",
        userType: "admin"
      },
      {
        nome: "esmadAdmin",
        email: "esmadAd@email.com",
        password: "123",
        userType: "admin"
      }
    ]

    localStorage.setItem('admins', JSON.stringify(admins))
  }

  //Students
  if (!localStorage.students) {
    const students = [
      {
        name: "EsmadAl",
        surname: "Aluno",
        email: "esmadAl@email.com",
        location: "Vila do Conde",
        password: "esmadal",
        userType: "aluno"
      },
      {
        name: "Tiago",
        surname: "Costa",
        email: "tiago.costa@email.com",
        location: "Lisboa",
        password: "tg456",
        userType: "aluno"
      },
      {
        name: "Beatriz",
        surname: "Silva",
        email: "beatriz.silva@email.com",
        location: "Porto",
        password: "btrz789",
        userType: "aluno"
      }
    ]

    localStorage.setItem('students', JSON.stringify(students))
  }

  //Education levels
  if (!localStorage.educationLevels) {
    const educationLevels = [

      {
        nome: "Ensino Básico (3.º Ciclo)",
        ciclo: "7.º ao 9.º ano",
        disciplinas: [
          "Português",
          "Inglês",
          "Francês",
          "Espanhol",
          "História",
          "Geografia",
          "Matemática",
          "Ciências Naturais",
          "Físico-Química"
        ]
      },
      {
        nome: "Ensino Secundário - Ciências e Tecnologias",
        ciclo: "10.º ao 12.º ano",
        disciplinas: [
          "Português",
          "Língua Estrangeira",
          "Filosofia",
          "Matemática A",
          "Geometria Descritiva A",
          "Física e Química A",
          "Biologia e Geologia"
        ]
      },
      {
        nome: "Ensino Secundário - Ciências Socioeconómicas",
        ciclo: "10.º ao 12.º ano",
        disciplinas: [
          "Português",
          "Língua Estrangeira",
          "Filosofia",
          "Matemática A",
          "Economia A",
          "Geografia A",
          "História B"
        ]
      },
      {
        nome: "Ensino Secundário - Línguas e Humanidades",
        ciclo: "10.º ao 12.º ano",
        disciplinas: [
          "Português",
          "Língua Estrangeira II",
          "Filosofia",
          "História A",
          "Geografia A",
          "Literatura Portuguesa"
        ]
      }
    ]

    localStorage.setItem('educationLevels', JSON.stringify(educationLevels))
  }

  //Locations
  if (!localStorage.locations) {
    const locations = [
      "Porto",
      "Lisboa",
      "Braga",
      "Coimbra",
      "Vila do Conde",
      "Faro"
    ]

    localStorage.setItem('locations', JSON.stringify(locations))
  }


  //Tutors
  if (!localStorage.tutors) {
    const tutors = [

      {
        nome: "Ana",
        apelido: "Moura",
        email: "ana@tutor.pt",
        localidade: "Lisboa",
        password: "tutor123",
        disciplinas: ["Matemática", "Físico-Química"],
        niveis: ["Ensino Secundário - Ciências e Tecnologias"],
        userType: "tutor"
      },
      {
        nome: "Carlos",
        apelido: "Lopes",
        email: "carlos@tutor.pt",
        localidade: "Coimbra",
        password: "abcd123",
        disciplinas: ["História", "Geografia"],
        niveis: ["Ensino Secundário - Línguas e Humanidades"],
        userType: "tutor"
      },
      {
        nome: "EsmadTT",
        apelido: "Tutor",
        email: "esmad@tutor.pt",
        localidade: "Vila do Conde",
        password: "esmadtt",
        disciplinas: ["Português"],
        niveis: ["Ensino Básico (3.º Ciclo)"],
        userType: "tutor"
      }
    ]

    localStorage.setItem('tutors', JSON.stringify(tutors))
  }
}














