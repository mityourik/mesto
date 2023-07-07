import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandler, formValidator }) {//+ валидация в конструктор
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__profile-form');// форма внутри попапа
    this._formValidator = formValidator;
  }

  _getInputValues() {
    const inputList = Array.from(this._form.querySelectorAll('.popup__input'));// получаем список всех инпутов в форме
    const formValues = {};
    inputList.forEach((input) => {
      formValues[input.name] = input.value;// сохраняем значение каждого поля ввода в объект formValues
    });
    return formValues;
  }

  setInitialValues({ name, info }) {//метод для установки начальных значений в инпуты формы
    this._form.querySelector('[name="profile-input_name"]').value = name;
    this._form.querySelector('[name="profile-input_description"]').value = info;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandler(this._getInputValues());//вызываем переданный обработчик сабмита формы с передачей ему значений инпутов
      this.close();
    });

    this._formValidator.enableValidation();// включил валидацию форм тут. норм?=)
  }

  close() {
    super.close();
    this._form.reset();
  }
}
