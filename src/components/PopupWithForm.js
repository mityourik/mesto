import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__profile-form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input')); // находим список всех инпутов в форме
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}