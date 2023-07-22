export class Card {
  constructor({ data, userId, templateSelector, handleCardClick, handleCardDelete, handleCardLike, handleLikeDelete }) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likesCount = data.likes.length;
    this._handleCardDelete = handleCardDelete;
    this._likes = data.likes;
    this.idCard = data._id;
    this._like = handleCardLike;
    this._idUserCard = data.owner._id;
    this._userId = userId;
    this._dislike = handleLikeDelete;

    this._element = this._getTemplate();// создание DOM-элемента карточки из шаблона

    this._cardImage = this._element.querySelector('.elements__photo');//поиск основных элементов карточки
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._likesCounter = this._element.querySelector('.elements__like-counter');
    this._buttonBin = this._element.querySelector('.elements__trash-button');

    this._setEventListeners();
  }

  // создание карточки из шаблона
  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector('.elements__cell').cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {// Обработчик клика по кнопке лайка
      if (this._likeButton.classList.contains('elements__like-image_enabled')) {
        this._likeButton.classList.remove('elements__like-image_enabled');
        this._dislike(this.idCard);// вызываем коллбэк дизлайка
      } else {// если кнопка лайка неактивна
        this._likeButton.classList.add('elements__like-image_enabled');
        this._like(this.idCard);// вызываем коллбэк лайка
      }
    });

    this._buttonBin.addEventListener('click', () => this._handleCardDelete(this, this.idCard));

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  setLikesCount(res) {// Метод установки количества лайков
    this._likes = res.likes;
    this._likesCount = this._likes.length;
    this._likesCounter.textContent = `${this._likesCount}`;//отображаем новое количество лайков на странице
  }

  deleteCard() {
    this._removeEventListeners();
    this._element.remove();
    this._element = null;// обнуляем ссылку на DOM-элемент карточки
  }

  _removeEventListeners() {
    this._likeButton.removeEventListener('click', this._like);
    this._buttonBin.removeEventListener('click', this._handleCardDelete);
    this._cardImage.removeEventListener('click', this._handleCardClick);
  }

  generateCard() {
    const cardName = this._element.querySelector('.elements__title');
    this._cardImage.src = this._link;
    this._cardImage.alt = 'Изображение ' + this._name;
    cardName.textContent = this._name;
  
    // Проверка отображения корзины на карточке
    if (this._idUserCard !== this._userId) {
      this._buttonBin.remove();
    }
  
    this._likesCounter.textContent = `${this._likesCount}`;
  
    // проверка если текуший пользователь уже лайкнул карточку
    if (this._likes.some(user => user._id === this._userId)) {
      this._likeButton.classList.add('elements__like-image_enabled');
    }
  
    return this._element;
  }  
}