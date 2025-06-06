class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _getDate() {
    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
  }

  _toggleCompletion() {
    if (this._data.completed) {
      this._todoElement.classList.add("todo_completed");
    } else {
      this._todoElement.classList.remove("todo_completed");
    }
  }

  _deleteListener() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      if (typeof this.handleDelete === "function") {
        this.handleDelete(this._data.completed);
      }
    });
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;
      this._toggleCompletion();
      if (typeof this.handleCheckboxClick === "function") {
        this.handleCheckboxClick(this._data.completed);
      }
    });
  }

  _generateCheckboxEL() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");

    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this._getDate();
    this._generateCheckboxEL();
    this._setEventListeners();
    this._deleteListener();
    return this._todoElement;
  }
}

export default Todo;
