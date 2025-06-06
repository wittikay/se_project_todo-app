import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Section from "../utils/section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// DOM Elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

// Initialize Counter
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// Generate Todo Element
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  // Checkbox callback
  todo.handleCheckboxClick = (completed) => {
    todoCounter.updateCompleted(completed);
  };
  // Delete callback
  todo.handleDelete = (wasCompleted) => {
    todoCounter.updateTotal(false); // always decrement total
    if (wasCompleted) {
      todoCounter.updateCompleted(false); // decrement completed if it was completed
    }
  };
  return todo.getView();
};

// Render Todo
const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

// Section Instance
const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

// Popup Instance
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const id = uuidv4();
    const values = { name, date, id, completed: false };
    const todoElement = generateTodo(values);
    section.addItem(todoElement);
    todoCounter.updateTotal(true); // increment total
    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});
addTodoPopup.setEventListeners();

// Form Validation
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

// Initial Render
section.renderItems();

// Event Listeners
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
