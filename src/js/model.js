import 'regenerator-runtime/runtime'; // polyfill async await (Parcel 2) Run on old browsers

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    // 01) Loading recipe
    const res = await fetch(
      // fetch data
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json(); // convert to json

    if (!res.ok) throw new Error(`${data.message} (${res.status})`); // throw error if not ok

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
    alert(error);
  }
};
