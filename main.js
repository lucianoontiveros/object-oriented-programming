import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import {
  foundOrCreateUser,
  deleteUser,
  verifyIdUser,
  changeNameUser,
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
addTaskUser("Liana", "Tarea de Liana 1");
addTaskUser("Liana", "Tarea de Liana 2");
addTaskUser("Marcos", "Tarea de Marcos 1");
addTaskUser("Marcos", "Tarea de Marcos 2");
addTaskUser("Luis", "Tarea de Luis 1");
addTaskUser("Pipo", "Tarea de Pipo 2");
// mostrar tareas
readyListAllListUser("Marcos");
readyListAllListUser("Liana");
// eliminar tarea por id
reviewListTaskUser("Marcos");
reviewListTaskUser("Liliana");

// Marcar tarea por id
