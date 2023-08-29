import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data; // declare data

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Hiru Senevirathna
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); // return if no data or empty array

    this._data = data; // set data
    const markup = this._generateMarkup(); // generate markup

    if (!render) return markup; // return markup if render is false

    this._clear(); // clear recipe container
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // insert markup as html string
  }

  update(data) {
    this._data = data; // set data
    const newMarkup = this._generateMarkup(); // generate new markup

    const newDOM = document.createRange().createContextualFragment(newMarkup); // create new DOM node object
    const newElements = Array.from(newDOM.querySelectorAll('*')); // select all elements from new DOM node object
    const curElements = Array.from(this._parentElement.querySelectorAll('*')); // select all elements from current DOM node object

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i]; // current element
      //console.log(curEl, newEl.isEqualNode(curEl));

      // update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        //console.log(newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = ''; // clear parent element
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(massage = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear(); // clear recipe container
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(massage = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
      `;
    this._clear(); // clear recipe container
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
