window.initdata = function initdata() {
  console.log("Executando initdata...");

  if (!localStorage.getItem('users')) {
    const users = [
      // Admins 
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

      // Students
      {
        name: "EsmadAl",
        surname: "Aluno",
        email: "esmadAl@email.com",
        location: "Vila do Conde",
        password: "esmadal",
        userType: "aluno",
        favourites:[],
        rewardUsed:[],
        classesTaken:[]
      },
      {
        name: "Tiago",
        surname: "Costa",
        email: "tiago.costa@email.com",
        location: "Lisboa",
        password: "tg456",
        userType: "aluno",
        favourites:[],
        rewardUsed:[],
        classestTaken:[]
      },
      {
        name: "Beatriz",
        surname: "Silva",
        email: "beatriz.silva@email.com",
        location: "Porto",
        userType: "aluno",
        favourites:[],
        rewardUsed:[],
        classesTaken:[]
      },

      // TUTORES 
      {
        name: "Ana",
        surname: "Moura",
        email: "ana@tutor.pt",
        location: "Lisboa",
        password: "tutor123",
        subjects: ["ES-Matemática A", "ES-Física e Química A"], 
        levels: ["secundario"],
        modality: ["Presencial"], 
        phone: "912345678",
        bio: "Professora com 10 anos de experiência no ensino secundário.",
        educationLevel: "Ensino Secundário",
        price: 20,
        image: "/assets/svg/tutor1.svg",
        specialNeeds: "Sim", 
        // availability: {
        //   monMorning: false, tueMorning: false, wedMorning: false, thuMorning: false, friMorning: false, satMorning: false, sunMorning: false,
        //   monAfternoon: true, tueAfternoon: true, wedAfternoon: true, thuAfternoon: true, friAfternoon: true, satAfternoon: false, sunAfternoon: false
        // },
        userType: "tutor",
        isAuthorized:true
      },
      {
        name: "Carlos",
        surname: "Lopes",
        email: "carlos@tutor.pt",
        location: "Coimbra",
        password: "abcd123",
        subjects: ["ES-História", "ES-Geografia A"],
        levels: ["secundario"],
        modality: ["Online"],
        phone: "913456789",
        bio: "Apaixonado por história, com experiência em ensino remoto.",
        educationLevel: "Ensino Secundário",
        price: 18,
        image: "/assets/svg/tutor2.svg",
        specialNeeds: "Não",
        // availability: {
        //   monMorning: false, tueMorning: true, wedMorning: false, thuMorning: true, friMorning: false, satMorning: false, sunMorning: false,
        //   monAfternoon: false, tueAfternoon: false, wedAfternoon: false, thuAfternoon: false, friAfternoon: false, satAfternoon: false, sunAfternoon: false
        // },
        userType: "tutor",
        isAuthorized:true
      },
      {
        name: "Ana",
        surname: "Ferreira",
        email: "ana.ferreira@tutor.pt",
        location: "Lisboa",
        password: "ana456",
        subjects: ["ES-Matemática A", "ES-Física e Química A"],
        levels: ["secundario"],
        modality: ["Online"],
        phone: "914567890",
        bio: "Explicadora dedicada, com foco em preparação para exames nacionais.",
        educationLevel: "Ensino Secundário",
        price: 22,
        specialNeeds: "Sim",
        image: "/assets/svg/tutor3.svg",
        // availability: {
        //   monMorning: false, tueMorning: false, wedMorning: false, thuMorning: false, friMorning: false, satMorning: true, sunMorning: true,
        //   monAfternoon: false, tueAfternoon: false, wedAfternoon: false, thuAfternoon: false, friAfternoon: false, satAfternoon: false, sunAfternoon: false
        // },
        userType: "tutor",
        isAuthorized:true
      },
      {
        name: "Mariana",
        surname: "Pereira",
        email: "mariana.pereira@tutor.pt",
        location: "Braga",
        password: "mari789",
        subjects: ["EB-Inglês", "EB-Português", "ES-Português"],
        levels: ["ambos"], 
        modality: ["Online"],
        phone: "912345678",
        bio: "Sou licenciada em Línguas e Literaturas Modernas e dou explicações há mais de 5 anos.",
        educationLevel: ["Ensino Básico","Ensino Secundário"],
        price: 15,
        specialNeeds: "Não",
        image: "/assets/svg/tutor4.svg",
        // availability: {
        //   monMorning: false, tueMorning: false, wedMorning: false, thuMorning: false, friMorning: false, satMorning: false, sunMorning: false,
        //   monAfternoon: true, tueAfternoon: true, wedAfternoon: true, thuAfternoon: true, friAfternoon: true, satAfternoon: false, sunAfternoon: false
        // },
        userType: "tutor",
        isAuthorized:false,
      },
      {
        name: "EsmadTT",
        surname: "Tutor",
        email: "esmad@tutor.pt",
        location: "Vila do Conde",
        password: "esmadtt",
        subjects: ["EB-Português"],
        levels: ["basico"], 
        modality: ["Presencial"],
        phone: "915678901",
        bio: "Experiência com alunos do 3.º ciclo e reforço de gramática.",
        educationLevel: "Ensino Básico",
        price: 15,
        specialNeeds: "Não",
        image: "/assets/svg/tutor6.svg",
        // availability: {
        //   monMorning: false, tueMorning: false, wedMorning: false, thuMorning: false, friMorning: false, satMorning: false, sunMorning: false,
        //   monAfternoon: true, tueAfternoon: true, wedAfternoon: true, thuAfternoon: true, friAfternoon: true, satAfternoon: false, sunAfternoon: false
        // },
        userType: "tutor",
        isAuthorized:true
      }
    ];

    localStorage.setItem('users', JSON.stringify(users));
  }

  // Education levels 
  if (!localStorage.educationLevels) {
    const educationLevels = [
      {
        id: 1,
        name: "Ensino Básico (3.º Ciclo)",
        subjects: [
          "EB-Português",
          "EB-Inglês",
          "EB-Francês",
          "EB-Espanhol",
          "EB-História",
          "EB-Geografia",
          "EB-Matemática",
          "EB-Ciências Naturais",
          "EB-Físico-Química"
        ]
      },
      {
        id: 2,
        name: "Ensino Secundário",
        subjects: [
          "ES-Português",
          "ES-Língua Estrangeira",
          "ES-Filosofia",
          "ES-Matemática A",
          "ES-Geometria Descritiva A",
          "ES-Física e Química A",
          "ES-Biologia e Geologia",
          "ES-Economia A",
          "ES-Geografia A",
          "ES-História B",
          "ES-Literatura Portuguesa"
        ]
      }
    ];

    localStorage.setItem('educationLevels', JSON.stringify(educationLevels));
  }

  // Subjects 
  if (!localStorage.getItem('subjects')) {
const subjects = [
  "Português", "Inglês", "Francês", "Espanhol",
  "História", "Geografia", "Matemática",
  "Ciências Naturais", "Físico-Química",
  "Língua Estrangeira", "Filosofia", "Matemática A",
  "Geometria Descritiva A", "Física e Química A",
  "Biologia e Geologia", "Economia A", "Geografia A",
  "História B", "Literatura Portuguesa"
];

    localStorage.setItem('subjects', JSON.stringify(subjects));
  }

  // Locations (mantido igual)
  if (!localStorage.locations) {
    const locations = [
      "Porto", "Lisboa", "Braga", "Coimbra", "Vila do Conde", "Faro"
    ];
    localStorage.setItem('locations', JSON.stringify(locations));
  }
};
initdata();