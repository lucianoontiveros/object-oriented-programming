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
  addnationalityUser: (user, nacionality) =>
    `${user}, confirma su nacionalidad como ${nacionality}`,
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
      ? `${user} agregó ${croquetasUser} croqueta`
      : `${user} ahora tiene ${croquetasUser} croquetas más`,
};

const reviewPersonalData = (user) => {
  if (users[user].personaldata == 0) {
    const personalDataUser = new PersonalData();
    users[user].personaldata.push(personalDataUser);
    sendMensaje(MESSAGE.addConfirmDataUser(user));
    registrationUsers(users);
  }
};

const addDataSignZodiacal = (user, dateBirth) => {
  console.log(dateBirth);
  let sign = "Teta";
  sendMensaje(MESSAGE.addBirthUser(user, dateBirth, sign));
  registrationUsers(users);
};

const addDataPoints = (user) => {
  foundOrCreateUser(user);
  reviewPersonalData(user);
  users[user].personaldata.forEach((point) => point.points++);
  sendMensaje(MESSAGE.addPointsUser(user, users[user].personaldata[0].points));
  registrationUsers(users);
};

const addDataNationality = (user, nationalityUser) => {
  foundOrCreateUser(user);
  reviewPersonalData(user);
  users[user].personaldata.forEach(
    (AddNationality) => (AddNationality.nationality = nationalityUser)
  );
  sendMensaje(MESSAGE.addnationalityUser(user, nationalityUser));
  registrationUsers(users);
};

const addBirth = (user, dateBirth) => {
  foundOrCreateUser(user);
  reviewPersonalData(user);
  users[user].personaldata.forEach((AddDate) => (AddDate.birth = dateBirth));
  registrationUsers(users);
  addDataSignZodiacal(user, dateBirth);
};

const addInstagram = (user, instaUser) => {
  foundOrCreateUser(user);
  reviewPersonalData(user);
  users[user].personaldata.forEach(
    (AddInstagram) => (AddInstagram.instagram = instaUser)
  );
  sendMensaje(MESSAGE.addInstagramUser(user, instaUser));
  registrationUsers(users);
};

const addOppositionfor = (user, oppositionUser) => {
  foundOrCreateUser(user);
  reviewPersonalData(user);
  users[user].personaldata.forEach(
    (AddOpposition) => (AddOpposition.oppositionfor = oppositionUser)
  );
  sendMensaje(MESSAGE.addOppositionUser(user, oppositionUser));
  registrationUsers(users);
};

const addStudyFor = (user, studyforUser) => {
  foundOrCreateUser(user);
  reviewPersonalData(user);
  users[user].personaldata.forEach(
    (AddStudyFor) => (AddStudyFor.studyfor = studyforUser)
  );
  sendMensaje(MESSAGE.addStudyForUser(user, studyforUser));
  registrationUsers(users);
};

const croquetasTotal = (user, croquetas) => {
  foundOrCreateUser(user);
  reviewPersonalData(user);
  users[user].personaldata.forEach(
    (addCroquetas) => (addCroquetas.points += croquetas)
  );
  sendMensaje(MESSAGE.addCroquetasUser(user, croquetas));
  registrationUsers(users);
};

export {
  addDataPoints,
  addDataNationality,
  addBirth,
  addInstagram,
  addOppositionfor,
  addStudyFor,
  croquetasTotal,
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
    `${user} indicó que su fecha de nacimiento es el ${birth} y su signo es ${sign}`,
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

// Agregar signo zodiacal basado en la fecha de nacimiento (dummy actualmente)
const addDataSignZodiacal = (user, dateBirth) => {
  const sign = "Teta"; // Placeholder: Implementar lógica real para signo zodiacal
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
  croquetasTotal,
};
*/
