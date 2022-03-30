export default class Card {
    constructor(data, cardSelector, handleCardClick, handleTrashClick) {
        this._title = data.name;
        this._imageLink = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._delete = this._delete.bind(this)
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._card.querySelector('.element__trash').addEventListener('click', () => this._handleTrashClick(this._delete));//_deleteCard());
        this._card.querySelector('.element__like').addEventListener('click', (e) => this._toggleLike(e));
        this._cardImg.addEventListener('click', () => this._handleCardClick(this._title, this._imageLink));
    }

    _toggleLike(e) {
        e.target.classList.toggle('element__like_active');
    }

    _delete() {
        this._card.remove();
        this._card = null;
    }

    generateCard() {
        this._card = this._getTemplate();
        this._cardImg = this._card.querySelector('.element__img');
        this._cardTitle = this._card.querySelector('.element__title');
        
        this._cardImg.src = this._imageLink;
        this._cardImg.alt = this._title;
        this._cardTitle.textContent = this._title;
        
        this._setEventListeners();
        return this._card;
    }

}