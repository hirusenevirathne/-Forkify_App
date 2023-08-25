import * as model from './model.js'; // import model
import recipeView from './views/recipeView.js'; // import recipeView

import 'core-js/stable'; // polyfill everything else (async await) (Parcel 2)
import 'regenerator-runtime/runtime'; // polyfill async await (Parcel 2) Run on old browsers
//console.log(icons);

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  // async function
  try {
    const id = window.location.hash.slice(1); // get id from url
    if (!id) return; // return if no id
    recipeView.renderSpinner(); // add spiner before loarding

    // 01) Loading recipe
    await model.loadRecipe(id); // load recipe
    //const { recipe } = model.state; // destructure recipe

    // 02) Rendering recipe
    recipeView.render(model.state.recipe); // render recipe
  } catch (error) {
    // catch error
    alert(error); // alert error
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes); // call function to show recipe on load and hashchange
};
init();
