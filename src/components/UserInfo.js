export class UserInfo {
  constructor({ nameSelector, descriptionSelector, selectorUserAvatar }) {
    this._nameElement = document.querySelector(nameSelector);// элемент для заголовка
    this._descriptionElement = document.querySelector(descriptionSelector);// элемент для описания
    this._profileAvatar = document.querySelector(selectorUserAvatar);// эл-т аватара
  }

  getUserInfo() {
    return {//возвращаем текущие значения имени, описания и аватара
      name: this._nameElement.textContent,
      about: this._descriptionElement.textContent,
      avatar: this._profileAvatar.src
    };
  }

  setUserInfo({ name, about }) {// уснанаваливаем новые значения
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = about;
  }

  setUserAvatar(newInfo) {//метод для установки картинки аватара
    this._profileAvatar.src = newInfo.avatar;
  }  
}