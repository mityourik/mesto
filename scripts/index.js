// Функция для обработки события нажатия кнопки лайка
function handleLikeButtonClick(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('elements__like-image_enabled');
}

// Добавление обработчиков событий для кнопок лайка
function addLikeButtonEventListeners() {
  const likeButtons = document.querySelectorAll('.elements__like-button');
  likeButtons.forEach((button) => {
    button.addEventListener('click', handleLikeButtonClick);
  });
}

// Добавление заданных карточек на страницу
const templateProfile = document.querySelector('.template-cell');
const elementsContainer = document.querySelector('.elements__cards');

function createCard(name, link) {
  const cardElement = templateProfile.content.cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__photo');
  const cardTitle = cardElement.querySelector('.elements__title');
  const likeButton = cardElement.querySelector('.elements__like-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener('click', handleLikeButtonClick);

  return cardElement;
}

function renderCard(cardElement) {
  elementsContainer.prepend(cardElement);
  addLikeButtonEventListeners(cardElement); // обработчики событий для кнопки лайка
}

function addCardsToPage(cards) {
  cards.forEach((card) => {
    const cardElement = createCard(card.name, card.link);
    renderCard(cardElement);
  });
  addLikeButtonEventListeners(); // обработчик лайка для пользовательских карточек
}

addCardsToPage(initialCards);

// удаление карточки
elementsContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('elements__trash-button')) {
    const listItem = event.target.closest('.elements__cell');
    listItem.remove();
  }
});

// Попап редактирования профиля
const buttonPopupOpen = document.querySelector('.profile__popup-open');
const popupProfile = document.querySelector('.popup_content_profile');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const profileForm = document.querySelector('[name="profile-form"]');
const profileNameField = profileForm.querySelector('[name="profile-input_name"]');
const profileDescripField = profileForm.querySelector('[name="profile-input_description"]');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');

const openPopup = (popupToOpen) => {
  popupToOpen.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscKeydown); // обработчик события для Esc
};

const closePopup = (popupToClose) => {
  popupToClose.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKeydown); // удалил обработчик события для Esc
};

const handleEscKeydown = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

buttonPopupOpen.addEventListener('click', () => {
  
  resetFormAndErrors(profileForm); // сброс ошибок и выделения строки при открытии

  if (profileNameField.value && profileDescripField.value) {// проверка состояни кнпоки если поля заполнены
    formSubmitButtonChangeState(profileForm);
  }

  openPopup(popupProfile);

  profileNameField.value = profileTitle.textContent;
  profileDescripField.value = profileParagraph.textContent;
});


profileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileTitle.textContent = profileNameField.value;
  profileParagraph.textContent = profileDescripField.value;
  closePopup(popupProfile);
});

popupProfile.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupProfile);
    profileForm.reset();
  }
});

// Добавление карточки "Место"
const popupAddCell = document.querySelector('.profile__add-icon');
const popupCreateCell = document.querySelector('.popup_content_cell');
const popupCloseCell = document.querySelector('.button_close_cell');
const formCreateCell = document.querySelector('[name="elements-form"]');
const inputNameCell = formCreateCell.querySelector('[name="elements_input_name"]');
const inputLinkCell = formCreateCell.querySelector('[name="elements_input_link"]');

popupAddCell.addEventListener('click', () => {
  openPopup(popupCreateCell);
  resetFormAndErrors(formCreateCell);//сброс ошибок на дефолтные
  editButtonChangeState(formCreateCell);// сброс статуса кнопки
});

popupCloseCell.addEventListener('click', () => {
  closePopup(popupCreateCell);
  formCreateCell.reset();
});

popupCreateCell.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupCreateCell);
    formCreateCell.reset();
  }
});

formCreateCell.addEventListener('submit', (event) => {
  event.preventDefault();

  const imageUrl = inputLinkCell.value;
  const title = inputNameCell.value;

  if (imageUrl && title) {
    const cardElement = createCard(title, imageUrl);
    renderCard(cardElement);
    formCreateCell.reset();
    closePopup(popupCreateCell);
    addLikeButtonEventListeners(cardElement); // обработчики событий для новой карточки
  }
});

// Предпросмотр фото карточки во всплывающем окне
const popupPreview = document.querySelector('.popup_content_preview');
const previewImage = popupPreview.querySelector('.popup__image-preview');
const previewName = popupPreview.querySelector('.popup__preview-name');
const buttonClosePreview = document.querySelector('.button_close_preview');

function togglePopupState(popup) {
  popup.classList.toggle('popup_opened');
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('elements__photo')) {
    const clickedImageSrc = event.target.getAttribute('src');
    const titleText = event.target.closest('.elements__cell').querySelector('.elements__title').textContent;

    previewImage.setAttribute('src', clickedImageSrc);
    previewName.textContent = titleText;

    togglePopupState(popupPreview);
  }
});

buttonClosePreview.addEventListener('click', () => {
  togglePopupState(popupPreview);
});

popupPreview.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    togglePopupState(popupPreview);
  }
});

//функция закрытия окна preview для esc
const handleEscKeydownPreview = (event) => {
  if (event.key === 'Escape') {
    togglePopupState(popupPreview);
    document.removeEventListener('keydown', handleEscKeydownPreview); // удалил обработчик события для Esc
  }
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }

  if (popupPreview.classList.contains('popup_opened')) {
    handleEscKeydownPreview(evt); // обработчик для Esc при открытии preview
  }
});