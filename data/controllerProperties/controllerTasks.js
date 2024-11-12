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

const examID = () => Math.random().toString(36).substring(2, 5);

const reviewListTask = (user) => {
  users[user].tasks.map((task) => {
    if (reviewListTask.leght == 0) {
      return console.log(
        "No tienes tareas agregadas. Si quieres usar la funcionalidad debes ingresar addTaskUser()"
      );
    } else {
      return task.description, task._id;
    }
  });
};

const addTaskUser = (user, addTask) => {
  foundOrCreateUser(user);
  const newTaskUser = new Task(addTask, examID());
  users[user].tasks.push(newTaskUser);
  console.log(`${user} agregó "${addTask}" a su listado de tareas`);
  registrationUsers(users);
};

const reviewListTaskUser = (user) => {
  foundOrCreateUser(user);
  reviewListTask(user);
};

const readyTaskUser = (user) => {};

const deleteTaskUser = (user, ID) => {
  foundOrCreateUser(user);

  registrationUsers(users);
};

const modifyTaskUser = (user, ID, modifyTask) => {
  foundOrCreateUser();
  registrationUsers(users);
};

const deleteAllListTaskUser = (user) => {
  foundOrCreateUser(user);
  registrationUsers(users);
};

const readyListAllListUser = (user) => {
  foundOrCreateUser(user);
  reviewListTask(user);
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
