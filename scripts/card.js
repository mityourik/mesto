export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector('.elements__cell').cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.elements__like-button').addEventListener('click', () => {
      this._toggleLike();
    });

    this._element.querySelector('.elements__trash-button').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.elements__photo').addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  _toggleLike() {
    this._element.querySelector('.elements__like-button').classList.toggle('elements__like-image_enabled');
  }

  _deleteCard() {
    this._element.remove();
  }

  _handleImageClick() {
    const cardImage = this._element.querySelector('.elements__photo');
    const name = cardImage.alt.replace('Изображение ', '');
    const link = cardImage.src;
    this._handleCardClick(name, link);
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.elements__photo');
    const cardName = this._element.querySelector('.elements__title');

    cardImage.src = this._link;
    cardImage.alt = 'Изображение ' + this._name;
    cardName.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}