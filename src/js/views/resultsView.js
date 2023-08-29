import View from './View.js'; // import parent class
import previewView from './previewView.js'; // import previewView
import icon from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends View {
  _perentElement = document.querySelector('.results'); // select element
  _errorMessage = 'No Recipes found for your query! please try again!'; // declare error message
  _message = ''; // declare message

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView(); // export instance of class
