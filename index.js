const buttonPopupOpen = document.querySelector('.profile__popup-open');
const popup = document.querySelector('.popup');
const buttonPopupClose = popup.querySelector('.popup__close-button');
const buttonPopupSave = popup.querySelector('.popup__save-button');
const form = document.querySelector('[name="profile-form"]');
const nameField = form.querySelector('[name="profile-input_name"]');
const descriptionField = form.querySelector('[name="profile-input_description"]');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');

const togglePopupState = (popupToToggle) => popupToToggle.classList.toggle('popup_opened');

buttonPopupOpen.addEventListener('click', () => {
  togglePopupState(popup);
  nameField.value = profileTitle.textContent;
  descriptionField.value = profileParagraph.textContent;
});

buttonPopupClose.addEventListener('click', () => {
  togglePopupState(popup);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  profileTitle.textContent = nameField.value;
  profileParagraph.textContent = descriptionField.value;
  togglePopupState(popup);
});

popup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    togglePopupState(popup);
    nameField.value = "";
    descriptionField.value = "";
  }
});

// Добавление карточки "Место"
// Переменные:
const addButtonPopupOpen = document.querySelector('.profile__add-icon');
const popupNewCell = document.querySelector('.popup_content_cell');
const buttonCloseCell = document.querySelector('.button_close_cell');
const formElements = document.querySelector('[name="elements-form"]');
const inputNameElements = formElements.querySelector('[name="elements_input_name"]');
const inputLinkElements = formElements.querySelector('[name="elements_input_link"]');
const buttonSaveCell = formElements.querySelector('.button__save-cell');
const templateItem = document.querySelector('.template-cell').content;
const buttonDeleteCell = document.querySelector('.elements__trash-image');
const list = document.querySelector('.elements__cards');

// Обработчик события на клик "Кнопка Добавить", функция переключения состояния на "открыто"
addButtonPopupOpen.addEventListener('click', () => {
  togglePopupState(popupNewCell);
});

// Обработчик события на клик "Кнопка Закрыть окно", функция переключения состояния на "закрыто"
buttonCloseCell.addEventListener('click', () => {
  togglePopupState(popupNewCell);
});

// Функция закрывания окна при клике вне ео области и очистки содержимого полей ввода
popupNewCell.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    togglePopupState(popupNewCell);
    inputNameElements.value = "";
    inputLinkElements.value = "";
  }
});

// Функция добавления карточек на страницу
function addCardToPage(imageUrl, title) {
  const listItem = templateItem.cloneNode(true);
  const image = listItem.querySelector('.elements__photo');
  const titleElement = listItem.querySelector('.elements__title');
  const likeButton = listItem.querySelector('.elements__like-button');
  const likeIcon = likeButton.querySelector('.elements__like-image');

  image.src = imageUrl;// значение элемента для ссылки на изображение
  titleElement.textContent = title;//для названия изображения

  likeButton.addEventListener('click', toggleLike);// обработчик клика для функции лайка новой карточки

  list.prepend(listItem); //новая карточка в начало списка
}

// Функция и обработчик события submit для формы в всплывающем окне
formElements.addEventListener('submit', (event) => {
  event.preventDefault();// предотвращение отправки формы и перезагрузки страницы

  const imageUrl = inputLinkElements.value;// получаем значения imageUrl и title из полей формы
  const title = inputNameElements.value;

  if (imageUrl && title) {// проверка, что imageUrl и title не являются пустыми строками
    addCardToPage(imageUrl, title);// Если оба поля заполнены, вызывается функция addCardToPage

    inputLinkElements.value = '';// поля очищаются после создания новой карточки
    inputNameElements.value = '';

    togglePopupState(popupNewCell);// функция состояния "закрыть окно"
  }
});

// удаление карточки через клик
list.addEventListener('click', function(event) {
  if (event.target.classList.contains('elements__trash-image')) {// проверка, является ли элемент, на котором произошло ->
    const listItem = event.target.closest('.elements__cell');// -> событие (event.target), содержащим класс .elements__trash-image. ->
    listItem.remove();// -> Если это так, то находим ближайший родительский элемент с классом .elements__cell с помощью метода closest(),->
  }// -> и затем удаляем его из DOM с помощью метода remove()
});

// предпросмотр фото карточки в всплывающем окне
const photoElements = document.querySelectorAll('.elements__photo');
const popupPreview = document.querySelector('.popup_content_preview');
const previewImage = popupPreview.querySelector('.popup__image-preview');
const previewName = popupPreview.querySelector('.popup__preview-name');
const buttonClosePreview = document.querySelector('.button_close_preview');

list.addEventListener('click', function(event) {
  if (event.target.classList.contains('elements__photo')) {// Внутри обработчика проверяется, был ли клик на элементе с классом .elements__photo.
    const clickedImageSrc = event.target.getAttribute('src');// получаем значение атрибута src кликнутого изображения
    const titleText = event.target.closest('.elements__cell').querySelector('.elements__title').textContent;// находим ближайший родительский элемент для значения текста заголовка
    previewImage.setAttribute('src', clickedImageSrc);// Устанавливаем значение атрибута src для элемента previewImage равным clickedImageSrc, отображая выбранное изображение во всплывающем окне
    previewName.textContent = titleText;// Устанавливаем текстовое содержимое элемента previewName равным titleText в окне попапа
    togglePopupState(popupPreview);// функция с аргументом, чтобы открыть всплывающее окно с содержимым
  }
});

buttonClosePreview.addEventListener('click', () => {// обработчик события для закрытия окна
  togglePopupState(popupPreview);
});

popupPreview.addEventListener('click', (evt) => {// обработчик для закрытия при клике вне окна
  if (evt.target === evt.currentTarget) {
    togglePopupState(popupPreview);
  }
});

// Функция для переключения состояния лайка
function toggleLike() {
  const iconLike = this.querySelector('.elements__like-image');// this применил для поиска потомка в динамически созданных карточек

  if (iconLike.src.includes('element__like-image.svg')) {// если содержится значение атрибута src element__like-image.svg
    iconLike.src = './images/element__like-image_enabled.svg';// то изображение иконки лайка обновляется на новое
    iconLike.alt = 'Кнопка Не нравится';// также заменяем значение атрибута alt
  } else {
    iconLike.src = './images/element__like-image.svg';// если не содержится, то возвращается исходная картинка
    iconLike.alt = 'Кнопка Нравится';
  }
}

// Массив с начальными карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функция для добавления начальных карточек на страницу
function addInitialCardsToPage() {
  initialCards.forEach((card) => {
    addCardToPage(card.link, card.name);
  });
}

// Вызов функции для добавления начальных карточек на страницу при загрузке  (добавил, так как не понял по брифу там "и" или "или" нужно их добавить)
addInitialCardsToPage();

// функция для лайков
const buttonsLike = document.querySelectorAll('.elements__like-button');

buttonsLike.forEach(function(buttonLike) {
  buttonLike.addEventListener('click', toggleLike);
});