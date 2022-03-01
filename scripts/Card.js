import { popupImg, popupImgText } from "./constants.js";

export default class Card {
    constructor(data, cardSelector, openPopup) {
        this._title = data.name;
        this._image = data.link;
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
        this._card.querySelector('.element__trash').addEventListener('click', (e) => this._deleteCard(e));
        this._card.querySelector('.element__like').addEventListener('click', (e) => this._toggleLike(e));
    }

    _toggleLike(e) {
        e.target.classList.toggle('element__like_active');
    }

    _deleteCard(e) {
        this._card.remove();
    }

    generateCard() {
        this._card = this._getTemplate();
        const img = this._card.querySelector('.element__img');
        this._setEventListeners();

        img.src = this._image;
        img.alt = this._title;
        this._card.querySelector('.element__title').textContent = this._title;

        return this._card;
    }

    _openImage(e) {
        popupImg.src = e.target.src;
        popupImg.alt = e.target.alt;
        popupImgText.textContent = e.target.alt;

        this._openPopup(popupImg);
    }
}