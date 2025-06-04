class Popup {
    constructor({ popupSelector }) {
        this._popupElement = document.querySelector(popupSelector);
        this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
        this._handleEscClose = this._handleEscClose.bind(this);
        console.log(this._popupElement);
    }

    open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscClose);
    }
    close() {
    this._popupElement.classList.remove("popup_visible");
    }

_handleEscClose(evt) {
    if (evt.key === "Escape") {
        this.close();
    }
}

setEventListeners() {
    this._popupCloseBtn.addEventListener("click", () => {
            console.log("Close button clicked");

    this.close();
});
    this._popupElement.addEventListener("mousedown", (evt) => {
    if (
        evt.target.classList.contains("popup_visible") || // overlay click
        evt.target.classList.contains("popup__close") // close button click
    ) {
        this.close();
    }
});
}

}

export default Popup;