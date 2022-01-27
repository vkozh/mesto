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

//открыть попапы
function openEditPopup() {
    editPopup.classList.add('popup_opened');
    //подставляем значения полей
    nameInput.value = profileName.innerHTML;
    jobInput.value = profileJob.innerHTML;
}

function openAddPopup() {
    addPopup.classList.add('popup_opened');
}

function openFullImgPopup() {
    imgPopup.classList.add('popup_opened');
}

//закрыть попапы
function closeEditPopup() {
    editPopup.classList.remove('popup_opened');
}

function closeAddPopup() {
    addPopup.classList.remove('popup_opened');
    titleInput.value = null;
    linkInput.value = null;
}

function closeFullImgPopup() {
  imgPopup.classList.remove('popup_opened');
}

//создать карточку
function createCard(element) {
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);
  newCard.querySelector('.element__img').src = element.link;
  newCard.querySelector('.element__img').alt = element.name;
  newCard.querySelector('.element__title').textContent = element.name;
  elements.prepend(newCard);
}

// Обработчик «отправки» формы
function formEditSubmitHandler(evt) {
    evt.preventDefault();

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeEditPopup();
}

function formAddSubmitHandler(evt) {
    evt.preventDefault();

    // Вставьте новые значения с помощью textContent
    let newCard = {
        name: titleInput.value,
        link: linkInput.value
    };

    createCard(newCard);
    closeAddPopup();
}

// Прикрепляем обработчик к формам
editElementForm.addEventListener('submit', formEditSubmitHandler);
addElementForm.addEventListener('submit', formAddSubmitHandler);
// Вешаем обработчики на клики
editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
closeEditPopupButton.addEventListener('click', closeEditPopup);
closeAddPopupButton.addEventListener('click', closeAddPopup);
closeFullImgPopupButton.addEventListener('click', closeFullImgPopup);

// Клик по сердечку
elements.addEventListener('click', function (e) {
  const target = e.target;
  if (target.classList.value.includes('element__like')){
      target.classList.toggle('element__like_active');
  }
})
//открыть картинку
elements.addEventListener('click', function (e) {
  const target = e.target;
  if(target.classList.value.includes('element__img')){
    imgPopup.querySelector('.popup-full-img__img').src = target.src;
    imgPopup.querySelector('.popup-full-img__img').alt = target.alt;
    imgPopup.querySelector('.popup-full-img__text').textContent = target.alt;
    openFullImgPopup();
  }
})

// удалить карточку
elements.addEventListener('click', function (e) {
    const target = e.target;
    if(target.classList.value.includes('element__trash')){
        const cardToTrash = target.closest(".element");
        cardToTrash.remove();
    }
})

initialCards.forEach(element => {
    createCard(element)
});

