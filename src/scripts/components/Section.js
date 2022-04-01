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
            // this._renderer(element);
            this.addItem(element);
        });
    }

    addItem(item) {
        const card = this._renderer(item);
        this._container.prepend(card);
    }
}