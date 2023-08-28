import View from './View.js'; // import parent class
import icon from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends View {
  _perentElement = document.querySelector('.results'); // select element
  _errorMessage = 'No Recipes found for your query! please try again!'; // declare error message
  _message = ''; // declare message

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join(''); // return markup
  }
  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${
              result.id === id ? 'preview__link--active' : ''
            }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
        </li>
    `;
  }
}

export default new ResultsView(); // export instance of class
