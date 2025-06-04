class Section {
    constructor({ items, renderer, containerSelector }) { // this selects the three items within the passed object
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }
    
    addItem(item) {
        this._container.prepend(item);
    }
}

export default Section;