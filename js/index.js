import {searchByName, cocktails, findById, myFavouritesFound,whenFavouriteRemoved, popupItem, findPopupItem, randomDrink, randomDrinkArray} from "./data.js";

import {myCocktailRecipes,Cocktail} from "./recipesData.js";


document.addEventListener('DOMContentLoaded', init, false);
function init() {
    
    ///// VARIAVEIS

    // GLOBAIS
    let main = document.getElementById('main');
    let nav = document.querySelector('nav');
    let grid = document.getElementById('drinkSearch');
    let gridMyRecipes = document.getElementById('gridMyRecipes');
    

    let myFavourites = document.getElementById('myFavourites');
    let gridFavourites = document.querySelector('.myFavourites');
    myFavourites.className = 'hide';

    let myRecipes = document.getElementById('myRecipes');
    myRecipes.className = 'hide';
    let recipesDiv = document.getElementById('gridMyRecipes')
    let addnNewRecipeBtn = document.getElementById('addNewRecipeBtn')

    // SLIDESHOW 
    let slideshow = document.querySelector('.slideshow-container');
    let slide1 = document.getElementById('slide1');
    let slide2 = document.getElementById('slide2');
    let slide3 = document.getElementById('slide3');
    let slide4 = document.getElementById('slide4');
    
    randomDrink(slide1);
    randomDrink(slide2);
    randomDrink(slide3);
    randomDrink(slide4);
        
        
    // PROCURA PELO INPUT
    let searchFilters = document.getElementById('searchFilters');
    searchFilters.className = 'hide';

    let drinkSearch = document.getElementById('drinkSearch');

    let popup = document.getElementById('popup');

    ///// EVENTOS
    nav.addEventListener('input',navEvents, false);
    nav.addEventListener('click',navEvents, false);
    grid.addEventListener('click', gridEvents,false);
    popup.addEventListener('click', popupEvents, false);
    gridFavourites.addEventListener('click', myFavouritesEvents,false);
    slideshow.addEventListener('click', slideshowEvents,false);
    gridMyRecipes.addEventListener('click',gridMyRecipesEvents,false);
    addnNewRecipeBtn.addEventListener('click',addRecipeBtn,false);

    let myFavouritesArray = myFavouritesFound;
    
    let alertDiv = document.querySelector('.alert');
    alertDiv.className = 'hide';

    
    ///// FUNCIONALIDADES

    // NAVBAR
    function navEvents(e){  
        if (e.target.id === 'filterByName') {
            let input = e.target.value;
            myFavourites.className='hide';
            searchFilters.className = 'hide'
            searchCocktailByName(input);
        }

        if(e.target.id === 'myFavouritesBtn'){
            if( myFavourites.className != 'myFavourites'){
                    showFavourites(myFavouritesArray);
            }
            if (myFavouritesArray.length === 0){
                myFavourites.innerHTML ='<h1>No drinks yet? Come on</h1>'
            }
        }   

        if (e.target.id === 'logo') {
            main.className='main';
            myFavourites.className = 'hide';
            myRecipes.className = 'hide';
        }

        if (e.target.id === 'myRecipesBtn'){
            main.className='hide';
            myRecipes.className = 'myRecipes';
            myFavourites.className = 'hide';
            drinkSearch.className = 'hide';
            searchFilters.className = 'hide';
            showMyRecipes();
        }
    }

    // GRID DRINKS
    function gridEvents(e) {
        if (e.target.tagName === 'IMG'){
            let id= e.target.dataset.id;
            popupOpen(id)

        }
        
        if(e.target.className === 'addToFavouritesBtn'){
            let id = e.target.dataset.id;
            addToFavourites(id);
        }

    }

    function myFavouritesEvents(e){
        if (e.target.id === 'removeFavourite'){
            
            let newFavourites = myFavouritesArray.filter(c => e.target.dataset.id != c.idDrink);
            
            myFavouritesArray = newFavourites;
            whenFavouriteRemoved();
            showFavourites(myFavouritesArray);
        }
        if (e.target.tagName === 'IMG'){
            let img = e.target.dataset.id;
            popupOpen(img);
        }
    }

    function showFavourites(array){
        myFavourites.className = 'myFavourites';
        main.className= 'hide';
        drinkSearch.className='hide';
        searchFilters.className = 'hide';
        myRecipes.className = 'hide';

        myFavourites.innerHTML = '';
        array.map( c => {
                 myFavourites.innerHTML += `
                    <article>
                         <h1>${c.strDrink}<h1/>
                        <img width=200 src="${c.strDrinkThumb}" data-id="${c.idDrink}">
                        <p>${c.strAlcoholic}</p>                                <button id='removeFavourite' data-id='${c.idDrink}'>Remove</button>
                    </article>
             `;
        }) 
    }

    function addToFavourites(id) {
            findById(id);
            myFavouritesArray = myFavouritesFound;
            alertDiv.className = 'alert';
            setTimeout(() => {alertDiv.className = 'hide'}, 1000)
            
    }

    function popupOpen(id) {
        popup.classList.toggle('open')
        findPopupItem(id)
    }

    function popupEvents(e){
        if(myRecipes.className !== 'myRecipes'){
            popup.classList.toggle('open');
        }
        if(e.target.id === 'submitAddRecipeBtn'){
            e.preventDefault();
            submitNewRecipe();
        }
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
        myRecipes.className     = 'hide';

        if (cocktails != null) {
            cocktails.map(c => {
                let {strDrink, strDrinkThumb, strAlcoholic,idDrink} = c;
                drinkSearch.innerHTML += `
                    <article>
                        <h1>${strDrink}<h1/>
                        <img width=200 src="${strDrinkThumb}" data-id='${idDrink}'>
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

    // MINHAS RECEITAS

    function showMyRecipes(){
        recipesDiv.innerHTML = '';
        myCocktailRecipes.map(r => {
            let {strDrink, strDrinkThumb, strAlcoholic,idDrink} = r;
            
            recipesDiv.innerHTML += `
            <article>
                <h2>${strDrink}<h2/>
                <img width=200 src="./../img/${strDrinkThumb}" data-id='${idDrink}'>
                <p>${strAlcoholic}</p>
                <button class='addToFavouritesBtn' id="editRecipeBtn" data-id='${idDrink}'>Edit</button>
            </article>
            `
        })
    }

    function gridMyRecipesEvents(e){
        if (e.target.id === 'editRecipeBtn'){
            editRecipe(e.target.dataset.id);
        }
    }

    function addRecipeBtn(e){
        e.preventDefault();
        popup.classList.toggle('open')
        popup.innerHTML=`
        <article>    
        <div class="popupText">
            <form id='addRecipeForm'>
            <h1>Your Recipe</h1>
                <div>
                    <label for='addImg'>Img</label>
                    <input type="text" id='addImg'>
                </div>
    
                <div>
                    <label for='addName'>Name</label>
                    <input type="text" id='addName'>
                </div>

                <div>
                    <label for='addAlcoholic'>Alcoholic</label>
                    <input type="checkbox" id='addAlcoholic'>
                </div>
                <hr>
    
                <h3>Ingredients</h3>
                <div>
                    <label for='addIngredient1'>Ingredient 1</label>
                    <input type="text" id='addIngredient1'>
                </div>
                
                <div>
                    <label for='addIngredient2'>Ingredient 2</label>
                    <input type="text" id='addIngredient2'>
                </div>
    
                <hr class='first'>
                <h3>Instructions</h3>
                <textarea id='addInstructions'></textarea>
                
                <p></p>
                <hr>
                <button id="submitAddRecipeBtn">Submit</button>
            </form>
        </div>
    </article>
        `;
        /* let id = new Date().getTime();
        let cocktail = new Cocktail  */

    }

    function submitNewRecipe(){
        let id = new Date().getTime();
        let formRecipe = document.querySelector('#addRecipeForm')
        let addImg = document.querySelector('#addImg').value;
        let addName = document.querySelector('#addName').value;
        let addAlcoholic = document.querySelector('#addAlcoholic').checked;
        let addIngredient1 = document.querySelector('#addIngredient1').value;
        let addIngredient2 = document.querySelector('#addIngredient2').value;
        let addInstructions = document.querySelector('#addInstructions').value;
        

        let cocktail = new Cocktail (
            id,
            addName,
            'Alcoholic',
            addInstructions,
            addImg,
            addIngredient1,
            addIngredient2,
        )

        myCocktailRecipes.push(cocktail);
        console.log(myCocktailRecipes)
        formRecipe.reset();
        popup.classList.toggle('open');
        showMyRecipes();
    }

    function editRecipe(id){
        console.log(id)
        popup.classList.toggle('open');
        let recipeToBeEdited = myCocktailRecipes.filter(c => c.idDrink == id);
        recipeToBeEdited.map(c => {
            popup.innerHTML = `
                <article>    
                    <div class="popupText">
                        <img id="imgPopup" src="${c.strDrinkThumb}" alt=""> 
                            <h1><input value='${c.strDrink}'></h1>
                            <hr>
                            <h3>Ingredients</h3>
                            <p>${c.strIngredient1 == null ? '' : c.strIngredient1}</p>
                            <p>${c.strIngredient2 == null ? '' : c.strIngredient2} </p>
                            <p>${c.strIngredient3 == null ? '' : c.strIngredient3}</p>
                            <p>${c.strIngredient4 == null ? '' : c.strIngredient4}</p>
                            <hr class='first'>
                            <h3>Instructions</h3>
    
                            <p>${c.strInstructions}</p>
                            <hr>
                            <button>Submit</button>
                    </div>
                </article>
            `;
        })
    }   

    //slideshow

    let slideIndex = 1;
    showSlides(slideIndex);

    function slideshowEvents(e) {
        if (e.target.className==='prev'){
            plusSlides(-1);
        }
        if (e.target.className==='next'){
            plusSlides(1);
        }
    }
    
    function plusSlides(n) {
    showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length};
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        slides[slideIndex-1].style.display = "block";
    }

}