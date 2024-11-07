import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import {
  foundUser,
  deleteUser,
  verifyID,
} from "./data/controllerUsers/controllerUsers";

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

foundUser("Macarena");
foundUser("Marcos");
verifyID("Marcos");
deleteUser("Pedro", "m37s7s2t-2ij");
