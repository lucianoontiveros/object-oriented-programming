import { Viewer } from "../constructores";
import {
  users,
  registrationUsers,
} from "../LocalStorage/controllerLocalStorage";

// Devolver un objeto con propiedades al extraer de localStorage.
const userIdentified = (view) => {
  const userAdapter = new Viewer(users[view].name);
  Object.assign(userAdapter, users[view]);
  userAdapter.registerUser();
  console.log(userAdapter.message(), userAdapter.id); // Llamamos al getter para mensaje
  users[view] = userAdapter;
  registrationUsers(users);
};

// Identificación de usuario
const foundUser = (view) => {
  if (users[view]) {
    userIdentified(view);
  } else {
    console.log(`el usuario ${view}o no existe`);
    const user = new Viewer(view);
    user.registerUser();
    user.registerID();
    users[view] = user;
    console.log(users[view].mensaje);
  }
  registrationUsers(users);
};

// Verificar ID
const verifyID = (view) => {
  foundUser(view);
  console.log(users[view].id);
};

// Borrar usaurio con id propio
const deleteUser = (view, id) => {
  foundUser(view);
  if (users[view]._id == id) {
    delete users[view];
    console.log(`Se eliminó el usuario ${view}`);
  } else {
    console.log(`el usuario ${view} no se corresponde con el ID ${id}`);
  }
  registrationUsers(users);
};

// Crear funcion para modificar el nombre del array.

console.log(users);
export { foundUser, deleteUser, verifyID };
