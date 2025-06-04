import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector }); // creating an object for Popup
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners(); // call the parent class method
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault(); // prevent the default form submission behavior
      const inputValues = this._getInputValues(); // get the input values
      this._handleFormSubmit(inputValues); // call the handleFormSubmit function with the input values
    });
  }
}

export default PopupWithForm;
