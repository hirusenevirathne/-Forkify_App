import * as model from './model.js'; // import model
import { MODAL_CLOSE_SEC } from './config.js'; // import config file
import recipeView from './views/recipeView.js'; // import recipeView
import SearchView from './views/searchView.js'; // import searchView
import resultsView from './views/resultsView.js'; // import resultsView
import bookmakrsView from './views/bookmakrsView.js'; // import bookmakrsView
import paginationView from './views/paginationView.js'; // import paginationView
import addRecipieView from './views/addRecipieView.js'; // import addRecipieView

import 'core-js/stable'; // polyfill everything else (async await) (Parcel 2)
import 'regenerator-runtime/runtime'; // polyfill async await (Parcel 2) Run on old browsers
import { async } from 'regenerator-runtime'; // polyfill async await (Parcel 2) Run on old browsers

const controlRecipes = async function () {
  // async function
  try {
    const id = window.location.hash.slice(1); // get id from url

    if (!id) return; // return if no id
    recipeView.renderSpinner(); // render spinner

    // 00) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 01) Update bookmarks view
    bookmakrsView.update(model.state.bookmarks); // update bookmarks view

    // 02) Loading recipe
    await model.loadRecipe(id); // load recipe
    //const { recipe } = model.state; // destructure recipe

    // 03) Rendering recipe
    recipeView.render(model.state.recipe); // render recipe

    //Test
    //controlServings();
  } catch (error) {
    // catch error
    recipeView.renderError(); // render error
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner(); // render spinner

    // 01) Get search query
    const query = SearchView.getQuery(); // get query
    if (!query) return; // return if no query

    // 02) Load search results
    await model.loadSearchResults(query); // load search results

    // 03) Render results
    //console.log(model.state.search.results); // log search results
    resultsView.render(model.getSearchResultsPage()); // render search results

    // 04) Render initial pagination buttons
    paginationView.render(model.state.search); // render pagination buttons
  } catch (error) {
    console.log(error); // log error
  }
};
//controlSearchResults(); // call function

const controlPagination = function (goToPage) {
  // 01) Render New results
  resultsView.render(model.getSearchResultsPage(goToPage)); // render search results

  // 02) Render new pagination buttons
  paginationView.render(model.state.search); // render pagination buttons
};

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings); // update servings

  // update the recipe view
  recipeView.update(model.state.recipe); // update recipe
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // update recipe view
  recipeView.update(model.state.recipe); // update recipe

  // render bookmarks
  bookmakrsView.render(model.state.bookmarks); // render bookmarks
};

const controlBookmarks = function () {
  // render bookmarks
  bookmarksView.render(model.state.bookmarks); // render bookmarks
};

const controlAddRecipe = async function (newRecipe) {
  //console.log(newRecipe); // log new recipe

  try {
    // show loading spinner
    addRecipieView.renderSpinner(); // render spinner

    // upload new recipe data
    await model.uploadRecipe(newRecipe); // upload recipe

    // render recipe
    recipeView.render(model.state.recipe); // render recipe

    // success message
    addRecipieView.renderMessage(); // render message

    // render bookmark view
    bookmakrsView.render(model.state.bookmarks); // render bookmarks

    // change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`); // change url

    // Close form window
    setTimeout(function () {
      addRecipieView.toggleWindow(); // toggle window
    }, MODAL_CLOSE_SEC * 1000); // close window after 5 seconds
  } catch (err) {
    console.log(err);
    addRecipieView.renderError(err.message); // render error
  }
};

const init = function () {
  bookmakrsView.addHandlerRender(controlBookmarks); // call function to show bookmarks on load
  recipeView.addHandlerRender(controlRecipes); // call function to show recipe on load and hashchange
  recipeView.addHandlerUpdateServings(controlServings); // call function to update servings
  recipeView.addHandlerAddBookmark(controlAddBookmark); // call function to add/remove bookmark
  SearchView.addHandlerSearch(controlSearchResults); // call function to show search results on submit
  paginationView.addHandlerClick(controlPagination); // call function to show search results on submit
  addRecipieView.addHandlerUpload(controlAddRecipe); // call function to show search results on submit
};
init();
