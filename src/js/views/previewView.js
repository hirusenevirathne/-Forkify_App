import View from './View.js'; // import parent class
import icon from 'url:../../img/icons.svg'; // Parcel 2

class PreviewView extends View {
  _perentElement = ''; // select element

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${
              this.id === id ? 'preview__link--active' : ''
            }" href="#${this.id}">
              <figure class="preview__fig">
                <img src="${this.image}" alt="${this.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this.title}</h4>
                <p class="preview__publisher">${this.publisher}</p>
                <div class="preview__user-generated ${
                  this._data.key ? '' : 'hidden'
                }">
                  <svg>
                   <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
        </li>
    `;
  }
}

export default new PreviewView(); // export instance of class
