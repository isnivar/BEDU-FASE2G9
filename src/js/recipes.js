import { createCard } from "./utils/helpers";
import { buildUrl } from "./utils/helpers";

const searchInput = document.getElementById("recipe");
const searchButton = document.getElementById("searchRecipe");
const searchRandom = document.getElementById("random");
const results = document.getElementById("results");

searchButton.addEventListener("click", validateSearchInput);
searchRandom.addEventListener("click", getRandomMeals);

function getRandomMeals() {
  return fetch(buildUrl("random", ""))
    .then((response) => response.json())
    .then((data) => {
        results.replaceChildren();
        data.meals.forEach((meal) => {
          console.log(meal.strMealThumb, meal.strMeal);
          results.appendChild(createCard(meal.strMealThumb, meal.strMeal));
        });
    })
    .catch(function(err) {
      if(data.meals == null){
        console.log("No se encontraron resultados.")
        const labelNotFound = document.createElement("label");
        labelNotFound.innerHTML = "No se encontraron resultados!";
        results.replaceChildren();
        results.appendChild(labelNotFound);
      }else{
        console.log(err)
      }
    });
}

function validateSearchInput() {
  if (searchInput.value == "" || searchInput.value == null) {
    const input = document.getElementById("input");
    input.className = "form-floating is-invalid";
  } else {
    const input = document.getElementById("input");
    input.className = "form-floating";
    getMeals();
  }
}

function getMeals() {
  const data = searchInput.value;
  console.log(data);

  return fetch(buildUrl("search", "s") + data)
    .then((response) => response.json())
    .then((data) => {
        results.replaceChildren();
        data.meals.forEach((meal) => {
          console.log(meal.strMealThumb, meal.strMeal);
          results.appendChild(createCard(meal.strMealThumb, meal.strMeal));
        });
    })
    .catch(function(err) {
      if(data.meals == null){
        console.log("No se encontraron resultados.")
        const labelNotFound = document.createElement("label");
        labelNotFound.innerHTML = "No se encontraron resultados!";
        results.replaceChildren();
        results.appendChild(labelNotFound);
      }else{
        console.log(err)
      }
    });
}

const getMealsByCategory = async (category) => {
  let meals = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category
  )
    .then((res) => res.json())
    .then(({ meals }) => meals)
    .catch((e) => "Error fetching meals.");

  let showMeals = document.getElementById("meals");
  showMeals.replaceChildren();
  meals.forEach((meal) => {
    showMeals.appendChild(createCard(meal.strMealThumb, meal.strMeal));
  });
};

const showCategories = async () => {
  let categories = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  )
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
//searchButton.addEventListener('click', getMeals);
