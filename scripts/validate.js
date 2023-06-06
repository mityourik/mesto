// задаем кастомные сообщения об ошибках
const errorMessages = {
  required: 'Вы пропустили это поле.',
  wrongLink: 'Введите адрес сайта.',
  wrongType: {
    url: 'Введите адрес сайта.',
    email: 'Введите адрес электронной почты.'
  }
};

// функция для изменения состояния кнопки "создать"
const updateButtonChangeState = (form) => {
  const button = form.querySelector('.button');
  if (!form.checkValidity()) {
    button.setAttribute('disabled', true);
    button.classList.remove('popup__save-button_valid');
  } else {
    button.removeAttribute('disabled');
    button.classList.add('popup__save-button_valid');
  }
};

// Функция для сброса формы и ошибок
const resetFormAndErrors = (form) => {
  form.reset();

  const inputs = form.querySelectorAll('.popup__input');
  inputs.forEach((input) => {
    input.classList.remove('popup__input_error');
    hideError(input);
  });
};

// Функция для установки сообщений об ошибке
const setErrorMessage = (input) => {
  const { valueMissing, typeMismatch } = input.validity;
  input.setCustomValidity("");
  if (valueMissing) {
    input.setCustomValidity(errorMessages.required);
  } else if (typeMismatch) {
    input.setCustomValidity(errorMessages.wrongType[input.type]);
  }
};

// Функция состояния кнопки сабмита при изменении значения полей ввода
const updateInputChangeState = (input) => {
  const parentForm = input.closest('form');
  const isValid = input.validity.valid;
  if (!isValid) {
    input.classList.add('popup__input_error');
  } else {
    input.classList.remove('popup__input_error');
  }
  updateButtonChangeState(parentForm);
};

// Функция для получения элемента сообщения об ошибке
const getErrorElement = (input) => {
  return document.querySelector(`#${input.id}-error`);
};

// Функция для скрытия сообщения об ошибке
const hideError = (input) => {
  const errorElement = getErrorElement(input);
  if (errorElement) {
    errorElement.textContent = '';
  }
};

// Функция для отображения сообщения об ошибке
const showError = (input) => {
  const errorElement = getErrorElement(input);
  if (errorElement) {
    setErrorMessage(input);
    errorElement.textContent = input.validationMessage;
  }
};

// Функция для валидации поля ввода
const validateInput = (input) => {
  if (!input.validity.valid) {
    showError(input);
  } else {
    hideError(input);
  }
};

// Логика действий при закрытии через esc
const closePopupWithEsc = () => {
  closePopup(popupCreateCell);
  closePopup(popupProfile);
  resetFormAndErrors(formCreateCell);
  resetFormAndErrors(profileForm);
};

// Функция для отправки формы
const sendForm = (evt) => {
  evt.preventDefault();
  const form = evt.target;
  if (form.checkValidity()) {
    resetFormAndErrors(form);
    updateButtonChangeState(form);
  }
};

// Обработчик события ввода для формы создания карточки
formCreateCell.addEventListener('input', (evt) => {
  const input = evt.target;
  const form = evt.currentTarget;
  validateInput(input);
  updateInputChangeState(input);
}, true);

// Обработчик события отправки формы создания карточки
formCreateCell.addEventListener('submit', sendForm);

// Обработчик события нажатия клавиши Esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopupWithEsc();
  }
});

// Функция для валидации формы профиля
const validateProfileForm = (event) => {
  event.preventDefault();

  const isValid = profileForm.checkValidity();

  if (!isValid) {
    showError(profileNameField);
    showError(profileDescripField);
  } else {
    hideError(profileNameField);
    hideError(profileDescripField);

    profileTitle.textContent = profileNameField.value;
    profileParagraph.textContent = profileDescripField.value;
    closePopup(popupProfile);
  }
};

// Обработчик события отправки формы профиля
profileForm.addEventListener('submit', validateProfileForm);

// Обработчики события полей ввода имени и описания профиля
profileNameField.addEventListener('input', () => {
  validateInput(profileNameField);
  updateInputChangeState(profileNameField);
});

profileDescripField.addEventListener('input', () => {
  validateInput(profileDescripField);
  updateInputChangeState(profileDescripField);
});

// Изменение состояния кнопки отправки формы для создания карточки и профиля
updateButtonChangeState(formCreateCell);
updateButtonChangeState(profileForm);
