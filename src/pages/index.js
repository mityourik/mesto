import './index.css';

import { Card } from "../components/Card.js";
import { validationSettings, popupTypeSelector, profileConfig, apiConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api.js';
import { PopupWithQuestion } from '../components/PopupWithQuestion.js';

// Создаем экземпляр класса UserInfo и передаем настройки
const userInfo = new UserInfo({
  nameSelector: profileConfig.profileTitle,
  descriptionSelector: profileConfig.profileParagraph,
  selectorUserAvatar: profileConfig.profileImage
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> API
let userCurrentId;

const api = new Api(apiConfig);//экз класса с конфиг

Promise.all([api.getUserInfoApi(), api.getInitialCards()])
.then(([resUser, resCard]) => {
  userCurrentId = resUser._id;
  userInfo.setUserInfo(resUser);
  userInfo.setUserAvatar(resUser);
  cardList.renderItems(resCard, userCurrentId)
})
.catch((err) => alert(err))

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

// функция создания новой карточки
function createCard(data, user) {
  const card = new Card({
    data: data,
    userId: user,
    templateSelector: '.template-cell',
    handleCardClick: (name, link) => {
      popupContentPreview.open({ name, link });
    },
    handleCardDelete: (cardId, cardElement) => {
      popupContentConfirm.open(cardId, cardElement);
    },
    handleCardLike: (cardId) => {
      api.pushCardLike(cardId)
        .then((res) => {
          card.setLikesCount(res);
        })
        .catch((err) => alert(err))
    },
    handleLikeDelete: (cardId) => {
      api.removeCardLike(cardId)
        .then((res) => {
        })
        .catch((err) => alert(err))
    }
  });

  return card.generateCard();
}

// экз класса для отрисовки карточек
const cardList = new Section({
  renderer: (item, user) => {
    const cardElement = createCard(item, user);
    cardList.addItem(cardElement);
  }
}, '.elements__cards');

// экз класса для создания новой карточки из попапа
const popupContentCell = new PopupWithForm({
  popupSelector: popupTypeSelector.popupContentCell,
  submitHandler: (formData) => {
    const cardData = {
      name: formData['elements_input_name'],
      link: formData['elements_input_link']
    };
    popupContentCell.renderPreloader(true, 'Сохранение..');
    api.putNewCard(cardData)
    .then((newCard) => {
      const newCardElement = createCard(newCard, userCurrentId);
      cardList.addItem(newCardElement);
    })
    .catch((error) => {
      console.error('Ошибка поста карты', error);
    });
  }
});

// Добавление обработчиков событий и отображение попапа
popupContentCell.setEventListeners();

//попап подтверждения удаления
const popupContentConfirm = new PopupWithQuestion('.popup_content_confirm', {
  submitCallback: (id, card) => {
    popupContentConfirm.renderPreloader(true, 'карточка всё...');
    api.deleteCard(id)
    then(() => {
      card.deleteCard();
      popupContentConfirm.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupContentConfirm.renderPreloader(false);
    })
  }
})

popupContentConfirm.setEventListeners();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> валидация форм

const formEditProfile = document.querySelector('[name="profile-form"]');
const formAddNewCard = document.querySelector('[name="elements-form"]');

const addNewCardValidator = new FormValidator(validationSettings, formAddNewCard);
const editProfileValidator = new FormValidator(validationSettings, formEditProfile);
addNewCardValidator.enableValidation();
editProfileValidator.enableValidation();