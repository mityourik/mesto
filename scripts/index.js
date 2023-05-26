const templateItem = document.querySelector('.template-cell');
const elementsItem = document.querySelector('.elements__cards');

function renderNewCard(name, link) {
  const cloneDefaultCard = templateItem.content.cloneNode(true);
  const defaultCardImage = cloneDefaultCard.querySelector('.elements__photo');
  const defaultCardName = cloneDefaultCard.querySelector('.elements__title');
  const defaultCardLikeButton = cloneDefaultCard.querySelector('.elements__like-button');
  const defaultCardTrashButton = cloneDefaultCard.querySelector('.elements__trash-button');

  defaultCardImage.src = link;
  defaultCardImage.alt = 'Изображение ' + name;
  defaultCardName.textContent = name;

  defaultCardLikeButton.addEventListener('click', () => {
    defaultCardLikeButton.classList.toggle('elements__like-image_enabled');
  });

  defaultCardTrashButton.addEventListener('click', () => {
    const parentCard = defaultCardTrashButton.closest('.elements__cell');
    parentCard.remove();
  });

  defaultCardImage.addEventListener('click', () => {
    openPopupContentPreview();
    previewImage.src = link;
    previewImage.alt = 'Изображение ' + name;
    previewName.textContent = name;
  });

  return cloneDefaultCard;
}

// Проходимся по массиву карточек
initialCards.forEach(function(card) {
  const cardElement = renderNewCard(card.name, card.link);
  elementsItem.appendChild(cardElement);
});

// Пользовательские карточки через popup_content_cell
const buttonAddNewCell = document.querySelector('.profile__add-icon');
const popupContentCell = document.querySelector('.popup_content_cell');
const buttonClosePopupCell = document.querySelector('.button_close_cell');

// Функция для открытия попап-окна
function openPopupContentCell() {
  popupContentCell.classList.add('popup_opened');
}

// Функция для закрытия попап-окна
function closePopupContentCell() {
  popupContentCell.classList.remove('popup_opened');
}

// Обработчик события для открытия попапа
buttonAddNewCell.addEventListener('click', openPopupContentCell);

// Обработчик события для закрытия попапа
buttonClosePopupCell.addEventListener('click', closePopupContentCell);

const formCreateCell = document.querySelector('[name="elements-form"]');
const inputNameCell = formCreateCell.querySelector('[name="elements_input_name"]');
const inputLinkCell = formCreateCell.querySelector('[name="elements_input_link"]');

formCreateCell.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = inputNameCell.value;
  const link = inputLinkCell.value;
  
  // Создать новую карточку с использованием значений из полей формы
  const newCard = renderNewCard(name, link);
  
  // Добавить новую карточку в начало списка
  elementsItem.prepend(newCard);
  
  // Закрыть попап
  closePopupContentCell();
  
  // Очистить значения полей формы
  formCreateCell.reset();
});

// закрыть окно попапа при клике вне окна
popupContentCell.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopupContentCell(popupContentCell);
    formCreateCell.reset();
  }
});

// Предпросмотр фото карточки во всплывающем окне
const popupContentPreview = document.querySelector('.popup_content_preview');
const previewImage = popupContentPreview.querySelector('.popup__image-preview');
const previewName = popupContentPreview.querySelector('.popup__preview-name');
const buttonClosePreview = document.querySelector('.button_close_preview');

// Функция для открытия попап-окна превью
function openPopupContentPreview() {
  popupContentPreview.classList.add('popup_opened');
}

// Функция для закрытия попап-окна превью
function closePopupContentPreview() {
  popupContentPreview.classList.remove('popup_opened');
}

buttonClosePreview.addEventListener('click', closePopupContentPreview);

// закрыть окно попапа при клике вне окна
popupContentPreview.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopupContentPreview(popupContentCell);
  }
});

// ----- Попап редактирования профиля ПР#4 ----- //
const buttonPopupOpen = document.querySelector('.profile__popup-open');
const popupProfile = document.querySelector('.popup_content_profile');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const profileSaveButton = popupProfile.querySelector('.popup__save-button');
const profileForm = document.querySelector('[name="profile-form"]');
const profileNameField = profileForm.querySelector('[name="profile-input_name"]');
const profileDescripField = profileForm.querySelector('[name="profile-input_description"]');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');

const openPopup = (popupToOpen) => {
  popupToOpen.classList.add('popup_opened');
};

const closePopup = (popupToClose) => {
  popupToClose.classList.remove('popup_opened');
};

buttonPopupOpen.addEventListener('click', () => {
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