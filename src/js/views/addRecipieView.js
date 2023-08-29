import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super(); // call constructor of parent class
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden'); // toggle hidden class
    this._window.classList.toggle('hidden'); // toggle hidden class
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this)); // add event listener to open button
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this)); // add event listener to close button
    this._overlay.addEventListener('click', this.toggleWindow.bind(this)); // add event listener to overlay
  }

  addHandlerUpload() {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault(); //prevent default form submit
      const dataArr = [...new FormData(this)]; // create array from form data
      const data = Object.fromEntries(dataArr); // create object from array
      handler(data);
    }
  }

  //_generateMarkup() {}
}

export default new AddRecipeView(); // export instance of class
