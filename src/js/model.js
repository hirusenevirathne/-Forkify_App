import 'regenerator-runtime/runtime'; // polyfill async await (Parcel 2) Run on old browsers
import { URL_API, RES_PER_PAGE } from './config';
import { getJSON } from './helpers.js';

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

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${URL_API}/${id}`); // get data
    //console.log(data);

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
    };
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
    const data = await getJSON(`${URL_API}?search=${query}`); // get data
    //console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
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
