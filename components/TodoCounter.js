class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length; // count of completed todos
    this._total = todos.length;
    this._updateText(); // Initialize the text content
  }

  // Call this when a checkbox is clicked, and when a completed
  // to-do is deleted.
 updateCompleted = (increment) => {
  if (increment) {
    this._completed += 1;
  } else {
    this._completed -= 1;
  }
  this._updateText();
};

updateTotal = (increment) => {
  if (increment) {
    this._total += 1;
  } else {
    this._total -= 1;
  }
  this._updateText();
};

  // Call the method to update the text content
  _updateText() {
    // Sets the text content of corresponding text element.
    // Call this in the constructor, and whenever the counts get updated.
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
