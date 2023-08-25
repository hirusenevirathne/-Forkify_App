import View from './View.js'; // import parent class
import icon from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends View {
  _perentElement = document.querySelector('.results'); // select element

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join(''); // return markup
  }
  _generateMarkupPreview(result) {
    return `
    <li class="preview">
            <a class="preview__link preview__link--active" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icon}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
        </li>
    `;
  }
}

export default new ResultsView(); // export instance of class