import 'regenerator-runtime/runtime'; // polyfill async await (Parcel 2) Run on old browsers
import { URL_API } from './config';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
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
