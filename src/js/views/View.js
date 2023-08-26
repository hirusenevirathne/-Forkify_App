import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class Views {
  _data; // declare data
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); // return if no data or empty array

    this._data = data; // set data
    const markup = this._generateMarkup(); // generate markup

    this._clear(); // clear recipe container
    this._perentElement.insertAdjacentHTML('afterbegin', markup); // insert markup as html string
  }

  _clear() {
    this._perentElement.innerHTML = ''; // clear parent element
  }

  renderSpinner = function () {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._clear(); // clear recipe container
    this._perentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(massage = this._errorMessage) {
    const markup = `<div class="error">
    <div>
        <svg>
           <use href="${icons}#icon-alert-triangle"></use>
         </svg>
     </div>
        <p>${massage}</p>
     </div>`;
    this._clear(); // clear recipe container
    this._perentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(massage = this._message) {
    const markup = `
    <div class="message">
    <div>
        <svg>
           <use href="${icons}#icon-smile"></use>
         </svg>
     </div>
        <p>${massage}</p>
     </div>`;
    this._clear(); // clear recipe container
    this._perentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
