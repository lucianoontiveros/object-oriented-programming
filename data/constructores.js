class Viewer {
  constructor(name) {
    this.name = name;
    this._id = null;
    this.status = null;
    this.tasks = [];
    this.exams = [];
    this.lastTime = "";
    this.personaldata = [];
    this._mensaje = "";
  }

  // Getter para mensaje
  get mensaje() {
    return this._mensaje || "No hay mensaje disponible";
  }

  get id() {
    return `Para el usuario ${this.name} tiene asignado el ID: ${this._id}`;
  }

  // Setter para mensaje
  mensaje() {
    return (this._mensaje = value);
  }

  registerID() {
    const timestamp = Date.now().toString(36);
    const randomSegment = Math.floor(Math.random() * 10000).toString(36);
    this._id = `${timestamp}-${randomSegment}`;
  }

  registerUser() {
    const date = new Date();
    const año = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const día = date.getDate().toString().padStart(2, "0");
    const horas = date.getHours().toString().padStart(2, "0");
    const minutos = date.getMinutes().toString().padStart(2, "0");
    const segundos = date.getSeconds().toString().padStart(2, "0");
    const timeFormat = `${this.name} interactuó por última vez: ${día}/${mes}/${año} ${horas}:${minutos}:${segundos}.`;
    this.lastTime = date;
    this.mensaje = timeFormat; // Asignamos mensaje usando el setter
  }

  message() {
    return this.mensaje;
  }
}

export { Viewer };
