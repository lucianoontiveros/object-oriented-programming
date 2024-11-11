import {
  users,
  registrationUsers,
} from "../LocalStorage/controllerLocalStorage";

class Examns {
  constructor(dateExamn, tipoExam, titleExam, examID) {
    this.dateExamn = dateExamn;
    this.tipoExamn = tipoExam;
    this.titleExamn = titleExam;
    this._id = examID;
  }

  get id() {
    return `${this.titleExamn} tiene el ID: ${this._id}`;
  }
}

const addExamn = (viewer, dateExamnUser) => {
  const dateExamn = dateExamnUser;
  const tipoExam = dateExamnUser;
  const titleExam = dateExamnUser;
  const timestamp = Date.now().toString(36);
  const randomSegment = Math.floor(Math.random() * 10000).toString(36);
  const examID = `${timestamp}-${randomSegment}`;

  const newDataExamnUser = new Examns(
    dateExamn,
    tipoExam,
    titleExam,
    examID.slice(0, 3)
  );
  users[viewer].examns.push(newDataExamnUser);
};

const deleteExamn = (viewer, examnID) => {
  const deleteExamUser = users[viewer].examns.filter(
    (examnUser) => examnUser.id === examnID
  );
};

const reviewExamn = () => {};

const deleteAll = () => {};
