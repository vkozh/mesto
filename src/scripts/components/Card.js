export default class Card {
    constructor(data, cardSelector, handleCardClick, handleTrashClick, handleLikeClick, userId) {
        this._title = data.name;
        this._imageLink = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._isOwn = data.owner._id === userId;
        this.isLiked = this._likes.some(user => user._id === userId);
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._handleLikeClick = handleLikeClick;
    }

    getId() {
        return this._id;
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
        this._cardTrash.addEventListener('click', () => this._handleTrashClick(this));
        this._card.querySelector('.element__like').addEventListener('click', () => this._handleLikeClick(this));
        this._cardImg.addEventListener('click', () => this._handleCardClick(this._title, this._imageLink));
    }

    updateLikes(count, isLiked) {
        this.isLiked = isLiked;
        this._cardLikeCount.textContent = count;
        if (isLiked) this._like.classList.add('element__like_active');
        else this._like.classList.remove('element__like_active');
    }

    delete() {
        this._card.remove();
        this._card = null;
    }

    generateCard() {
        this._card = this._getTemplate();
        this._cardImg = this._card.querySelector('.element__img');
        this._cardTitle = this._card.querySelector('.element__title');
        this._cardLikeCount = this._card.querySelector('.element__like-count');
        this._cardTrash = this._card.querySelector('.element__trash');
        this._like = this._card.querySelector('.element__like');

        this._cardImg.src = this._imageLink;
        this._cardImg.alt = this._title;
        this._cardTitle.textContent = this._title;
        this.updateLikes(this._likes.length, this.isLiked);
        this._setEventListeners();

        if (!this._isOwn) this._cardTrash.style.display = 'none';
        return this._card;
    }

}