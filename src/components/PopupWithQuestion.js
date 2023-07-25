import { Popup } from "./Popup.js";

export class PopupWithQuestion extends Popup {
    constructor({ popupSelector, submitCallback }) {
        super(popupSelector);// вызываем конструктор родительского класса
        this._submitCallback = submitCallback;
        this._submitButton = this._popup.querySelector('.popup__save-button');
        this._defaultText = this._submitButton.textContent;
        this._handleEnterKey = this._handleEnterKey.bind(this);// Привязка контекста к this
    }
    
    open(cardElement) {
        super.open();
        this.card = cardElement;
        document.addEventListener('keydown', this._handleEnterKey);
    }

    renderPreloader(loading, displayText) {
        if (loading) {
          this._submitButton.textContent = displayText;
        } else {
          this._submitButton.textContent = this._defaultText;
        }
    }

    close() { // Закрыть и удалить обработчик
        super.close();
        document.removeEventListener('keydown', this._handleEnterKey);//удаление глоб обработчика
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', () => {
            this._submitCallback(this.card);//передать карточку в колбэк
        })
    }

    // Функция для обработки клавиши Enter
    _handleEnterKey(event) {
        if (event.key === 'Enter') {
            this._submitCallback(this.card);//передаем для сабмита через Enter
            this.close();
        }
    }
}
