import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.popup__image-preview');//элемент изображения в попапе превью
    this._captionElement = this._popup.querySelector('.popup__preview-name');// элемент подписи в попапе
  }

  open(image) {
    this._imageElement.src = image.link;// устанавливаем ссылку на изображение
    this._imageElement.alt = image.name;// текст изображения
    this._captionElement.textContent = image.name;//подпись изображения
    super.open();//вызов метода родительского класса
  }
}
