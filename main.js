import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import {
  foundOrCreateUser,
  deleteUser,
  verifyIdUser,
  changeNameUser,
  deleteInactiveUsersTwoMonths,
} from "./data/controllerUsers/controllerUsers";
import {
  addExam,
  deleteExam,
  reviewExam,
  deleteAllExams,
} from "./data/controllerProperties/controllerExams";

import {
  addTaskUser,
  reviewListTaskUser,
  readyTaskUser,
  deleteTaskUser,
  modifyTaskUser,
  deleteAllListTaskUser,
  readyListAllListUser,
} from "./data/controllerProperties/controllerTasks";

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
  </div>
`;

// crear tareas
deleteInactiveUsersTwoMonths();
foundOrCreateUser("Jorge");
foundOrCreateUser("Melina");
verifyIdUser("Jorge");
deleteUser("Pedro", "dasdas");
deleteUser("Jorge", "m3lqeg4o");
deleteUser("Jorge", "m3lqeg4o-7m9");
changeNameUser("Melina", "Malena");
deleteUser("Sabrina", "adasdasd");
deleteUser("Sabrina", "m3lres7f-6cp");
addExam("Juanjo", "12-12 REC estoy too peldido");
deleteExam("Mario", "pbl");
deleteExam("Juanjo", "x20");
deleteExam("Juanjo", "4gr");
deleteExam("Juanjo", "sp5");
deleteExam("Juanjo", "h0c");
deleteExam("Juanjo", "loi");
reviewExam("Juanjo");
deleteAllExams("Juanjo");
addExam("Juanjo", "12-12 REC peldido");
deleteAllExams("Jorge");
addTaskUser("Juanjo", "Estudiar medicina");
addExam("Juanjo", "12-12 REC estoy too peldido");
addExam("Juanjo", "18-11 REC estoy too peldido");
addExam("Juanjo", "19-11 REC estoy too peldido");
addExam("Juanjo", "17-11 REC estoy too peldido");
addExam("Pipo", "12-02 REC asdfafasdfas");
addExam("Pipo", "12-04 REC asdfafasdfas");
addExam("Pipo", "19-11 REC estoy too peldido");
