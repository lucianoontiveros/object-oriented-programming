class Viewers {
  constructor(name, id, status) {
    this.name = name;
    this.id = id;
    this.status = status;
    this.tasks = [];
    this.exams = [];
    this.lastTime;

    this.personaldata = [];
  }

  get viewUser() {
    this.lastTime = new Date();
  }

  set registerUser(user) {
    this.name = user;
  }
}

const users = JSON.parse(localStorage.getItem("users")) || {};

const registrationUsers = (users) =>
  localStorage.setItem("users", JSON.stringify(users));

const foundUser = (view) => {
  let useridentified = users[view];
  if (useridentified) {
    useridentified.viewUser;
    registrationUsers(users);
    console.log(
      `encontré a  ${useridentified.name} se actualiza su registro  ${useridentified.lastTime}`
    );
  } else {
    console.log(`No encuentro al usaurio ${view}`);
    const user = new Viewers(view);
    users[view] = user;
    users[view].lastTime = new Date();
    let nombreView = (users[view].registerUser = view);
    registrationUsers(users);
    console.log(`Registro del usaurio ${nombreView}`);
  }
};

export { foundUser };
