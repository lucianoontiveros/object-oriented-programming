import {
  users,
  registrationUsers,
} from "../LocalStorage/controllerLocalStorage";
import { foundOrCreateUser } from "../controllerUsers/controllerUsers";

class PersonalData {
  constructor() {
    this.sign;
    this.points = 0;
    this.nationality;
    this.birth;
    this.instagram;
    this.oppositionfor;
    this.studyfor;
    this.croquetastotal;
  }
}

const sendMensaje = (message) => {
  console.log(message);
};

const MESSAGE = {
  addConfirmDataUser: (user) =>
    `${user} agrega por primera vez un perfil de información de usuario`,
  addPointsUser: (user, points) =>
    points == 1
      ? `${user} agregó ${points} punto`
      : `${user} ahora tiene ${points} puntos`,
  addNationalityUser: (user, nationality) =>
    `${user}, confirma su nacionalidad como ${nationality}`,
  addBirthUser: (user, birth, sign) =>
    `${user} indico que su fecha de nacimiento es el ${birth} y su signo es ${sign}`,
  addInstagramUser: (user, instagram) =>
    `${user} confirma que su usuario de instagram es: ${instagram}`,
  addOppositionUser: (user, oppositionUser) =>
    `${user} indicó que oposita para ${oppositionUser}`,
  addStudyForUser: (user, studyForUser) =>
    `${user} indicó que estudia para ${studyForUser}`,
  addCroquetasUser: (user, croquetasUser) =>
    croquetasUser == 1
      ? `${user} le entregó ${croquetasUser} croqueta a Brunito, en todo este tiempo`
      : `${user} le entrego ${croquetasUser} croquetas en todo este tiempo`,
  noPoints: (user) =>
    `${user}, no tiene puntos. Puede generar los mismos registrando y gestionando tus tareas y examenes`,
};

const reviewPersonalData = (user) => {
  if (!users[user]?.personaldata?.length) {
    const personalDataUser = new PersonalData();
    users[user] = { ...users[user], personaldata: [personalDataUser] }; // Evitar mutaciones directas
    sendMensaje(MESSAGE.addConfirmDataUser(user));
    registrationUsers(users);
  }
};

const updatePersonalData = (user, key, value) => {
  foundOrCreateUser(user);
  reviewPersonalData(user);
  users[user].personaldata.forEach((data) => (data[key] = value));
  registrationUsers(users);
};

const addBirth = (user, dateBirth) => {
  foundOrCreateUser(user);
  reviewPersonalData(user);
  updatePersonalData(user, "birth", dateBirth);
  registrationUsers(users);
  addDataSignZodiacal(user, dateBirth);
};

const addDataSignZodiacal = (user, dateBirth) => {
  const [dia, mes] = dateBirth.split("-").map(Number);
  let sign;
  switch (mes) {
    case 3:
      sign = dia >= 21 ? "Aries ♈︎" : "Piscis ♓︎";
      break;
    case 4:
      sign = dia <= 19 ? "Aries ♈︎" : "Tauro ♉︎";
      break;
    case 5:
      sign = dia <= 20 ? "Tauro ♉︎" : "Géminis ♊︎";
      break;
    case 6:
      sign = dia <= 20 ? "Géminis ♊︎" : "Cáncer ♋︎";
      break;
    case 7:
      sign = dia <= 22 ? "Cáncer ♋︎" : "Leo ♌︎";
      break;
    case 8:
      sign = dia <= 22 ? "Leo ♌︎" : "Virgo ♍︎";
      break;
    case 9:
      sign = dia <= 22 ? "Virgo ♍︎" : "Libra ♎︎";
      break;
    case 10:
      sign = dia <= 22 ? "Libra ♎︎" : "Escorpio ♏︎";
      break;
    case 11:
      sign = dia <= 21 ? "Escorpio ♏︎" : "Sagitario ♐︎";
      break;
    case 12:
      sign = dia <= 21 ? "Sagitario ♐︎" : "Capricornio ♑︎";
      break;
    case 1:
      sign = dia <= 18 ? "Capricornio ♑︎" : "Acuario ♒︎";
      break;
    case 2:
      sign = dia <= 19 ? "Acuario ♒︎" : "Piscis ♓︎";
      break;
    default:
      sign = "Indefinido, no pudo establecerse";
  }
  users[user].personaldata[0].sign = sign;
  sendMensaje(MESSAGE.addBirthUser(user, dateBirth, sign));
};

const addDataPoints = (user) => {
  updatePersonalData(user, "points", users[user].personaldata[0].points + 1);
  sendMensaje(MESSAGE.addPointsUser(user, users[user].personaldata[0].points));
};

const addDataNationality = (user, nationalityUser) => {
  updatePersonalData(user, "nationality", nationalityUser);
  sendMensaje(MESSAGE.addNationalityUser(user, nationalityUser));
};

const addInstagram = (user, instaUser) => {
  updatePersonalData(user, "instagram", instaUser);
  sendMensaje(MESSAGE.addInstagramUser(user, instaUser));
};

const addOppositionfor = (user, oppositionUser) => {
  updatePersonalData(user, "opposition".oppositionUser);
  sendMensaje(MESSAGE.addOppositionUser(user, oppositionUser));
};

const addStudyFor = (user, studyforUser) => {
  updatePersonalData(user, "studyfor", studyforUser);
  sendMensaje(MESSAGE.addStudyForUser(user, studyforUser));
};

