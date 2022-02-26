import { Cocktail, searchByName, cocktails } from "./data.js";


document.addEventListener('DOMContentLoaded', init, false);
function init() {
    
    ///// VARIAVEIS

    // GLOBAIS
    let main = document.getElementById('main');
    let nav = document.querySelector('nav');
    let grid = document.querySelector('.drinks');

    // PAGINA INICIAL
    let popularDrink = document.getElementById('popularDrink');
    let popularDrinkText = document.querySelector('.popularDrinks p');
    let popularIngredient = document.getElementById('popularIngredient');

    // PROCURA PELO INPUT
    let searchFilters = document.getElementById('searchFilters');
    searchFilters.className = 'hide';

    let drinkSearch = document.getElementById('drinkSearch');
    let popup = document.querySelector('.popup');

    ///// EVENTOS
    nav.addEventListener('input',navEvents, false);
    grid.addEventListener('click', gridEvents,false);
    popup.addEventListener('click', popupClose,false);

    
    ///// FUNCIONALIDADES

    // NAVBAR
    function navEvents(e){  
        if (e.target.id === 'filterByName') {
            let input = e.target.value;
            searchCocktailByName(input);
        }
        
    }

    // GRID DRINKS
    function gridEvents(e) {
        if (e.target.tagName === 'IMG'){
            let img = e.target.dataset.img;
            popup.classList.toggle('open');
            document.getElementById('imgPopup').src = `${img}`;
        }
    }

    function popupClose(){
        popup.classList.toggle('open');
    }

    // PROCURA PELO INPUT
    function searchCocktailByName(input) {
        if(input === ''){
            main.className = 'main';
            drinkSearch.className = 'hide';
            searchFilters.className = 'hide';
        }
        else {
            searchByName(input);
            showCocktailByName(input);
        }
    }

    function showCocktailByName(input) {

        main.className          = 'hide';
        drinkSearch.className   = 'drinks';
        searchFilters.className = 'searchFilters';
        drinkSearch.innerHTML   = ``;

        if (cocktails != null) {
            cocktails.map(c => {
                let {strDrink, strDrinkThumb, strAlcoholic} = c;
                drinkSearch.innerHTML += `
                    <article>
                        <h1>${strDrink}<h1/>
                        <img width=200 src="${strDrinkThumb}" data-img="${strDrinkThumb}">
                        <p>${strAlcoholic}</p>
                        <button>Recipe</button>
                    </article>
                `;
            })
        }

        if (cocktails === null) {
            drinkSearch.innerHTML = `<h1>Drink ${input} not found</h1>`;
        }
    }

    // RANDOM IMAGE
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data =>{
        data.drinks.map( c => {
            popularDrink.src = `${c.strDrinkThumb}`
            popularDrinkText.innerHTML = `${c.strDrink}`
        })
    })


}