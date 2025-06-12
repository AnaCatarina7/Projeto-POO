window.initdata = function initdata() {


  console.log("Executando initdata...");

  //Users

  if (!localStorage.getItem('users')) {

    const users = [

      //Admins
      {
        name: "Ken",
        email: "ken@123",
        password: "123",
        userType: "admin"
      },
      {
        name: "Catarina",
        email: "cat@123",
        password: "123",
        userType: "admin"
      },
      {
        name: "esmadAdmin",
        email: "esmadAd@email.com",
        password: "123",
        userType: "admin"
      },

      //Students
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
      },

      //tutors
      {
        name: "Ana",
        surname: "Moura",
        email: "ana@tutor.pt",
        location: "Lisboa",
        password: "tutor123",
        subjects: ["Matemática", "Físico-Química"],
        levels: ["Ensino Secundário - Ciências e Tecnologias"],
        userType: "tutor"
      },
      {
        name: "Carlos",
        surname: "Lopes",
        email: "carlos@tutor.pt",
        location: "Coimbra",
        password: "abcd123",
        subjects: ["História", "Geografia"],
        levels: ["Ensino Secundário - Línguas e Humanidades"],
        userType: "tutor"
      },
      {
        name: "EsmadTT",
        surname: "Tutor",
        email: "esmad@tutor.pt",
        location: "Vila do Conde",
        password: "esmadtt",
        subjects: ["Português"],
        levels: ["Ensino Básico (3.º Ciclo)"],
        userType: "tutor"
      }
    ]

    localStorage.setItem('users', JSON.stringify(users))
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

  //SUBJECTS
  if (!localStorage.getItem('subjects')) {
    const subjects = [
      "Matemática",
      "Português",
      "Físico-Química",
      "História",
      "Geografia",
      "Biologia",
      "Inglês"
    ];
    localStorage.setItem('subjects', JSON.stringify(subjects));
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


    //Admins

  // if (!localStorage.getItem('admins')) {

  //   const admins = [
  //     {
  //       name: "Ken",
  //       email: "ken@123",
  //       password: "123",
  //       userType: "admin"
  //     },
  //     {
  //       name: "Catarina",
  //       email: "cat@123",
  //       password: "123",
  //       userType: "admin"
  //     },
  //     {
  //       name: "esmadAdmin",
  //       email: "esmadAd@email.com",
  //       password: "123",
  //       userType: "admin"
  //     }
  //   ]

  //   localStorage.setItem('admins', JSON.stringify(admins))
  // }

  //Students
  // if (!localStorage.getItem('students')) {
  //   const students = [
  //     {
  //       name: "EsmadAl",
  //       surname: "Aluno",
  //       email: "esmadAl@email.com",
  //       location: "Vila do Conde",
  //       password: "esmadal",
  //       userType: "aluno"
  //     },
  //     {
  //       name: "Tiago",
  //       surname: "Costa",
  //       email: "tiago.costa@email.com",
  //       location: "Lisboa",
  //       password: "tg456",
  //       userType: "aluno"
  //     },
  //     {
  //       name: "Beatriz",
  //       surname: "Silva",
  //       email: "beatriz.silva@email.com",
  //       location: "Porto",
  //       password: "btrz789",
  //       userType: "aluno"
  //     }
  //   ]

  //   localStorage.setItem('students', JSON.stringify(students))
  // }


  //Tutors
  // if (!localStorage.getItem('tutors')) {
  //   const tutors = [

  //     {
  //       name: "Ana",
  //       surname: "Moura",
  //       email: "ana@tutor.pt",
  //       location: "Lisboa",
  //       password: "tutor123",
  //       subjects: ["Matemática", "Físico-Química"],
  //       levels: ["Ensino Secundário - Ciências e Tecnologias"],
  //       userType: "tutor"
  //     },
  //     {
  //       name: "Carlos",
  //       surname: "Lopes",
  //       email: "carlos@tutor.pt",
  //       location: "Coimbra",
  //       password: "abcd123",
  //       subjects: ["História", "Geografia"],
  //       levels: ["Ensino Secundário - Línguas e Humanidades"],
  //       userType: "tutor"
  //     },
  //     {
  //       name: "EsmadTT",
  //       surname: "Tutor",
  //       email: "esmad@tutor.pt",
  //       location: "Vila do Conde",
  //       password: "esmadtt",
  //       subjects: ["Português"],
  //       levels: ["Ensino Básico (3.º Ciclo)"],
  //       userType: "tutor"
  //     }
  //   ]

  //   localStorage.setItem('tutors', JSON.stringify(tutors))
  // }
}




initdata();













