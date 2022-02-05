const initialCards = [{
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

//карточки  
const elements = document.querySelector('.elements');
//контейнер
const container = document.querySelector('.container');
// Поля из профиля
const profileName = document.querySelector('.profile__name-text');
const profileJob = document.querySelector('.profile__about-me');
// Попапы
const popupList = Array.from(document.querySelectorAll('.popup'));
const editPopup = document.querySelector('.popup_type_edit-profile');
const addPopup = document.querySelector('.popup_type_add-card');
const imgPopup = document.querySelector('.popup-full-img');
// Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeEditPopupButton = editPopup.querySelector('.popup__icon-close');
const closeAddPopupButton = addPopup.querySelector('.popup__icon-close');
const closeFullImgPopupButton = imgPopup.querySelector('.popup__icon-close');
const addSubmitButtin = addPopup.querySelector('.popup__submit-button');
const editSubmitButtin = editPopup.querySelector('.popup__submit-button');
// Формы
const editElementForm = editPopup.querySelector('.popup__form');
const addElementForm = addPopup.querySelector('.popup__form');
// Поля форм
const nameInput = editElementForm.querySelector('.popup__input_type_name');
const jobInput = editElementForm.querySelector('.popup__input_type_job');
const titleInput = addElementForm.querySelector('.popup__input_type_title');
const linkInput = addElementForm.querySelector('.popup__input_type_link');
//поля для ошибок

//templates
const cardTemplate = document.querySelector('#card').content;
//Изображение в попапе
const popupImgText = imgPopup.querySelector('.popup-full-img__text');
const popupImg = imgPopup.querySelector('.popup-full-img__img');

//закрыть по esc
function closeOnEscape(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup)
      closePopup(openedPopup);
  }
}

//открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEscape);
}

//закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventlistener('keydown', closeOnEscape);
}

//закрыть на оверлее
function closeOnOverlay(e, popup) {
  if (e.target === e.currentTarget)
    closePopup(popup);
}

//создать карточку
function createCard(name, link) {
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);
  const newCardImg = newCard.querySelector('.element__img');
  newCardImg.src = link;
  newCardImg.alt = name;
  newCard.querySelector('.element__title').textContent = name;

  const newCardLike = newCard.querySelector('.element__like');
  newCardLike.addEventListener('click', toggleLike);

  newCardImg.addEventListener('click', openImg);

  const newCardTrash = newCard.querySelector('.element__trash')
  newCardTrash.addEventListener('click', deleteCard);

  return newCard;
}

function toggleLike(e) {
  e.target.classList.toggle('element__like_active');
}

function openImg(e) {
  popupImg.src = e.target.src;
  popupImg.alt = e.target.alt;
  popupImgText.textContent = e.target.alt;
  openPopup(imgPopup);
}

function deleteCard(e) {
  e.target.closest('.element').remove();
}

// Обработчик формы редактирования профиля
function handleFormEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editPopup);
}

function handleFormAddSubmit(e) {
  e.preventDefault();
  elements.prepend(createCard(titleInput.value, linkInput.value));
  closePopup(addPopup);
}

// Прикрепляем обработчики к формам
editElementForm.addEventListener('submit', handleFormEditSubmit);
addElementForm.addEventListener('submit', handleFormAddSubmit);
// Вешаем обработчики на клики
editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
closeEditPopupButton.addEventListener('click', closeEditPopup);
closeAddPopupButton.addEventListener('click', closeAddPopup);
closeFullImgPopupButton.addEventListener('click', closeFullImgPopup);
//закрыть по клику на оверлей
addPopup.addEventListener('click', closeAddPopupOnOverlay);
editPopup.addEventListener('click', closeEditPopupOnOverlay);
imgPopup.addEventListener('click', closeFullImgPopupOnOverlay);

function clearValidity(popup) {
  const listInput = Array.from(popup.querySelectorAll('.popup__input'));
  const listError = Array.from(popup.querySelectorAll('.popup__input-error'));

  listInput.forEach(input => {
    input.classList.remove('popup__input_type_error');
  });
  listError.forEach(error => {
    error.classList.remove('popup__input-error_active');
    error.textContent = '';
  });
  addSubmitButtin.classList.add('popup__submit-button_disabled');
  addSubmitButtin.disabled = true;
  editSubmitButtin.classList.remove('popup__submit-button_disabled');
  editSubmitButtin.disabled = false;
}

function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidity(editPopup);
  openPopup(editPopup);
}

function openAddPopup() {
  addElementForm.reset();
  clearValidity(addPopup);
  openPopup(addPopup);
}

function closeAddPopup() {
  closePopup(addPopup)
}

function closeEditPopup() {
  closePopup(editPopup)
}

function closeFullImgPopup() {
  closePopup(imgPopup)
}

function closeAddPopupOnOverlay(e) {
  closeOnOverlay(e, addPopup)
}

function closeEditPopupOnOverlay(e) {
  closeOnOverlay(e, editPopup)
}

function closeFullImgPopupOnOverlay(e) {
  closeOnOverlay(e, imgPopup)
}

initialCards.forEach(element => {
  elements.append(createCard(element.name, element.link));
});
//При загрузке заполняем поля данными чтобы кнопка была активна
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;