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
