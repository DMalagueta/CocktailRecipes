import { Cocktail, searchByName, cocktails, findById, myFavouritesFound } from "./data.js";


document.addEventListener('DOMContentLoaded', init, false);
function init() {
    
    ///// VARIAVEIS

    // GLOBAIS
    let main = document.getElementById('main');
    let nav = document.querySelector('nav');
    let grid = document.querySelector('.drinks');

    let myFavourites = document.getElementById('myFavourites');
    myFavourites.className = 'hide';

    // PAGINA INICIAL
    let popularDrink = document.getElementById('popularDrink');
    let popularDrinkText = document.querySelector('.popularDrinks p');

    // PROCURA PELO INPUT
    let searchFilters = document.getElementById('searchFilters');
    searchFilters.className = 'hide';

    let drinkSearch = document.getElementById('drinkSearch');
    let popup = document.querySelector('.popup');

    let myFavouritesArray = [];

    ///// EVENTOS
    nav.addEventListener('input',navEvents, false);
    nav.addEventListener('click',navEvents, false);
    grid.addEventListener('click', gridEvents,false);
    popup.addEventListener('click', popupClose,false);

    
    ///// FUNCIONALIDADES

    // NAVBAR
    function navEvents(e){  
        if (e.target.id === 'filterByName') {
            let input = e.target.value;
            searchCocktailByName(input);
        }
        
        if(e.target.id === 'myFavouritesBtn'){
            if( myFavourites.className != 'myFavourites'){
                    myFavourites.className = 'myFavourites';
                    main.className= 'hide';
                    drinkSearch.className='hide';
                    
                    myFavourites.innerHTML = '';
                    myFavouritesFound.map( c => {
                        myFavourites.innerHTML += `
                            <article>
                                <h1>${c.strDrink}<h1/>
                                <img width=200 src="${c.strDrinkThumb}" data-img="${c.strDrinkThumb}">
                                <p>${c.strAlcoholic}</p>
                            </article>
                        `;
                    }) 
            }
        }

        if (e.target.id === 'logo') {
            main.className='main';
            myFavourites.className = 'hide';

        }
    }

    // GRID DRINKS
    function gridEvents(e) {
        if (e.target.tagName === 'IMG'){
            let img = e.target.dataset.img;
            popup.classList.toggle('open');
            document.getElementById('imgPopup').src = `${img}`;
        }
        
        if(e.target.className === 'addToFavouritesBtn'){
            let id = e.target.dataset.id;
            addToFavourites(id);
        }
    }

    function addToFavourites(id) {
            findById(id);
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
            myFavourites.className ='hide';
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
                let {strDrink, strDrinkThumb, strAlcoholic,idDrink} = c;
                drinkSearch.innerHTML += `
                    <article>
                        <h1>${strDrink}<h1/>
                        <img width=200 src="${strDrinkThumb}" data-img="${strDrinkThumb}">
                        <p>${strAlcoholic}</p>
                        <button class='addToFavouritesBtn' data-id='${idDrink}'>add to favourites</button>
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