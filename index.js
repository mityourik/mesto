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