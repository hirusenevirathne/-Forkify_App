class SearchView {
  _perentEl = document.querySelector('.search');

  getQuery() {
    const query = this._perentEl.querySelector('.search__field').value;
    this._clearInput(); // clear input feild after submit
    return query; // return query
  }

  #clearInput() {
    this._perentEl.querySelector('.search__field').value = ''; // clear input
  }

  addHandlerSearch(handler) {
    this._perentEl.addEventListener('submit', function (e) {
      e.preventDefault(); // prevent default action (reload page)
      handler(); // call handler function
    });
  }
}

export default new SearchView(); // export instance of class
