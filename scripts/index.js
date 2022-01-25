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
  

// Поля из профиля
let profileName = document.querySelector('.profile__name-text');
let profileJob = document.querySelector('.profile__about-me');
// Попапы
let editPopup = document.querySelector('.popup_type_edit-profile');
let addPopup = document.querySelector('.popup_type_add-card');
// Кнопки
let editButton = document.querySelector('.profile__edit-button');
let closeEditPopupButton = editPopup.querySelector('.popup__icon-close');
let addButton = document.querySelector('.profile__add-button');
let closeAddPopupButton = addPopup.querySelector('.popup__icon-close');
// Форма
let formEditElement = editPopup.querySelector('.popup__form');
let formAddElement = addPopup.querySelector('.popup__form');
// Поля формы
let nameInput = formEditElement.querySelector('.popup__input_type_name');
let jobInput = formEditElement.querySelector('.popup__input_type_job');
let titleInput = formAddElement.querySelector('.popup__input_type_title');
let linkInput = formAddElement.querySelector('.popup__input_type_link');

//открыть попап
function openEditPopup() {
    editPopup.classList.add('popup_opened');
    //подставляем значения полей
    nameInput.value = profileName.innerHTML;
    jobInput.value = profileJob.innerHTML;
}

function openAddPopup() {
    addPopup.classList.add('popup_opened');
}

//закрыть попап
function closeEditPopup() {
    editPopup.classList.remove('popup_opened');
}

function closeAddPopup() {
    addPopup.classList.remove('popup_opened');
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
formEditElement.addEventListener('submit', formEditSubmitHandler);
formAddElement.addEventListener('submit', formAddSubmitHandler);
// вешаем обработчики на клики
editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
closeEditPopupButton.addEventListener('click', closeEditPopup);
closeAddPopupButton.addEventListener('click', closeAddPopup);

// Клик по сердечку
let elements = document.querySelector('.elements');
elements.addEventListener('click', function (e) {
    let target = e.target;
    if (target.classList.value.includes('element__like'))
        target.classList.toggle('element__like_active');

})

// удалить карточку
elements.addEventListener('click', function (e) {
    let target = e.target;
    if(target.classList.value.includes('element__trash')){
        let cardToTrash = target.closest(".element");
        cardToTrash.remove();
    }
})

function createCard(element) {
    let newCard = cardTemplate.querySelector('.element').cloneNode(true);
    newCard.querySelector('.element__img').src = element.link;
    newCard.querySelector('.element__img').alt = element.name;
    newCard.querySelector('.element__title').textContent = element.name;
    elements.appendChild(newCard);
}

const cardTemplate = document.querySelector('#card').content;
initialCards.forEach(element => {
    createCard(element)
});