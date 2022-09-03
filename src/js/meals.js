import * as helpers from "../utils/helpers";

const searchInput = document.getElementById("recipe");
const searchButton = document.getElementById("searchRecipe");
const searchRandom = document.getElementById("random");
const mealResults = document.getElementById("mealResults");
const totalMeals = document.getElementById("totalMeals");

async function getMeals(endpoint, param) {
  const meal = searchInput.value;
  let meals;
  
  return fetch(helpers.buildUrl(endpoint, param) + meal)
    .then((response) => response.json())
    .then((data) => {
      meals = data.meals;
      helpers.createLabelTotalMeals(totalMeals, meal, meals.length, endpoint);
      helpers.createCard(mealResults, meals);
    })
    .catch(function (err) {
      if (meals == null) {
        console.log("Not found");
        helpers.createLabelTotalMeals(totalMeals, meal);
        helpers.createLabelNotFound(mealResults);
      } else {
        console.log(err);
      }
    });
}

function validateSearchInput() {
  let value = searchInput.value;

  if (value == "" || value == null) {
    console.log("Validamos que el campo no venga vacío.");
    const input = document.getElementById("input");
    input.className = "form-floating is-invalid";
  } else if(value >= 0){
    console.log("Validamos que el dato sea numerico para búscar por código.");
    const input = document.getElementById("input");
    input.className = "form-floating";
    getMeals("lookup", "i");
  } else if((value.length < 2) && (typeof value) === 'string'){
    console.log("Validamos que el campo sea string y menor a dos caracteres para buscar por filtro.");
    const input = document.getElementById("input");
    input.className = "form-floating";
    getMeals("search", "f");
  } else if((typeof value) == 'string'){
    console.log("Validamos que el dato sea string para buscar receta.");
    const input = document.getElementById("input");
    input.className = "form-floating";
    getMeals("search", "s");
  }
}

const getMealsByCategory = async (category) => {
  let meals = await fetch(helpers.buildUrl('filter', 'c') + category)
    .then((res) => res.json())
    .then(({ meals }) => meals)
    .catch((e) => "Error fetching meals.");
    
    let showMeals = document.getElementById("meals");
    showMeals.replaceChildren();
    meals.forEach(async (meal) => {
    let mealDesc = await getMealById(meal.idMeal);
    showMeals.appendChild(helpers.createCardCategories(meal.strMealThumb, meal.strMeal, mealDesc));
  });
};

const getMealById = async (id) => {
  let meal = await fetch(helpers.buildUrl('lookup', 'i') + id)
  .then(res => res.json())
  .then(({meals}) => meals[0])

  return meal;
}

const showCategories = async () => {
  let categories = await fetch(helpers.buildUrl('categories', ''))
    .then((res) => res.json())
    .then(({ categories }) => categories)
    .catch((e) => "Error fetching categories.");

  let cardsCon = document.getElementById("categorias");
  if (categories.length > 0 && typeof categories === "object") {
    categories.forEach((element) => {
      let categoryBtn = document.createElement("button");
      const text = document.createTextNode(element.strCategory);
      categoryBtn.appendChild(text);
      categoryBtn.className = "m-1 btn";
      categoryBtn.id = `${element.strCategory}_${element.idCategory}`;
      let cat = element.strCategory;
      categoryBtn.addEventListener("click", () => getMealsByCategory(cat));
      cardsCon.appendChild(categoryBtn);
    });
  } else {
    console.error(categories);
    let errorMsg = document.createElement("div");
    errorMsg.className = "alert alert-danger";
    const text = document.createTextNode(categories);
    errorMsg.appendChild(text);
    cardsCon.appendChild(errorMsg);
  }
};

showCategories();
searchInput.addEventListener("click", function (){
  searchInput.value = "";
});
searchButton.addEventListener("click", validateSearchInput);
searchRandom.addEventListener("click", function (){
  searchInput.value = "";
  getMeals("random", "");
});
