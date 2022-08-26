import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { createCard } from '../utils/helpers';

const getMealsByCategory = async (category) => {
    let meals = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c='+category).then((res)=> res.json())
        .then(({meals}) => meals)
        .catch(e => "Error fetching meals.");

    let showMeals = document.getElementById('meals');
    showMeals.replaceChildren();
    meals.forEach(meal => {
        showMeals.appendChild(createCard(meal.strMealThumb, meal.strMeal))
    })
}

const showCategories = async () => {
    let categories = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php').then((res)=> res.json())
        .then(({categories}) => categories)
        .catch(e => "Error fetching categories.");

    let cardsCon = document.getElementById('categorias');
    if(categories.length > 0 && typeof categories === 'object'){
        categories.forEach(element => {
            let categoryBtn = document.createElement('button');
            const text = document.createTextNode(element.strCategory);
            categoryBtn.appendChild(text);
            categoryBtn.className= "m-1 btn";
            categoryBtn.id = `${element.strCategory}_${element.idCategory}`
            let cat = element.strCategory;
            categoryBtn.addEventListener('click', () => getMealsByCategory(cat))
            cardsCon.appendChild(categoryBtn);
        });
    }else{
        console.error(categories)
        let errorMsg = document.createElement('div');
        errorMsg.className = "alert alert-danger";
        const text = document.createTextNode(categories);
        errorMsg.appendChild(text);
        cardsCon.appendChild(errorMsg);
    }
}
showCategories();