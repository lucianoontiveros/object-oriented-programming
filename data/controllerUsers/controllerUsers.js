import { Viewer } from "../constructores";
import {
  users,
  registrationUsers,
} from "../LocalStorage/controllerLocalStorage";

// Devolver un objeto con propiedades al extraer de localStorage.
const identifiedUser = (foundUserView) => {
  try {
    const userAdapter = new Viewer(users[foundUserView].name);
    Object.assign(userAdapter, users[foundUserView]);
    userAdapter.registerUser();
    console.log(userAdapter.mensaje, userAdapter.id); // Llamamos al getter para mensaje
    users[foundUserView] = userAdapter;
    registrationUsers(users);
  } catch (error) {
    console.error(
      "Inconvenientes para asignarles propiedades al usuario desde el localStorage"
    );
  }
};

// Identificación de usuario
const foundOrCreateUser = (foundUserView) => {
  try {
    if (users[foundUserView]) {
      identifiedUser(foundUserView);
    } else {
      console.log(`El usuario ${foundUserView}o no existe`);
      const user = new Viewer(foundUserView);
      user.mensaje = `El usuario ${user.name} fue generado`;
      console.log(user.mensaje);
      user.registerUser();
      user.registerID();
      users[foundUserView] = user;
      console.log(users[foundUserView].mensaje);
      registrationUsers(users);
    }
  } catch (error) {
    console.error("Inconvenientes para encontrar el usuario y/o registrarlo");
  }
};

// Verificar ID de usuario
const verifyIdUser = (userVerifyViewID) => {
  try {
    foundUser(userVerifyViewID);
    console.log(users[userVerifyViewID].id);
  } catch (error) {
    console.error("No se puede verificar cual es el ID del usuario");
  }
};

// Borrar usaurio con ID propio
const deleteUser = (userViewDelete, userViewID) => {
  try {
    foundUser(userViewDelete);
    if (users[userViewDelete]._id == userViewID) {
      delete users[userViewDelete];
      registrationUsers(users);
      console.log(`Se eliminó el usuario ${userViewDelete}`);
    } else {
      console.log(
        `El usuario ${userViewDelete} no se corresponde con el ID ${userViewID}`
      );
    }
  } catch (error) {
    console.error(
      "Iconvenientes para eliminar el usuario. Favor de verificar userViewID"
    );
  }
};

// Cambiar nombre sosteniendo los atributos del usario original.
const changeNameUser = (oldUserView, newUserView) => {
  try {
    identifiedUser(oldUserView);
    const user = new Viewer(newUserView);
    user._id = users[oldUserView]._id;
    Object.assign(users[oldUserView], user);
    users[newUserView] = user;
    delete users[oldUserView];
    registrationUsers(users);
  } catch (error) {
    console.error(
      "No se puede asignar el nuevo nombre y mantener los atributos"
    );
  }
};

console.log(users);
export { foundOrCreateUser, deleteUser, verifyIdUser, changeNameUser };
