export default class Card {
    constructor(data, cardSelector){
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate(){
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners(){
        this._card.querySelector('.element__trash').addEventListener('click', (e) => this._deleteCard(e));
        this._card.querySelector('.element__like').addEventListener('click', (e) => this._toggleLike(e));
    }

    _toggleLike(e) {
        e.target.classList.toggle('element__like_active');
      }

    _deleteCard(e) {
        e.target.closest('.element').remove();
    }

    generateCard() {
        this._card = this._getTemplate();
        this._setEventListeners();

        this._card.querySelector('.element__img').src = this._image;
        this._card.querySelector('.element__img').alt = this._title;
        this._card.querySelector('.element__title').textContent = this._title;


        // newCardImg.addEventListener('click', openImg);
        return this._card;
    }

}