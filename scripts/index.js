import { initialCards } from './cards.js';
import Card from "./Card.js";
// import FormValidator from "./FormValidator";

//карточки  
const elements = document.querySelector('.elements');
// Поля из профиля
const profileName = document.querySelector('.profile__name-text');
const profileJob = document.querySelector('.profile__about-me');
// Попапы
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupOpenImg = document.querySelector('.popup-full-img');
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
//templates
const cardTemplate = document.querySelector('#card').content;
//Изображение и подпись в попапе
const popupImgText = popupOpenImg.querySelector('.popup-full-img__text');
const popupImg = popupOpenImg.querySelector('.popup-full-img__img');

// //открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEscape);
}

// //закрыть попап
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

//создать карточку
// function createCard(name, link) {
//   const newCard = cardTemplate.querySelector('.element').cloneNode(true);
//   const newCardImg = newCard.querySelector('.element__img');
//   const newCardLike = newCard.querySelector('.element__like');
//   const newCardTrash = newCard.querySelector('.element__trash');

//   newCardImg.src = link;
//   newCardImg.alt = name;
//   newCard.querySelector('.element__title').textContent = name;
//   newCardLike.addEventListener('click', toggleLike);
//   newCardImg.addEventListener('click', openImg);
//   newCardTrash.addEventListener('click', deleteCard);

//   return newCard;
// }

// function toggleLike(e) {
//   e.target.classList.toggle('element__like_active');
// }

// function deleteCard(e) {
//   e.target.closest('.element').remove();
// }

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
  hideInputError(formEditProfile, nameInput, settingsValidation);
  hideInputError(formEditProfile, jobInput, settingsValidation);
  //заполняем поля
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  disableSubmitButton(buttonSubmitEditProfilePopup, settingsValidation.inactiveButtonClass);
  openPopup(popupEditProfile);
}

function openAddCardPopup() {
  formAddCard.reset();
  //очищаем ошибки
  // hideInputError(formAddCard, titleInput, settingsValidation);
  // hideInputError(formAddCard, linkInput, settingsValidation);
  // disableSubmitButton(buttonSubmitAddCardPopup, settingsValidation.inactiveButtonClass);
  openPopup(popupAddCard);
}

// function openImg(e) {
//   popupImg.src = e.target.src;
//   popupImg.alt = e.target.alt;
//   popupImgText.textContent = e.target.alt;
//   openPopup(popupOpenImg);
// }

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
// popupOpenImg.addEventListener('click', (e) => closeOnOverlay(e, popupOpenImg));

// initialCards.forEach(element => {
//   elements.append(createCard(element.name, element.link));
// });

initialCards.forEach(element => {
  const card = new Card(element, '#card');
  const cardElement = card.generateCard();

  elements.append(cardElement);
});