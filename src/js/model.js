import 'regenerator-runtime/runtime'; // polyfill async await (Parcel 2) Run on old browsers
import { URL_API, RES_PER_PAGE, KEY } from './config';
//import { AJAX, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';
import { startsWith } from 'core-js/core/string';
import { entries } from 'core-js/core/array';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data; // destructure data
  state.recipe = {
    // create new object
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }), // add key if it exists (optional chaining)
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${URL_API}/${id}?key=${KEY}`); // get data
    //console.log(data);
    state.recipe = data.data.recipe; // set recipe

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true; // set bookmarked to true
    else state.recipe.bookmarked = false; // set bookmarked to false
    //console.log(state.recipe); // log recipe

    //console.log(res);
    //console.log(data);
  } catch (error) {
    //alert(error);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query; // set query
    const data = await AJAX(`${URL_API}?search=${query}&key=${KEY}`); // get data
    //console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }), // add key if it exists (optional chaining)
      };
    });
    state.search.page = 1; // set page
    //console.log(state.search.results);
  } catch (error) {
    //console.log(error);
    throw error;
  }
};
//loadSearchResults('pizza');

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page; // set page
  const start = (page - 1) * state.search.resultsPerPage; // calculate start
  const end = page * state.search.resultsPerPage - 1; // calculate end
  return state.search.results.slice(start, end); // return slice
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks)); // set bookmarksq
};

export const addBookmark = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe); // push recipe to bookmarks array

  // mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true; // set bookmarked to true

  persistBookmarks(); // persist bookmarks
};

export const deleteBookmark = function (id) {
  // delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id); // find index of bookmark
  state.bookmarks.splice(index, 1); // delete bookmark

  // mark current recipe as not bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false; // set bookmarked to false

  persistBookmarks(); // persist bookmarks
};

const init = function () {
  const storage = localStorage.getItem('bookmarks'); // get bookmarks from local storage
  if (storage) state.bookmarks = JSON.parse(storage); // set bookmarks
};
init(); // call function

const clearBookmarks = function () {
  localStorage.clear('bookmarks'); // clear bookmarks
};
//clearBookmarks(); // call function

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0], startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim()); // create array from string

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format :)'
          ); // throw error if array length is not 3

        const [quantity, unit, description] = ingArr; // destructure array

        return { quantity: quantity ? +quantity : null, unit, description };
      }); // create array from object

    const recipe = {
      // create new object
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    //console.log(recipe);
    console.log(ingredients);
    const data = await AJAX(`${URL_API}?key=${KEY}`, recipe); // send data
    state.recipe = createRecipeObject(data); // create recipe object
    addBookmark(state.recipe); // add bookmark
  } catch (err) {
    throw err;
  }
};
