import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data; // declare data
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); // return if no data or empty array

    this._data = data; // set data
    const markup = this._generateMarkup(); // generate markup

    if (!render) return markup; // return markup if render is false

    this._clear(); // clear recipe container
    this._perentElement.insertAdjacentHTML('afterbegin', markup); // insert markup as html string
  }

  update(data) {
    //if (!data || (Array.isArray(data) && data.length === 0))
    //return this.renderError(); // return if no data or empty array

    this._data = data; // set data
    const newMarkup = this._generateMarkup(); // generate new markup

    const newDOM = document.createRange().createContextualFragment(newMarkup); // create new DOM node object
    const newElements = Array.from(newDOM.querySelectorAll('*')); // select all elements from new DOM node object
    const curElements = Array.from(this._perentElement.querySelectorAll('*')); // select all elements from current DOM node object

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
