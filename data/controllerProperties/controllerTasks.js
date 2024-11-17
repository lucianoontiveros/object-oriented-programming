import {
  users,
  registrationUsers,
} from "../LocalStorage/controllerLocalStorage";
import { foundOrCreateUser } from "../controllerUsers/controllerUsers";

class Task {
  constructor(task, ID) {
    this.description = task;
    this._id = ID;
    this.active = false;
  }
}

// Gestor de mensajes
const sendMessage = (message) => {
  console.log(message);
};

const MESSAGES = {
  addTask: (user, task, ID) =>
    `${user}, Registramos tu tarea: ${task} | ID: ${ID}.`,
  noTasks: (user) =>
    `${user}, no tienes tareas registradas. Puedes informarte como utilizar el gestor de tareas a través de !taskInfo.`,
  tasksList: (user, description, ID) => `|${user}| ${ID} | ${description} |`,
  deleteTask: (user, description, ID) =>
    `${user}, la tarea | ${ID} | ${description} | fue ELIMINADA.`,
  readyTask: (user, description, ID) =>
    `${user}, la tarea | ${ID} | ${description} | fue marcada como REALIZADA.`,
  readyAllTaks: (user) =>
    `${user} todas tus tareas fueron marcadas como REALIZADAS.`,
  clearAllTaks: (user) => `${user} todas tus tareas fueron ELIMINADAS.`,
  noFoundTask: (user, ID) => `|${user}|, la tarea con |ID: ${ID}| no existe.`,
  modifyTask: (user, ID, task) =>
    `|${user}|, la tarea con |ID: ${ID}| fue modificada por "${task}"`,
};

// Funciones para dar soporte a funciones principales

const examID = () => Math.random().toString(36).substring(2, 5);

const reviewListTask = (user) => {
  let task = users[user].tasks;
  if (task.length === 0) {
    sendMessage(MESSAGES.noTasks(user));
  } else {
    task.forEach((usertTask) =>
      sendMessage(
        MESSAGES.tasksList(user, usertTask.description, usertTask._id)
      )
    );
  }
};

const filterTaskListUser = (user, ID) => {
  return users[user].tasks.filter((userTask) => userTask._id != ID);
};

const foundTask = (user, ID) => {
  return users[user].tasks.find((userTask) => userTask._id === ID);
};

const foundIndexTask = (user, ID) => {
  return users[user].tasks.findIndex((userTask) => userTask._id === ID);
};

// Funciones para gestionar tareas.

const addTaskUser = (user, addTask) => {
  foundOrCreateUser(user);
  const newTaskUser = new Task(addTask, examID());
  users[user].tasks.push(newTaskUser);
  sendMessage(MESSAGES.addTask(user, newTaskUser.description, newTaskUser._id));
  registrationUsers(users);
};

const reviewListTaskUser = (user) => {
  foundOrCreateUser(user);
  reviewListTask(user);
};

const readyTaskUser = (user, ID) => {
  const taskUser = foundTask(user, ID);
  if (!taskUser) {
    sendMessage(MESSAGES.noFoundTask(user, ID));
  } else {
    sendMessage(MESSAGES.readyTask(user, taskUser.description, taskUser._id));
    users[user].tasks = filterTaskListUser(user, ID);
    registrationUsers(users);
  }
};

const deleteTaskUser = (user, ID) => {
  const taskUser = foundTask(user, ID);
  if (!taskUser) {
    sendMessage(MESSAGES.noFoundTask(user, ID));
  } else {
    sendMessage(MESSAGES.deleteTask(user, taskUser.description, taskUser._id));
    users[user].tasks = filterTaskListUser(user, ID);
    registrationUsers(users);
  }
};

const modifyTaskUser = (user, ID, modifyTask) => {
  const taskUser = foundIndexTask(user, ID);
  console.log();
  if (!taskUser) {
    sendMessage(MESSAGES.noFoundTask(user, ID));
  } else {
    sendMessage(MESSAGES.modifyTask(user, ID, modifyTask));
    users[user].tasks[taskUser].description = modifyTask;
  }
  foundOrCreateUser(user);
  registrationUsers(users);
};

const deleteAllListTaskUser = (user) => {
  foundOrCreateUser(user);
  sendMessage(MESSAGES.clearAllTaks(user));
  users[user].tasks = [];
  registrationUsers(users);
};

const readyListAllListUser = (user) => {
  foundOrCreateUser(user);
  sendMessage(MESSAGES.readyAllTaks(user));
  users[user].tasks = [];
  registrationUsers(users);
};

export {
  addTaskUser,
  reviewListTaskUser,
  readyTaskUser,
  deleteTaskUser,
  modifyTaskUser,
  deleteAllListTaskUser,
  readyListAllListUser,
};