const addCroquetasTotal = (user, croquetas) => {
  updatePersonalData(user, "croquetastotal", croquetas);
  sendMensaje(MESSAGE.addCroquetasUser(user, croquetas));
};

const giveCroquetas = (user) => {
  if (users[user].personaldata[0].points !== 0) {
    addCroquetasTotal(user, users[user].personaldata[0].croquetastotal + 1);
    updatePersonalData(user, "points", users[user].personaldata[0].points - 1);
  } else sendMensaje(MESSAGE.noPoints(user));
};

export {
  addDataPoints,
  addDataNationality,
  addBirth,
  addInstagram,
  addOppositionfor,
  addStudyFor,
  addCroquetasTotal,
  giveCroquetas,
};

/* 
import {
  users,
  registrationUsers,
} from "../LocalStorage/controllerLocalStorage"; // Módulos relacionados con almacenamiento local
import { foundOrCreateUser } from "../controllerUsers/controllerUsers"; // Función para verificar o crear usuarios

// Clase que representa los datos personales de un usuario
class PersonalData {
  constructor() {
    this.sign = ""; // Evitar variables sin inicializar
    this.points = 0;
    this.nationality = "";
    this.birth = "";
    this.instagram = "";
    this.oppositionfor = "";
    this.studyfor = "";
    this.croquetastotal = 0; // Inicializar para evitar errores con cálculos
  }
}

// Función genérica para enviar mensajes, actualmente imprime en consola
const sendMensaje = (message) => {
  console.log(message);
};

// Mensajes constantes reutilizables para mantener consistencia y evitar hardcoding
const MESSAGE = {
  addConfirmDataUser: (user) =>
    `${user} agregó por primera vez un perfil de información de usuario`,
  addPointsUser: (user, points) =>
    `${user} ahora tiene ${points} ${points === 1 ? "punto" : "puntos"}`,
  addNationalityUser: (user, nationality) =>
    `${user} confirma su nacionalidad como ${nationality}`,
  addBirthUser: (user, birth, sign) =>
    `${user} indicó que su fecha de nacimiento es el ${birth} y su sign es ${sign}`,
  addInstagramUser: (user, instagram) =>
    `${user} confirma que su usuario de Instagram es: ${instagram}`,
  addOppositionUser: (user, opposition) =>
    `${user} indicó que oposita para ${opposition}`,
  addStudyForUser: (user, studyFor) =>
    `${user} indicó que estudia para ${studyFor}`,
  addCroquetasUser: (user, croquetas) =>
    `${user} ahora tiene ${croquetas} ${croquetas === 1 ? "croqueta" : "croquetas"} más`,
};

// Función para revisar y crear datos personales si no existen
const reviewPersonalData = (user) => {
  if (!users[user]?.personaldata?.length) {
    const personalDataUser = new PersonalData();
    users[user] = { ...users[user], personaldata: [personalDataUser] }; // Evitar mutaciones directas
    sendMensaje(MESSAGE.addConfirmDataUser(user));
    registrationUsers(users);
  }
};

// Agregar sign zodiacal basado en la fecha de nacimiento (dummy actualmente)
const addDataSignZodiacal = (user, dateBirth) => {
  const sign = ""; // Placeholder: Implementar lógica real para signo zodiacal
  sendMensaje(MESSAGE.addBirthUser(user, dateBirth, sign));
  registrationUsers(users);
};

// Función genérica para actualizar propiedades de datos personales
const updatePersonalData = (user, key, value) => {
  foundOrCreateUser(user);
  reviewPersonalData(user);
  users[user].personaldata.forEach((data) => (data[key] = value));
  registrationUsers(users);
};

// Función para agregar puntos a un usuario
const addDataPoints = (user) => {
  updatePersonalData(user, "points", users[user].personaldata[0].points + 1);
  sendMensaje(MESSAGE.addPointsUser(user, users[user].personaldata[0].points));
};

// Agregar nacionalidad
const addDataNationality = (user, nationality) => {
  updatePersonalData(user, "nationality", nationality);
  sendMensaje(MESSAGE.addNationalityUser(user, nationality));
};

// Agregar fecha de nacimiento
const addBirth = (user, dateBirth) => {
  updatePersonalData(user, "birth", dateBirth);
  addDataSignZodiacal(user, dateBirth);
};

// Agregar usuario de Instagram
const addInstagram = (user, instagram) => {
  updatePersonalData(user, "instagram", instagram);
  sendMensaje(MESSAGE.addInstagramUser(user, instagram));
};

// Agregar oposición
const addOppositionfor = (user, opposition) => {
  updatePersonalData(user, "oppositionfor", opposition);
  sendMensaje(MESSAGE.addOppositionUser(user, opposition));
};

// Agregar motivo de estudio
const addStudyFor = (user, studyFor) => {
  updatePersonalData(user, "studyfor", studyFor);
  sendMensaje(MESSAGE.addStudyForUser(user, studyFor));
};

// Agregar croquetas a un usuario
const croquetasTotal = (user, croquetas) => {
  updatePersonalData(user, "points", users[user].personaldata[0].points + croquetas);
  sendMensaje(MESSAGE.addCroquetasUser(user, croquetas));
};

// Exportar funciones para uso externo
export {
  addDataPoints,
  addDataNationality,
  addBirth,
  addInstagram,
  addOppositionfor,
  addStudyFor,
  addCroquetasTotal,
};
*/
