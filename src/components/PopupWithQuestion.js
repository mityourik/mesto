import { Popup } from "./Popup.js";

export class PopupWithQuestion extends Popup {
    constructor(popupSelector, { submitCallback }) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._submitButton = this._popup.querySelector('.popup__save-button');
    }
    
    open(cardElement, idCard) {//открыть и получить данные о карточке
        super.open();
        this.id = idCard;
        this.card = cardElement;
    }

    renderPreloader(loading, displayText) {//отобразить загрузка...
        if (!this._submitButton) return;
        if (loading) {
            this.defaulText = this._submitButton.textContent;
            this._submitButton.textContent = displayText;
        } else {
            this._submitButton.textContent = this.defaulText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', () => {
            this._submitCallback(this.id, this.card);
        })
    }

}