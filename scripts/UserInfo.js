export class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);// элемент для заголовка
    this._descriptionElement = document.querySelector(descriptionSelector);// элемент для описания
  }

  getUserInfo() {
    return {//возвращаем текущие значения заголовка и описания
      name: this._nameElement.textContent,
      info: this._descriptionElement.textContent
    };
  }

  setUserInfo({ name, info }) {// уснанаваливаем новые значения
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = info;
  }
}
