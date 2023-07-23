import { Popup } from "./Popup.js";

export class PopupWithQuestion extends Popup {
    constructor({ popupSelector, submitCallback }) {
        super(popupSelector);// вызываем конструктор родительского класса
        this._submitCallback = submitCallback;
        this._submitButton = this._popup.querySelector('.popup__save-button');
        this._defaultText = this._submitButton.textContent;
        this._handleEnterKey = this._handleEnterKey.bind(this);// Привязка контекста к this
    }
    
    open(cardElement, idCard) { //открыть и получить данные о карточке
        super.open();
        this.id = idCard;//записали id карточки
        this.card = cardElement;
        // Добавление обработчика события keydown при открытии
        document.addEventListener('keydown', this._handleEnterKey);// глобальный обработчик для Enter
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
            this._submitCallback(this.id, this.card);//передача id и dom-элемента
        })
    }

    // Функция для обработки клавиши Enter
    _handleEnterKey(event) {
        if (event.key === 'Enter') {
            this._submitCallback(this.id, this.card);//передаем для сабмита через Enter
            this.close();
        }
    }
}
