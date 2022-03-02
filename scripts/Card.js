import { popupOpenImg, popupImg, popupImgText } from "./constants.js";

export default class Card {
    constructor(data, cardSelector, openPopup) {
        this._title = data.name;
        this._imageLink = data.link;
        this._cardSelector = cardSelector;
        this._openPopup = openPopup;
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
        this._card.querySelector('.element__trash').addEventListener('click', () => this._deleteCard());
        this._card.querySelector('.element__like').addEventListener('click', (e) => this._toggleLike(e));
        this._img.addEventListener('click', (e) => this._openImage(e))
    }

    _toggleLike(e) {
        e.target.classList.toggle('element__like_active');
    }

    _deleteCard() {
        this._card.remove();
    }

    generateCard() {
        this._card = this._getTemplate();
        this._img = this._card.querySelector('.element__img');
        this._setEventListeners();
        
        this._card.querySelector('.element__title').textContent = this._title;
        this._img.src = this._imageLink;
        this._img.alt = this._title;

        return this._card;
    }

    _openImage() {
        popupImg.src = this._imageLink;
        popupImg.alt = this._title;
        popupImgText.textContent = this._title;

        this._openPopup(popupOpenImg);
    }
}