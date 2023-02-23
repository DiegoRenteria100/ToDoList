export default class Alert {
  constructor() {
    this.alert = document.getElementById('alert');
  }

  show(message) {
    this.alert.innerText = message;
    this.alert.classList.remove('d-none');
  }

  hide() {
    this.alert.classList.add('d-none');
  }
}