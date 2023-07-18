import './index.css';

import { Card } from "../components/Card.js";
import { initialCards, validationSettings, popupTypeSelector, profileConfig, apiConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api.js';

// Создаем экземпляр класса UserInfo и передаем настройки
const userInfo = new UserInfo({
  nameSelector: profileConfig.profileTitle,
  descriptionSelector: profileConfig.profileParagraph,
  selectorUserAvatar: profileConfig.profileImage
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> API

const api = new Api(apiConfig);//экз класса с конфиг

// получение ответа для установки userInfo
async function getAndSetContentApi() {
  try {
    const [resUser, resCard] = await Promise.all([api.getUserInfoApi(), api.getInitialCards()]);//деструкт массива, чтобы получить getUserInfoApi в resUser
    const userCurrentId = resUser._id;
    userInfo.setUserInfo(resUser);
    userInfo.setUserAvatar(resUser);
    cardList.renderItems(resCard, userCurrentId)
  } catch (err) {
    //выводим сообщение об ошибке в консоль для отладки
    console.error("Ошибка при получении данных:", err);
  }
}

// Вызываем функцию для установки данных в профиль
getAndSetContentApi();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> профиль

// Получаем необходимые элементы DOM
const editProfileButton = document.querySelector('.profile__edit-button');//для открытия попа профиля
const nameInputElement = document.querySelector('[name="profile-input_name"]');//для подстановки дефолт данных
const descrInputElement = document.querySelector('[name="profile-input_description"]');//для подстановки дефолт данных

// Создаем экземпляр класса PopupWithForm для редактирования профиля
const editProfilePopup = new PopupWithForm({
  popupSelector: popupTypeSelector.popupContentProfile,
  submitHandler: (formData) => { 
    const name = formData['profile-input_name']; 
    const about = formData['profile-input_description']; 
    userInfo.setUserInfo({ name, about }); //сохраняем данные в разметку 
  }
});

// Слушатель клика на кнопку редактирования профиля
editProfileButton.addEventListener('click', () => {
  const defaultUserInfo = userInfo.getUserInfo();
  nameInputElement.value = defaultUserInfo.name;
  descrInputElement.value = defaultUserInfo.about;
  editProfileValidator.resetValidation();
  editProfilePopup.open();
});

// Добавляем обработчики событий
editProfilePopup.setEventListeners();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> карточки

// Получаем необходимый DOM для клика по кнопке новой карточки
const addNewCardButton = document.querySelector('.profile__add-icon');

// Создаем экземпляр попапа превью и передаем слушатели
const popupContentPreview = new PopupWithImage(popupTypeSelector.popupContentPreview);
popupContentPreview.setEventListeners();

// открыть попап новой карточки
addNewCardButton.addEventListener('click', () => {
  addNewCardValidator.resetValidation();
  popupContentCell.open();
})

// Создание новой карточки
function createCard(data) {
  const card = new Card({
    data: data,
    templateSelector: '.template-cell',
    handleCardClick: (name, link) => {
      popupContentPreview.open({ name, link });
    }
  });
  return card.generateCard();
}

// Создание экземпляра класса Section с карточкой
const cardList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, '.elements__cards');

// Добавление карточек в список ------------- удалить карточки!
//cardList.renderItems(initialCards);

// Создание экземпляра класса PopupWithForm 
const popupContentCell = new PopupWithForm({
  popupSelector: popupTypeSelector.popupContentCell,
  submitHandler: (formData) => {
    const cardData = {
      name: formData['elements_input_name'],
      link: formData['elements_input_link']
    };
    const newCardElement = createCard(cardData);
    cardList.addItem(newCardElement);
  }
});

// Добавление обработчиков событий и отображение попапа
popupContentCell.setEventListeners();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> валидация форм

const formEditProfile = document.querySelector('[name="profile-form"]');
const formAddNewCard = document.querySelector('[name="elements-form"]');

const addNewCardValidator = new FormValidator(validationSettings, formAddNewCard);
const editProfileValidator = new FormValidator(validationSettings, formEditProfile);
addNewCardValidator.enableValidation();
editProfileValidator.enableValidation();