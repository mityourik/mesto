// Объявил переменные с постоянным значением
const buttonPopupOpen = document.querySelector('.profile__popup-open');
const popup = document.querySelector('.popup');
const buttonPopupClose = popup.querySelector('.popup__close-button');
const buttonPopupSave = popup.querySelector('.popup__save-button');
const form = document.querySelector('.popup__profile-form');
const nameField = form.querySelector('.popup__input_field_title');
const descriptionField = form.querySelector('.popup__input_field_description');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');

// Функция для добавления/удаления класса у элемента
const togglePopupState = (popupToToggle) => popupToToggle.classList.toggle('popup_opened');

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

nameField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Отмена стандартного поведения поля ввода при нажатии Enter (отправки формы)
      saveChanges(); // Вызов функции для сохранения изменений
    }
  });
  
  descriptionField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Отмена стандартного поведения поля ввода при нажатии Enter
      saveChanges(); // Вызов функции для сохранения изменений
    }
  });
  
  // Функция для сохранения изменений
  const saveChanges = () => {
    profileTitle.textContent = nameField.value; // Запись нового значения имени/заголовока
    profileParagraph.textContent = descriptionField.value; // Запись нового значения описания в параграф
    togglePopupState(popup); // Закрытие popup-окна
  };
  
  // Обработчик события на кнопку "сохранить" popup-окна
  buttonPopupSave.addEventListener('click', saveChanges);
  

// Обработчик события на закрывание popup-окна при клике вне его области
popup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) { // Если клик был сделан вне области popup-окна
    togglePopupState(popup); // Закрывание popup-окна
    nameField.value = ""; // Очистка поля ввода имени/заголовка
    descriptionField.value = ""; // Очистка поля ввода описания параграфа
  }
});