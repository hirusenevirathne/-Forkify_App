import View from './View.js'; // import parent class
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _perentElement = document.querySelector('.pagination'); // select element

  _generateMarkup() {
    const curPage = this._data.page; // current page
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    ); // calculate number of pages

    // Page 01 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
    <button class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        `;
    }
    // Other page
    if (curPage < numPages) {
      return `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button>
        `;
    }

    // Page 01 and there are no other pages
    return ''; // return empty string
  }
}
/*
_generateMarkupButtonNext() {
    return `
    <button class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>`;
    
}
_generateMarkupButtonPrev() {
    return `
    <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
    </button>`;
}
*/

export default new PaginationView(); // export instance of class
