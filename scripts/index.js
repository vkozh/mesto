const initialCards = [
    {
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
const editPopup = document.querySelector('.popup_type_edit-profile');
const addPopup = document.querySelector('.popup_type_add-card');
const imgPopup = document.querySelector('.popup-full-img');
// Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeEditPopupButton = editPopup.querySelector('.popup__icon-close');
const closeAddPopupButton = addPopup.querySelector('.popup__icon-close'); 
const closeFullImgPopupButton = imgPopup.querySelector('.popup__icon-close'); 
// Формы
const editElementForm = editPopup.querySelector('.popup__form');
const addElementForm = addPopup.querySelector('.popup__form');
// Поля форм
const nameInput = editElementForm.querySelector('.popup__input_type_name');
const jobInput = editElementForm.querySelector('.popup__input_type_job');
const titleInput = addElementForm.querySelector('.popup__input_type_title');
const linkInput = addElementForm.querySelector('.popup__input_type_link');
//templates
const cardTemplate = document.querySelector('#card').content;
//Изображение в попапе
const popupImgText = imgPopup.querySelector('.popup-full-img__text');
const popupImg = imgPopup.querySelector('.popup-full-img__img');

//открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  if(popup.classList.value.includes('popup_type_edit-profile')){
    nameInput.value = profileName.innerHTML;
    jobInput.value = profileJob.innerHTML;
  }
}
//закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  if(popup.classList.value.includes('popup_type_add-card')){
    addElementForm.reset();
  }
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

// Обработчик формы редактирования профиля
function handleFormEditSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(editPopup);
}

function handleFormAddSubmit(evt) {
    evt.preventDefault();
    if((linkInput.value !== '') && (titleInput.value !== '')){
      elements.prepend(createCard(titleInput.value, linkInput.value));
      closePopup(addPopup);
    }
}

// Прикрепляем обработчики к формам
editElementForm.addEventListener('submit', handleFormEditSubmit);
addElementForm.addEventListener('submit', handleFormAddSubmit);
// Вешаем обработчики на клики
editButton.addEventListener('click', () => openPopup(editPopup)); 
addButton.addEventListener('click', () => openPopup(addPopup));
closeEditPopupButton.addEventListener('click', () => closePopup(editPopup));
closeAddPopupButton.addEventListener('click', () => closePopup(addPopup));
closeFullImgPopupButton.addEventListener('click', () => closePopup(imgPopup));

// удалить карточку
elements.addEventListener('click', function (e) {
    const target = e.target;
    if(target.classList.value.includes('element__trash')){
        const cardToTrash = target.closest(".element");
        cardToTrash.remove();
    }
})

initialCards.forEach(element => {
    elements.append(createCard(element.name, element.link));
});

