export default class Section {
    constructor({
        items,
        renderer
    }, containerSelector) {
        this._initialArray = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._initialArray.forEach(element => {
            this.addItem(element, 'append');
        });
    }

    addItem(item, position) {
        const card = this._renderer(item);
        if (position === 'prepend')
            this._container.prepend(card);
        else this._container.append(card);
    }
}