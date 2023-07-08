import { Card } from "../components/Card.js";
import { initialCards, validationSettings } from "../utils/utils.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";

// переменные для профиля
const editProfileButton = document.querySelector('.profile__edit-button');//для слушателя открытия попапа профиля
const editProfileForm = document.querySelector('[name="profile-form"]');//форма попапа профиля для валидации
// переменные для карточек
const addNewCardButton = document.querySelector('.profile__add-icon');// для открытия попапа  карточки
const addCardForm = document.querySelector('[name="elements-form"]');// для формы новой карточки для валидации

//----------------------- редактирование профиля-------------------//

//экземпляр класса для валидации формы профиля
const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm);

// экземпляр класса UserInfo
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__paragraph'
});

// экземпляр класса PopupWithForm для попапа профиля
const editProfilePopup = new PopupWithForm('.popup_content_profile', {
  submitHandler: (formData) => {
    const name = formData['profile-input_name'];
    const info = formData['profile-input_description'];
    userInfo.setUserInfo({ name, info }); //сохраняем данные в разметку
    editProfilePopup.close();
  },
  formValidator: editProfileFormValidator
});

// начальные значения полей ввода из разметки
const initialData = userInfo.getUserInfo();
editProfilePopup.setInitialValues(initialData);

// слушатель клика на кнопку редактирования профиля
editProfileButton.addEventListener('click', () => {
  editProfileFormValidator.resetValidation();// сброс ошибок 
  editProfilePopup.open();
});

// обработчики
editProfilePopup.setEventListeners();

//---------------------------карточки----------------------------//

//экземпляр попапа превью для обработчика клика
const popupContentPreview = new PopupWithImage('.popup_content_preview');

popupContentPreview.setEventListeners();

// экземпляр для валидации
const addCardFormValidator = new FormValidator(validationSettings, addCardForm);

// слушаетль открыть попап новой карточки
addNewCardButton.addEventListener('click', () => {
  addCardFormValidator.resetValidation();//сброс ошибок валидации
  popupContentCell.open();
})

// функция создания новой карточки через класс
function createCard(data) {
  const card = new Card({
    data: data,
    templateSelector: '.template-cell',
    handleCardClick: () => {// обработчик клика по карточке для просмотра
      popupContentPreview.open(data);
    }
  });

  const cardElement = card.generateCard();
  return cardElement;
}

// экземпляр класса Section
const cardList = new Section({
  renderer: (item) => {// создание новой карточки при рендеринге
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, '.elements__cards');

// Добавить карточки из массива
cardList.renderItems(initialCards);

// Экземпляр класса PopupWithForm для создания карточки
const popupContentCell = new PopupWithForm('.popup_content_cell', {
  submitHandler: (formData) => {//обработчик сабмита формы
    const cardData = {
      name: formData['elements_input_name'],
      link: formData['elements_input_link']
    };
    const newCardElement = createCard(cardData);
    cardList.addItem(newCardElement);
    editProfilePopup.close();
  },
  formValidator: addCardFormValidator
});

// Слушатели
popupContentCell.setEventListeners();