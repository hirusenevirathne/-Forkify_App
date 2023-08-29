import View from './View.js'; // import parent class

class SearchView extends View {
  _perentElement = document.querySelector('.search');

  getQuery() {
    const query = this._perentElement.querySelector('.search__field').value;
    this._clearInput(); // clear input feild after submit
    return query; // return query
  }

  _clearInput() {
    this._perentElement.querySelector('.search__field').value = ''; // clear input
  }

  addHandlerSearch(handler) {
    this._perentElement.addEventListener('submit', function (e) {
      e.preventDefault(); // prevent default action (reload page)
      handler(); // call handler function
    });
  }
}

export default new SearchView(); // export instance of class
