import { initialCards } from './cards.js';
import Card from "./Card.js";
import FormValidator from './FormValidator.js';

//карточки  
const elements = document.querySelector('.elements');
// Поля из профиля
const profileName = document.querySelector('.profile__name-text');
const profileJob = document.querySelector('.profile__about-me');
// Попапы
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
// const popupOpenImg = document.querySelector('.popup-full-img');
// Кнопки
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const buttonSubmitAddCardPopup = popupAddCard.querySelector('.popup__submit-button');
const buttonSubmitEditProfilePopup = popupEditProfile.querySelector('.popup__submit-button');
// Формы
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');
// Поля форм
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_job');
const titleInput = formAddCard.querySelector('.popup__input_type_title');
const linkInput = formAddCard.querySelector('.popup__input_type_link');

//открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEscape);
}

//закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEscape);
}

//закрыть на оверлее
function closeOnOverlay(e, popup) {
  if (e.target === e.currentTarget) {
    closePopup(popup);
  }
}

//закрыть по клику на кнопку
function closeOnButton(e, popup) {
  if (e.target.classList.contains('popup__icon-close')) {
    closePopup(popup);
  }
}

//закрыть по esc
function closeOnEscape(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup)
      closePopup(openedPopup);
  }
}

// Обработчики форм
function handleFormEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleFormAddSubmit(e) {
  e.preventDefault();
  const element = {
    name: titleInput.value,
    link: linkInput.value
  }
  const card = new Card(element, '#card');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
  closePopup(popupAddCard);
}

function openEditProfilePopup() {
  //очищаем ошибки
  formEditProfileValidator.hideInputError(nameInput);
  formEditProfileValidator.hideInputError(jobInput);
  //заполняем поля
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formEditProfileValidator.disableSubmitButton(buttonSubmitEditProfilePopup);
  openPopup(popupEditProfile);
}

function openAddCardPopup() {
  formAddCard.reset();
  //очищаем ошибки
  formAddCardValidator.hideInputError(titleInput);
  formAddCardValidator.hideInputError(linkInput);
  formAddCardValidator.disableSubmitButton(buttonSubmitAddCardPopup);
  openPopup(popupAddCard);
}

// Обработчики на формы
formEditProfile.addEventListener('submit', handleFormEditSubmit);
formAddCard.addEventListener('submit', handleFormAddSubmit);
// Обработчики на клики
buttonOpenEditProfilePopup.addEventListener('click', openEditProfilePopup);
buttonOpenAddCardPopup.addEventListener('click', openAddCardPopup);
// Закрыть по клику на оверлей
popupAddCard.addEventListener('click', (e) => closeOnOverlay(e, popupAddCard));
popupEditProfile.addEventListener('click', (e) => closeOnOverlay(e, popupEditProfile));
// Закрыть по клику на кнопку
popupAddCard.addEventListener('click', (e) => closeOnButton(e, popupAddCard));
popupEditProfile.addEventListener('click', (e) => closeOnButton(e, popupEditProfile));

initialCards.forEach(element => {
  const card = new Card(element, '#card');
  const cardElement = card.generateCard();

  elements.append(cardElement);
});

const settingsValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const formEditProfileValidator = new FormValidator(settingsValidation, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(settingsValidation, formAddCard);
formAddCardValidator.enableValidation();