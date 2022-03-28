import './index.css';
import {
  initialCards
} from './scripts/utils/cards.js';
import {
  listElementsSelector,
  formEditProfile,
  formAddCard,
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
  buttonSubmitEditProfilePopup,
  buttonSubmitAddCardPopup,
  nameInput,
  jobInput,
  titleInput,
  linkInput

} from './scripts/utils/constants.js';
import FormValidator from './scripts/components/FormValidator.js';
import Section from './scripts/components/Section.js';
import Card from "./scripts/components/Card.js";
import UserInfo from './scripts/components/UserInfo.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';

function createCard(item, position) {
  const card = new Card(item, '#card', popupOpenImg.open);
  const cardElement = card.generateCard();
  items.addItem(cardElement, position);
}

function openEditProfilePopup() {
  //очищаем ошибки
  formEditProfileValidator.hideInputError(nameInput);
  formEditProfileValidator.hideInputError(jobInput);
  //заполняем поля
  nameInput.value = user.getUserInfo().name;
  jobInput.value = user.getUserInfo().job;
  formEditProfileValidator.disableSubmitButton(buttonSubmitEditProfilePopup);
  popupEditProfile.open();
}

function openAddCardPopup() {
  //очищаем ошибки
  formAddCardValidator.hideInputError(titleInput);
  formAddCardValidator.hideInputError(linkInput);
  formAddCardValidator.disableSubmitButton(buttonSubmitAddCardPopup);
  popupAddCard.open();
}

const settingsValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const user = new UserInfo({
  userNameSelector: '.profile__name-text',
  userAboutSelector: '.profile__about-me'
});

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', (e, {inputName, inputJob}) => {
  e.preventDefault();
  user.setUserInfo(inputName, inputJob)
  popupEditProfile.close();
});

const popupAddCard = new PopupWithForm('.popup_type_add-card', (e, {inputTitle, inputLink}) => {
  e.preventDefault();
  const item = {
    name: inputTitle,
    link: inputLink
  }
  createCard(item, 'prepend');
  popupAddCard.close();
});

const popupOpenImg = new PopupWithImage('.popup-full-img');

// Валидаторы форм
const formEditProfileValidator = new FormValidator(settingsValidation, formEditProfile);
const formAddCardValidator = new FormValidator(settingsValidation, formAddCard);

//Устанавливаем слушателей на попапы
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupOpenImg.setEventListeners();

// Обработчики на кнопки открытия форм
buttonOpenEditProfilePopup.addEventListener('click', openEditProfilePopup);
buttonOpenAddCardPopup.addEventListener('click', openAddCardPopup);

//валидация форм
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

const items = new Section({
  items: initialCards,
  renderer: (item) => {
    createCard(item, 'append');
  }
}, listElementsSelector);

items.renderItems();