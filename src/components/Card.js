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
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._dislike = handleLikeDelete;

    this._element = this._getTemplate();// создание DOM-элемента карточки из шаблона

    this._cardImage = this._element.querySelector('.elements__photo');//поиск основных элементов карточки
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._likesCounter = this._element.querySelector('.elements__like-counter');
    this._buttonBin = this._element.querySelector('.elements__trash-button');

    // биндим this для каждого обработчика
    this._handleLikeCard = this._handleLikeCard.bind(this);
    this._handleDeleteCard = this._handleDeleteCard.bind(this);
    this._handleClickOnImage = this._handleClickOnImage.bind(this);

    this._setEventListeners();
  }

  // создание карточки из шаблона
  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector('.elements__cell').cloneNode(true);
  }

  setLikesCount(likes) {//метод установки количества лайков
    this._likesCounter.textContent = likes.length; //установка количества лайков
    const isLiked = likes.some(user => user._id === this.userId);//проверка, ставил ли текущий пользователь лайк
  }

  deleteCard() {
    this._removeEventListeners();
    this._element.remove();
    this._element = null;// обнуляем ссылку на DOM-элемент карточки
  }

  toggleLikeState() {
    this._likeButton.classList.toggle('elements__like-image_enabled');
  }

  _handleLikeCard() {
    if (this._likeButton.classList.contains('elements__like-image_enabled')) {
      this._dislike(this.idCard);
    } else {
      this._like(this.idCard);
    }
  }

  getId() {//метод для получения id карточки
    return this.idCard;
  }

  _handleDeleteCard() {
    this._handleCardDelete(this);
  }

  _handleClickOnImage() {
    this._handleCardClick(this._name, this._link);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeCard);
    this._buttonBin.addEventListener('click', this._handleDeleteCard);
    this._cardImage.addEventListener('click', this._handleClickOnImage);
  }

  _removeEventListeners() {
    this._likeButton.removeEventListener('click', this._handleLikeCard);
    this._buttonBin.removeEventListener('click', this._handleDeleteCard);
    this._cardImage.removeEventListener('click', this._handleClickOnImage);
  }

  generateCard() {
    const cardName = this._element.querySelector('.elements__title');
    this._cardImage.src = this._link;
    this._cardImage.alt = 'Изображение ' + this._name;
    cardName.textContent = this._name;
  
    // Проверка отображения корзины на карточке
    if (this._ownerId !== this._userId) {
      this._buttonBin.remove();
    }
  
    this._likesCounter.textContent = `${this._likesCount}`;
  
    // Проверка, если текущий пользователь уже лайкнул карточку
    const isLikedByCurrentUser = this._likes.some(user => user._id === this._userId);
    if (isLikedByCurrentUser) {
      this._likeButton.classList.add('elements__like-image_enabled');
    }
  
    return this._element;
  }
}