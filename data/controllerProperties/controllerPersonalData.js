import {
  users,
  registrationUsers,
} from "../LocalStorage/controllerLocalStorage";
import { foundOrCreateUser } from "../controllerUsers/controllerUsers";

class PersonalData {
  constructor(username) {
    this.username = username;
    this.tareas = [];
    this.signo = "";
    this.puntos = 0;
    this.nacionalidad = "";
    this.nacimiento = "";
    this.instagram = "";
    this.opositopara = "";
    this.estudiopara = "";
    this.croquetasTotal = 0;
    this.index = "No establecido";
  }
}
