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
            this._renderer(element);
        });
    }

    addItem(element, position) {
        if (position === "append")
            this._container.append(element);
        if (position === 'prepend')
            this._container.prepend(element);
    }
}