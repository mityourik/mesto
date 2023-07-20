export class Card {
  constructor({ data, userId, templateSelector, handleCardClick, handleCardDelete, handleCardLike, handleLikeDelete }) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likesCount = data.likes.length;
    this._handleCardDelete = handleCardDelete;
    this.cardData = data;
    this._likes = data.likes;
    this.idCard = data._id;
    this._like = handleCardLike;
    this._idUserCard = data.owner._id;
    this._userId = userId;
    this._dislike = handleLikeDelete;

    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__photo');
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._likesCounter = this._element.querySelector('.elements__like-counter');
    this._buttonBin = this._element.querySelector('.elements__trash-button');

    this._setEventListeners();
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector('.elements__cell').cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('elements__like-image_enabled')) {
        this.dislike();
      } else {
        this.like();
      }
    });

    this._buttonBin.addEventListener('click', () => this._handleCardDelete(this, this.idCard));

    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  like() {
    this._likeButton.classList.add('elements__like-image_enabled');
    this._like(this.idCard);
  }

  dislike() {
    this._likeButton.classList.remove('elements__like-image_enabled');
    this._dislike(this.idCard);
  }

  setLikesCount(res) {
    this._likes = res.likes;
    this._likesCount = this._likes.length;
    this._likesCounter.textContent = `${this._likesCount}`;
  }

  deleteCard() {
    this._removeEventListeners();
    this._element.remove();
    this._element = null;
  }

  _removeEventListeners() {
    this._likeButton.removeEventListener('click', this.like); // используем this.like вместо this._like
    this._buttonBin.removeEventListener('click', this.deleteCard);// this._deleteCard?
    this._cardImage.removeEventListener('click', this._handleImageClick);
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
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

    return this._element;
  }
}
