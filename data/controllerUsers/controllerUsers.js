import { Viewer } from "../constructores";
import {
  users,
  registrationUsers,
} from "../LocalStorage/controllerLocalStorage";

const MESSAGES = {
  userAssignedPropsError: () =>
    "Inconvenientes para asignarles propiedades al usuario desde el localStorage.",
  userNotFound: (username) => `El usuario ${username} no existe.`,
  userGenerated: (username) => `El usuario ${username} fue generado.`,
  userNameChange: (oldUserView, newUserView) =>
    `El usuario ${oldUserView} cambio su nombrea a ${newUserView}.`,
  userRegistered: (username) => `Usuario ${username} registrado exitosamente.`,
  userID: (username, id) => `ID del usuario ${username}: ${id}`,
  userDeleteSuccess: (username) =>
    `Se eliminó el usuario ${username} correctamente.`,
  userDeleteMismatch: (username, id) =>
    `El usuario ${username} no se corresponde con el ID ${id}.`,
  userDeleteError: () =>
    "Inconvenientes para eliminar el usuario. Favor de verificar userViewID.",
  userNameChangeError: () =>
    "No se puede asignar el nuevo nombre y mantener los atributos.",
  userInactiveDeleted: (username) =>
    `Usuario ${username} eliminado por inactividad de más de dos meses.`,
  noInactiveUsers: () =>
    "No se encontró ningún usuario inactivo por más de dos meses.",
  userIDVerifyError: () => "No se puede verificar cual es el ID del usuario.",
  userFoundOrCreateError: () =>
    "Inconvenientes para encontrar el usuario y/o registrarlo.",
};

// Buscar un usuario por nombre
const foundUser = (username) => {
  if (!users[username]) {
    throw new Error(MESSAGES.userNotFound(username));
  }
  return users[username];
};

// Devolver un objeto con propiedades al extraer de localStorage
const identifiedUser = (foundUserView) => {
  try {
    const userAdapter = new Viewer(users[foundUserView].name);
    Object.assign(userAdapter, users[foundUserView]);
    userAdapter.registerUser();
    users[foundUserView] = userAdapter;
    registrationUsers(users);
  } catch (error) {
    console.error(MESSAGES.userAssignedPropsError());
  }
};

// Identificación de usuario
const foundOrCreateUser = (foundUserView) => {
  try {
    if (users[foundUserView]) {
      identifiedUser(foundUserView);
    } else {
      const user = new Viewer(foundUserView);
      user.mensaje = MESSAGES.userGenerated(user.name);
      user.registerUser();
      user.registerID();
      users[foundUserView] = user;
      registrationUsers(users);
    }
  } catch (error) {
    console.error(MESSAGES.userFoundOrCreateError());
  }
};

// Verificar ID de usuario
const verifyIdUser = (userVerifyViewID) => {
  try {
    const user = foundUser(userVerifyViewID);
    console.log(MESSAGES.userID(userVerifyViewID, user._id));
  } catch (error) {
    console.error(MESSAGES.userIDVerifyError());
  }
};

// Borrar usuario con ID propio
const deleteUser = (userViewDelete, userViewID) => {
  try {
    const user = foundUser(userViewDelete);
    if (user._id === userViewID) {
      delete users[userViewDelete];
      registrationUsers(users);
      console.log(MESSAGES.userDeleteSuccess(userViewDelete));
    } else {
      console.log(MESSAGES.userDeleteMismatch(userViewDelete, userViewID));
    }
  } catch (error) {
    console.error(MESSAGES.userDeleteError());
  }
};

// Cambiar nombre sosteniendo los atributos del usuario original
const changeNameUser = (oldUserView, newUserView) => {
  try {
    const oldUser = foundUser(oldUserView);
    const newUser = new Viewer(newUserView);
    newUser._id = oldUser._id; // Transferir ID al nuevo usuario
    Object.assign(newUser, oldUser);
    users[newUserView] = newUser;
    delete users[oldUserView];
    registrationUsers(users);
    console.log(MESSAGES.userNameChange(oldUserView, newUserView));
  } catch (error) {
    console.error(MESSAGES.userNameChangeError());
  }
};

// Borrar usuarios inactivos por más de dos meses
const deleteInactiveUsersTwoMonths = () => {
  const currentTime = new Date().getTime();
  const twoMonths = 60 * 60 * 24 * 30 * 2 * 1000;
  let usersDeleted = false;

  Object.keys(users).forEach((username) => {
    const user = users[username];
    if (user.lastTime) {
      const lastActiveTime = new Date(user.lastTime).getTime();
      if (currentTime - lastActiveTime > twoMonths) {
        delete users[username];
        console.log(MESSAGES.userInactiveDeleted(username));
        usersDeleted = true;
      }
    }
  });

  registrationUsers(users);

  if (!usersDeleted) {
    console.log(MESSAGES.noInactiveUsers());
  }
};

console.log(users);
export {
  foundOrCreateUser,
  deleteUser,
  verifyIdUser,
  changeNameUser,
  deleteInactiveUsersTwoMonths,
};
