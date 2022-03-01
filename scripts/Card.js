export default class Card {
    constructor(data, cardSelector) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
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
        this._card.querySelector('.element__img').addEventListener('click', (e) => this._openImage(e));

        this._popupElement.addEventListener('click', (e) => this._closePopupOnOverlay(e));
        this._popupElement.querySelector('.popup__icon-close').addEventListener('click', (e) => this._closePopupOnButton(e));
        document.addEventListener('keydown', (e) => this._closePopupOnEscape(e));
    }

    _toggleLike(e) {
        e.target.classList.toggle('element__like_active');
    }

    _deleteCard(e) {
        e.target.closest('.element').remove();
    }

    generateCard() {
        this._card = this._getTemplate();
        this._popupElement = document.querySelector('.popup-full-img');
        this._setEventListeners();

        this._card.querySelector('.element__img').src = this._image;
        this._card.querySelector('.element__img').alt = this._title;
        this._card.querySelector('.element__title').textContent = this._title;

        return this._card;
    }

    _openImage(e) {
        const popupImg = this._popupElement.querySelector('.popup-full-img__img');
        const popupImgText = this._popupElement.querySelector('.popup-full-img__text');
        popupImg.src = e.target.src;
        popupImg.alt = e.target.alt;
        popupImgText.textContent = e.target.alt;

        this._openPopup();
    }

    _openPopup() {
        this._popupElement.classList.add('popup_opened');
    }

    _closePopup() {
        this._popupElement.classList.remove('popup_opened');
    }

    _closePopupOnEscape(e) {
        if (e.key === 'Escape' && this._popupElement) {
            this._closePopup();
        }
    }

    _closePopupOnOverlay(e) {
        if (e.target === e.currentTarget) {
            this._closePopup();
        }
    }

    _closePopupOnButton(e) {
        if (e.target.classList.contains('popup__icon-close')) {
            this._closePopup();
        }
    }

}