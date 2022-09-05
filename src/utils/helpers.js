export const createCardCategories = ( src, title, mealInfo ) => {
  let col = document.createElement("div");
  col.className = "col col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-3";
  //created the container of the card.
  let card = document.createElement("div");
  card.className = "card h-100 btn-card stretched-link";
  card.setAttribute("data-bs-toggle", "modal");
  card.setAttribute("data-bs-target", "#modal" + mealInfo.idMeal);
  // here we create the card header
  let cardHeader = document.createElement("img");
  cardHeader.className = "card-img-top";
  cardHeader.src = src;
  card.appendChild(cardHeader);
  //here we create the body of the card
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  let cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.appendChild(document.createTextNode(title));

  cardBody.appendChild(cardTitle);
  card.appendChild(cardBody);
  col.appendChild(card);

  col.appendChild(createModal(mealInfo.idMeal, mealInfo.strMeal, mealInfo.strInstructions , getMeasures(mealInfo), getIngredients(mealInfo)));
  
  return col;
};

export const createCardMeals = ( src, id, title, instructions, measures, ingredients ) => {
  let col = document.createElement("div");
  col.className = "col col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-3";
  //created the container of the card.
  let card = document.createElement("div");
  card.className = "card h-100";
  // here we create the card header
  let cardHeader = document.createElement("img");
  cardHeader.className = "card-img-top";
  cardHeader.src = src;
  card.appendChild(cardHeader);
  //here we create the body of the card
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  let cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";

  let button = document.createElement("button");
  button.className = "btn btn-card stretched-link";
  button.type = "button";
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", "#modal" + id);
  button.appendChild(document.createTextNode(title));

  cardTitle.appendChild(button);

  cardBody.appendChild(cardTitle);
  card.appendChild(cardBody);
  col.appendChild(card);
  col.appendChild(createModal(id, title, instructions, measures, ingredients));

  return col;
};

export const createModal = ( id, mealName, instructions, measures, ingredients, img ) => {
  let modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = "modal" + id;
  modal.tabIndex = -1;
  modal.setAttribute("aria-labelledby", "modalScrollableTitle" + id);
  modal.setAttribute("aria-hidden", true);
  modal.style = "display: none;";

  let modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog modal-dialog-scrollable";

  let modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  let modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  let title = document.createElement("h3");
  title.className = "modal-title";
  title.id = "modalScrollableTitle" + id;
  title.appendChild(document.createTextNode(mealName));
  
  let btnClose = document.createElement("button");
  btnClose.type = "button";
  btnClose.className = "btn-close";
  btnClose.setAttribute("data-bs-dismiss", "modal");
  btnClose.setAttribute("aria-label", "Close");
  
  modalHeader.appendChild(title);
  modalHeader.appendChild(btnClose);

  let modalBody = document.createElement("div");
  modalBody.className = "modal-body";
  
  modalBody.appendChild(ingredientsSection(ingredients, measures));
  modalBody.appendChild(instructionsSection(instructions));

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);
  
  return modal;
};

const ingredientsSection = (ingredients, measures) => {
  const ingredientsList = document.createElement('div');
  ingredientsList.className = 'container-fluid';

  const title = document.createElement('h4');
  title.appendChild(document.createTextNode('Ingredients'));
  ingredientsList.appendChild(title);

  const uList = document.createElement('ul');

  ingredients.forEach((ingredient, index) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${measures[index]} ${ingredient}`));
    uList.appendChild(li); 
  })

  ingredientsList.appendChild(uList);
  ingredientsList.appendChild(document.createElement('hr'))

  return ingredientsList;
}

const instructionsSection = (instructions) => {
  let instructionsList = document.createElement('div');
  instructionsList.className = 'container-fluid';
  let newList = instructions.split(/[0-9]+[.]/);

  let ul = document.createElement('ol');
  if(newList[0].length === 0)newList.splice(0, 1);
  
  newList.forEach((step) => {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(step));
    ul.appendChild(li);
  });
  
  instructionsList.appendChild(ul);

  return instructionsList;
}

export function createCard(webElement, data) {
  webElement.replaceChildren();
  data.forEach((meal) => {
    webElement.appendChild(
      createCardMeals(
        meal.strMealThumb,
        meal.idMeal,
        meal.strMeal,
        meal.strInstructions,
        getMeasures(meal),
        getIngredients(meal)
      )
    );
  });
}

function getMeasures(data) {
  let newMeal = Object.entries(data);
  let measuresList = newMeal.filter((measure) => measure[0].startsWith("strMeasure") && measure[1] !== " ");

  const measures = measuresList.map(measure => measure[1]);

  return measures;
}

function getIngredients(data) {
  let newMeal = Object.entries(data);
  let ingredientsList = newMeal.filter((ingredients) => ingredients[0].startsWith("strIngredient") && ingredients[1] !== "");

  const ingredients = ingredientsList.map(ingredient => ingredient[1]);
  
  return ingredients;
}

export function createLabelTotalMeals(webElement, criteria, total, endpoint) {
  const labelTotalMeals = document.createElement("label");
  labelTotalMeals.replaceChildren();
  if(endpoint === 'random'){
    labelTotalMeals.innerHTML = "Si no sabes que comer te recomendamos:";
    webElement.replaceChildren();
    webElement.appendChild(labelTotalMeals);
  } else if(total >= 2){
    labelTotalMeals.innerHTML = "Se encontrarón (" + total + ") coincidencias para: " + criteria;
    webElement.replaceChildren();
    webElement.appendChild(labelTotalMeals);
  } else if(total === 1){
    labelTotalMeals.innerHTML = "Se encontró (" + total + ") coincidencia para: " + criteria;
    webElement.replaceChildren();
    webElement.appendChild(labelTotalMeals);
  } else{
    labelTotalMeals.innerHTML = "No se encontraron coincidencias para: " + criteria;
    webElement.replaceChildren();
    webElement.appendChild(labelTotalMeals);
  }
}

export function createLabelNotFound(webElement) {
  const labelNotFound = document.createElement("label");
  labelNotFound.innerHTML =
    "Le recomendamos cambiar los criterios de búsqueda, si se le complica búscar una receta, haga click sobre el botón de 'Búscar receta aleatoriamente', y nosotros le recomendaremos una receta. Tambíen puedes revisar nuestra sección de abajo y búscar por la categoria que más se te apetesca.";
  webElement.replaceChildren();
  webElement.appendChild(labelNotFound);
}

export function buildUrl(endpoint, param) {
  const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
  if (param == null || param == "") {
    return baseUrl + endpoint + ".php";
  }
  return baseUrl + endpoint + ".php?" + param + "=";
}
