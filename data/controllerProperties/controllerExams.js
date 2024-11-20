import {
  users,
  registrationUsers,
} from "../LocalStorage/controllerLocalStorage";
import { foundOrCreateUser } from "../controllerUsers/controllerUsers";
import { addDataPoints } from "../controllerProperties/controllerPersonalData";

class Exams {
  constructor(dateExam, typeExam, titleExam, examID) {
    this.dateExam = dateExam;
    this.typeExam = typeExam;
    this.titleExam = titleExam;
    this._id = examID;
  }

  get id() {
    return `${this.titleExam} tiene el ID: ${this._id}`;
  }
}

const sendMensaje = (message) => {
  console.log(message);
};

const MESSAGE = {
  errorValidDate: (user) =>
    `${user} Fecha no válida. Use el formato dd-mm y asegúrese de que sea una fecha existente.`,
  errorID: (user) => `El id especificado es incorrecto, ${user}`,
  noExams: (user) =>
    `No tiene examenes ${user}. Puede crear un listado utilizando addExam() con el formato dd-mm, type-exam, Title-Exam: ejemplo  12-03 FIN neumonia y enfermedades pulmonares`,
  deleteExams: (user) => `${user}, tus examenes fueron eliminados de la lista`,
  deleteExam: (user, ID) => `${user} tu examen fue eliminado con ID: ${ID}`,
};

// comprobaciones de ingreso de fecha
const isValidDate = (dateString) => {
  const [day, month] = dateString.split("-").map(Number);

  // Validar rango de mes
  if (month < 1 || month > 12) return false;

  // Validar rango de día según el mes
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Ajustar para años bisiestos (asumiendo año actual)
  const currentYear = new Date().getFullYear();
  if (
    month === 2 &&
    currentYear % 4 === 0 &&
    (currentYear % 100 !== 0 || currentYear % 400 === 0)
  ) {
    daysInMonth[1] = 29;
  }

  return day > 0 && day <= daysInMonth[month - 1];
};

//Verificar si la fecha del examen es pasada
const isPastDate = (dateString) => {
  const [day, month] = dateString.split("-").map(Number);
  const today = new Date();
  // Ignorar horas, comparando solo fechas
  const examDate = new Date(today.getFullYear(), month - 1, day, 0, 0, 0, 0);
  const todayWithoutTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
    0
  );

  return examDate < todayWithoutTime;
};

const examID = () => Math.random().toString(36).substring(2, 5);

const addExam = (addExamUser, dateExamUser) => {
  foundOrCreateUser(addExamUser);
  const dateExam = dateExamUser.slice(0, 5);

  // Validar formato de fecha
  if (!isValidDate(dateExam)) {
    sendMensaje(MESSAGE.errorValidDate(addExamUser));
    return;
  }

  const typeExam = dateExamUser.slice(6, 9).toUpperCase();
  const titleExam =
    dateExamUser.slice(10).charAt(0).toUpperCase() + dateExamUser.slice(11);

  const newDataExamUser = new Exams(dateExam, typeExam, titleExam, examID());
  users[addExamUser].exams.push(newDataExamUser);

  // Ordenar exámenes por fecha (día y mes)
  users[addExamUser].exams.sort((a, b) => {
    const [dayA, monthA] = a.dateExam.split("-").map(Number);
    const [dayB, monthB] = b.dateExam.split("-").map(Number);

    if (monthA === monthB) {
      return dayA - dayB; // Ordenar por día si el mes es el mismo
    }
    return monthA - monthB; // Ordenar por mes
  });

  // Filtrar solo exámenes que no sean pasados
  users[addExamUser].exams = users[addExamUser].exams.filter(
    (exam) => !isPastDate(exam.dateExam)
  );

  registrationUsers(users);
};

// Eliminar examen por ID
const deleteExam = (deleteExamUser, examID) => {
  foundOrCreateUser(deleteExamUser);
  const deleteExamForID = users[deleteExamUser].exams.findIndex(
    (examUser) => examUser._id === examID
  );
  if (deleteExamForID != -1) {
    users[deleteExamUser].exams.splice(deleteExamForID, 1);
    sendMensaje(MESSAGE.deleteExam(deleteExamUser, examID));
  } else {
    sendMensaje(MESSAGE.noExams(deleteExamUser));
    registrationUsers(users);
    console.log(users[deleteExamUser].exams);
  }
};

const reviewExam = (reviewExamUSer) => {
  const reviewExamUser = users[reviewExamUSer].exams.map((userExam) => {
    console.log(userExam.typeExam, userExam.dateExam, userExam.titleExam);
  });
  foundOrCreateUser(reviewExamUSer);
  if (reviewExamUser.length === 0) {
    sendMensaje(MESSAGE.noExams(reviewExamUSer));
  }
};

const deleteAllExams = (deletaAllExamUSer) => {
  foundOrCreateUser(deletaAllExamUSer);
  const deleteListExamsUser = users[deletaAllExamUSer].exams.map((userExam) => {
    console.log(userExam.typeExam, userExam.dateExam, userExam.titleExam);
  });
  if (deleteListExamsUser.length === 0) {
    sendMensaje(MESSAGE.noExams(deletaAllExamUSer));
  } else {
    users[deletaAllExamUSer].exams = [];
    sendMensaje(MESSAGE.deleteExams(deletaAllExamUSer));
  }
  registrationUsers(users);
};

export { addExam, deleteExam, reviewExam, deleteAllExams };
