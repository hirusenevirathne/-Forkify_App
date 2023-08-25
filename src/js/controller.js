import * as model from './model.js'; // import model
import recipeView from './views/recipeView.js'; // import recipeView
import SearchView from './views/searchView.js'; // import searchView
import resultsView from './views/resultsView.js'; // import resultsView

import 'core-js/stable'; // polyfill everything else (async await) (Parcel 2)
import 'regenerator-runtime/runtime'; // polyfill async await (Parcel 2) Run on old browsers
//console.log(icons);

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  // async function
  try {
    recipeView.renderSpinner(); // add spiner before loarding

    const id = window.location.hash.slice(1); // get id from url
    if (!id) return; // return if no id

    // 01) Loading recipe
    await model.loadRecipe(id); // load recipe
    //const { recipe } = model.state; // destructure recipe

    // 02) Rendering recipe
    recipeView.render(model.state.recipe); // render recipe
  } catch (error) {
    // catch error
    recipeView.renderError(`${error} 💥💥💥`); // render error
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
    resultsView.render(model.state.search.results); // render search results
  } catch (error) {
    console.log(error); // log error
  }
};
//controlSearchResults(); // call function

const init = function () {
  recipeView.addHandlerRender(controlRecipes); // call function to show recipe on load and hashchange
  SearchView.addHandlerSearch(controlSearchResults); // call function to show search results on submit
};
init();
