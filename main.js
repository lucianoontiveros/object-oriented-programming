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

// Crear usuario y ejemplos para verificar las funciones

// Suponemos que `foundOrCreateUser` inicializa un usuario si no existe en el objeto `users`

// Ejemplo 1: Agregar un examen válido
console.log("Ejemplo 1: Agregar examen válido");
addExam("usuario1", "12-03 FIN Matemáticas");
// Este debería agregar el examen "Matemáticas" para "usuario1" en la fecha 12-03

// Ejemplo 2: Agregar un examen con una fecha inválida
console.log("\nEjemplo 2: Agregar examen con fecha inválida");
addExam("usuario1", "32-03 FIN Física");
// Este debería mostrar un mensaje de error ya que la fecha "32-03" no es válida

// Ejemplo 3: Agregar un examen con fecha pasada
console.log("\nEjemplo 3: Agregar examen con fecha pasada");
addExam("usuario1", "01-01 FIN Historia");
// Este debería eliminar automáticamente el examen si la fecha ya pasó

// Ejemplo 4: Revisar exámenes de un usuario
console.log("\nEjemplo 4: Revisar exámenes de usuario1");
reviewExam("usuario1");
// Debería listar todos los exámenes actuales de "usuario1"

// Ejemplo 5: Eliminar un examen específico por ID

deleteExam("usuario1");

// Este debería eliminar el primer examen de la lista de "usuario1", si existe

// Ejemplo 6: Revisar exámenes después de eliminar uno
console.log("\nEjemplo 6: Revisar exámenes después de eliminar uno");
reviewExam("usuario1");
// Debería mostrar los exámenes restantes en la lista de "usuario1" tras la eliminación

// Ejemplo 7: Eliminar todos los exámenes de un usuario
console.log("\nEjemplo 7: Eliminar todos los exámenes de usuario1");
deleteAllExams("usuario1");
// Este debería vaciar la lista de exámenes de "usuario1" y mostrar un mensaje de confirmación

// Ejemplo 8: Revisar después de eliminar todos los exámenes
console.log("\nEjemplo 8: Revisar después de eliminar todos los exámenes");
reviewExam("usuario1");
// Debería mostrar un mensaje diciendo que "usuario1" no tiene exámenes

// Ejemplo 9: Agregar múltiples exámenes y verificar la eliminación automática de exámenes pasados
console.log(
  "\nEjemplo 9: Agregar múltiples exámenes y verificar eliminación automática"
);
addExam("usuario2", "15-11 PARCIAL Biología");
addExam("usuario2", "01-01 FINAL Historia"); // Fecha pasada
addExam("usuario2", "30-11 FIN Química");
reviewExam("usuario2");
// Debería mostrar solo los exámenes válidos y eliminar automáticamente el de fecha pasada (01-01)
