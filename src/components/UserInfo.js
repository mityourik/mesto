export class UserInfo {
  constructor({ nameSelector, descriptionSelector, selectorUserAvatar }) {
    this._nameElement = document.querySelector(nameSelector);// элемент для заголовка
    this._descriptionElement = document.querySelector(descriptionSelector);// элемент для описания
    this._profileAvatar = document.querySelector(selectorUserAvatar);// эл-т аватара
  }

  getUserInfo() {
    return {//возвращаем текущие значения заголовка и описания
      name: this._nameElement.textContent,
      about: this._descriptionElement.textContent
    };
  }

  setUserInfo({ name, about }) {// уснанаваливаем новые значения
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = about;
  }

  setUserAvatar(url) {
    this._profileAvatar.src = url.avatar
  }
}