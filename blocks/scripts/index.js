// Объявил переменные с постоянным значением
const buttonPopupOpen = document.querySelector('.profile__popup-open');
const popup = document.querySelector('.popup');
const buttonPopupClose = popup.querySelector('.popup__close-button');
const buttonPopupSave = popup.querySelector('.popup__save-button');
const nameField = popup.querySelector('.popup__name-field');
const descriptionField = popup.querySelector('.popup__description-field');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');

// Функция для добавления/удаления класса у элемента
const togglePopupState = (popupToToggle) => popupToToggle.classList.toggle('popup__opened');

// Добавил обработчик события на кнопку открытия popup-окна
buttonPopupOpen.addEventListener('click', () => {
  togglePopupState(popup); // Открыл popup-окно
  nameField.value = profileTitle.textContent; // Записал текущее значение заголовка в поле ввода имени/заголовка
  descriptionField.value = profileParagraph.textContent; // Записал текущее значение описания в поле ввода описания параграфа
});

// Добавил обработчик события на кнопку закрытия popup-окна
buttonPopupClose.addEventListener('click', () => {
  togglePopupState(popup); // Закрытие popup-окна
  nameField.value = ""; // Очищение поля ввода имени/заголовка
  descriptionField.value = ""; // Очищение поле ввода описания параграфа
});

// Добавил обработчик события на кнопку "сохранить" popup-окна
buttonPopupSave.addEventListener('click', () => {
  profileTitle.textContent = nameField.value; // Запись нового значения имени/заголовока
  profileParagraph.textContent = descriptionField.value; // Запись нового значения описания в параграф
  togglePopupState(popup); // Закрывание popup-окна
});

// Добавил обработчик события на popup-окно
popup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) { // Если клик был сделан по фону popup-окна
    togglePopupState(popup); // Закрывание popup-окна
    nameField.value = ""; // Очистка поля ввода имени/заголовка
    descriptionField.value = ""; // Очистка поля ввода описания параграфа
  }
});
