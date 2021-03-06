import {searchByName, cocktails, findById, myFavouritesFound,whenFavouriteRemoved, popupItem, findPopupItem, randomDrink, alcoholicDrinksData,nonAlcoholicDrinksData,alcoholicDrinksFetch, nonAlcoholicDrinksFetch} from "./data.js";

import {myCocktailRecipes,Cocktail} from "./recipesData.js";


document.addEventListener('DOMContentLoaded', init, false);
function init() {
    
    ///// VARIAVEIS

    // GLOBAIS
    let main = document.getElementById('main');
    let nav = document.querySelector('nav');

    // Drinksearch section
    let grid = document.getElementById('drinkSearch');
    let searchFilters = document.getElementById('searchFilters');
    searchFilters.className = 'hide';
    let drinkSearch = document.getElementById('drinkSearch');

    // MyRecipes section
    let gridMyRecipes = document.getElementById('gridMyRecipes');
    let myRecipesList = myCocktailRecipes;
    let myRecipes = document.getElementById('myRecipes');
    myRecipes.className = 'hide';
    let addnNewRecipeBtn = document.getElementById('addNewRecipeBtn')

    // Alcoholic e nonAlcholic section
    let alcoholicSection = document.getElementById('alcoholicSection');
    let nonAlcoholicSection = document.getElementById('nonAlcoholicSection');
    
    // Array para filtros com/sem alcool na pesquisa por nome
    let cocktailByFilter = [];

    // Favorites section
    let myFavourites = document.getElementById('myFavourites');
    let gridFavourites = document.querySelector('.myFavourites');
    myFavourites.className = 'hide';
    let myFavouritesArray = myFavouritesFound;

    // GALERIA IMAGENS
    let imgGalery =document.getElementById('imgGalery');
    imgGalery.addEventListener('click', galeryEvents,false);
    let imgRow = document.querySelector('.imgRow');
    let expandedImg = document.getElementById('expandedImg');
    expandedImg.src = './img/welcome.jpeg';

        // IMAGENS RANDOM PARA A GALERIA
        randomDrink(imgRow);
        randomDrink(imgRow);
        randomDrink(imgRow);
        randomDrink(imgRow);
    
    // POPUP
    let popup = document.getElementById('popup');

    // ADDED FAVORITE POPUP
    let alertDiv = document.querySelector('.alert');
    alertDiv.className = 'hide';

    ///// EVENTOS
    nav.addEventListener('input',navEvents, false);
    nav.addEventListener('click',navEvents, false);
    grid.addEventListener('click', gridEvents,false);
    popup.addEventListener('click', popupEvents, false);
    gridFavourites.addEventListener('click', myFavouritesEvents,false);
    gridMyRecipes.addEventListener('click',gridMyRecipesEvents,false);
    addnNewRecipeBtn.addEventListener('click',addRecipeBtn,false);
    searchFilters.addEventListener('change', searchFiltersEvents,false);
    alcoholicSection.addEventListener('click',alcoholicEvents,false);
    nonAlcoholicSection.addEventListener('click',nonAlcoholicEvents,false)

    // FETCH PARA A SECTION Alcoholic E NON ALCOHOLIC
    alcoholicDrinksFetch();
    nonAlcoholicDrinksFetch();

    
    ///// FUNCIONALIDADES

    // EVENTOS GALERIA IMAGENS
    function galeryEvents(e){

        if(e.target.id != 'expandedImg'){
            if(e.target.tagName == 'IMG'){
                expandedImg.src = e.target.src;
                expandedImg.parentElement.style.display="block";
                document.getElementById('imgText').innerHTML=e.target.dataset.name
            }
    }
    }

    // EVENTOS NAVBAR
    function navEvents(e){  
        if (e.target.id === 'filterByName') {
            let input = e.target.value;
            myFavourites.className='hide';
            searchFilters.className = 'hide';
            alcoholicSection.className = 'hide';
            nonAlcoholicSection.className = 'hide';
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
            alcoholicSection.className = 'hide';
            nonAlcoholicSection.className = 'hide';
        }
        if (e.target.id === 'home') {
            main.className='main';
            myFavourites.className = 'hide';
            myRecipes.className = 'hide';
            alcoholicSection.className = 'hide';
            nonAlcoholicSection.className = 'hide';
        }

        if (e.target.id === 'myRecipesBtn'){
            main.className='hide';
            myRecipes.className = 'myRecipes';
            myFavourites.className = 'hide';
            drinkSearch.className = 'hide';
            searchFilters.className = 'hide';
            alcoholicSection.className = 'hide';
            nonAlcoholicSection.className = 'hide';
            showMyRecipes();
        }
        if (e.target.id === 'alcoholicDrinksBtn') {
            alcoholicSection.className = 'alcoholicSection';
            nonAlcoholicSection.className = 'hide';
            main.className='hide';
            myRecipes.className = 'hide';
            myFavourites.className = 'hide';
            drinkSearch.className = 'hide';
            searchFilters.className = 'hide';
            showAllAlcoholicDrinks(alcoholicDrinksData);
        }
        if (e.target.id === 'nonAlcoholicDrinksBtn') {
            alcoholicSection.className = 'hide';
            nonAlcoholicSection.className = 'nonAlcoholicSection';
            main.className='hide';
            myRecipes.className = 'hide';
            myFavourites.className = 'hide';
            drinkSearch.className = 'hide';
            searchFilters.className = 'hide';
            showAllNonAlcoholicDrinks(nonAlcoholicDrinksData);
        }
    }

    // EVENTOS NA GRID DRINKSEARCH
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

    // EVENTOS NOS FILTROS DA DRINKSEARCH
    function searchFiltersEvents(e){
        
        if(e.target.checked){ 
            if(e.target.id === 'alcoholic'){
                let alcoholicCocktail = cocktailByFilter.filter(c => c.strAlcoholic == 'Alcoholic')
                if( alcoholicCocktail !== ''){
                    viewSearchInnerHtml(alcoholicCocktail);
                } else{
                    viewSearchInnerHtml(cocktailByFilter);
                }
            }
            if(e.target.id == 'nonAlcoholic'){
                let nonAlcoholicCocktail = cocktailByFilter.filter(c => c.strAlcoholic == 'Non alcoholic')
                if( nonAlcoholicCocktail === ''){
                    
                    viewSearchInnerHtml(cocktailByFilter);
                } else{
                    viewSearchInnerHtml(nonAlcoholicCocktail);
                }
            }
        } else {
            viewSearchInnerHtml(cocktailByFilter)
        }
    }

    // EVENTOS NA SECTION FAVOURITES
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

    // MOSTRAR FAVORITOS
    function showFavourites(array){
        myFavourites.className = 'myFavourites';
        main.className= 'hide';
        drinkSearch.className='hide';
        searchFilters.className = 'hide';
        myRecipes.className = 'hide';
        alcoholicSection.className = 'hide';
        nonAlcoholicSection.className = 'hide';

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

    // ADICIONAR COCKTAIL AOS FAVORITOS
    function addToFavourites(id) {
            findById(id);
            myFavouritesArray = myFavouritesFound;
            alertDiv.className = 'alert';
            setTimeout(() => {alertDiv.className = 'hide'}, 1000)
            
    }

    // POPUP INFORMA????O DETALHADA COCKTAIL
    function popupOpen(id) {
        popup.classList.toggle('open')
        findPopupItem(id)
    }

    // EVENTOS NA POPUP
    function popupEvents(e){
        if(myRecipes.className !== 'myRecipes'){
            popup.classList.toggle('open');
        }
        if(e.target.id === 'submitAddRecipeBtn'){
            e.preventDefault();
            submitNewRecipe();
        }
        if(e.target.id == 'popup'){
            popup.classList.remove('open');
        }
        if(e.target.id === 'submitMyRecipeEditedBtn'){
            submitMyRecipeEdited(e.target.dataset.id);
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

    // PROCURA DO COCKTAIL PELO NOME
    function showCocktailByName(input) {
        cocktailByFilter = cocktails;
        main.className          = 'hide';
        drinkSearch.className   = 'drinks';
        searchFilters.className = 'searchFilters';
        drinkSearch.innerHTML   = ``;
        myRecipes.className     = 'hide';

        if (cocktails != null) {
            viewSearchInnerHtml(cocktails);
        }

        if (cocktails === null) {
            drinkSearch.innerHTML = `<h1>Drink ${input} not found</h1>`;
        }
    }

    // MOSTRAR A PROCURA NO HTML
    function viewSearchInnerHtml(array){
        drinkSearch.innerHTML ='';
        array.map(c => {
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

    // MOSTRAR MYRECIPES

    function showMyRecipes(){
        gridMyRecipes.innerHTML = '';
        myRecipesList.map(r => {
            let {strDrink, strDrinkThumb, strAlcoholic,idDrink} = r;
            
            gridMyRecipes.innerHTML += `
            <article>
                <h2>${strDrink}<h2/>
                <img width=200 src="./../img/${strDrinkThumb}" data-id='${idDrink}'>
                <p> ${strAlcoholic ? 'Alcoholic' : 'Non-Alcoholic'} </p>
                <button class='addToFavouritesBtn' id="editRecipeBtn" data-id='${idDrink}'>Edit</button> 
                <button id="removeRecipeBtn" data-id='${idDrink}'>Remove</button>
            </article>
            `
        })
    }

    // EVENTOS NA GRID DO MY RECIPES
    function gridMyRecipesEvents(e){
        if (e.target.id === 'editRecipeBtn'){
            editRecipe(e.target.dataset.id);
        }
        if (e.target.id === 'removeRecipeBtn'){
           removeRecipeFromMyRecipe(e.target.dataset.id);
        }
        if (e.target.tagName === 'IMG'){
            popupMyRecipeOpen(e.target.dataset.id);
        }
    }

    // POPUP MYRECIPE
    function popupMyRecipeOpen(id){
        let popupCocktail = myRecipesList.filter(c=> c.idDrink == id);
        console.log(popupCocktail)
        popup.classList.toggle('open')
        popupCocktail.map(c => {
            popup.innerHTML = `
            
                <article>
                    
                    <div class="popupText">
                    <img id="imgPopup" src="./img/${c.strDrinkThumb}" alt=""> 
                        <h1>${c.strDrink}</h1>
                        <hr>
                        <h3>Ingredients</h3>
                        <hr>
                        
                        <p>${c.strIngredient1 == null ? '' : c.strIngredient1}</p>
                        <p>${c.strIngredient2 == null ? '' : c.strIngredient2} </p>

                        <hr class='first'>
                        <h3>Instructions</h3>
                        <hr>

                        <p>${c.strInstructions}</p>
                    </div>
                </article>
            `;
        })
       
    }

    // ADICIONAR RECEITA
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

    // ENVIAR DADOS PARA A ARRAY
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
                addAlcoholic,
                addInstructions,
                addImg,
                addIngredient1,
                addIngredient2,
                )
                myRecipesList.push(cocktail);
                formRecipe.reset();
                popup.classList.toggle('open');
                showMyRecipes();
    }

    // ENVIAR DADOS PARA INPUT PARA EDITAR
    function editRecipe(id){
        popup.classList.toggle('open');
        let recipeToBeEdited = myRecipesList.filter(c => c.idDrink == id);
        recipeToBeEdited.map(c => {
            popup.innerHTML = `
                <article>    
                    <div class="popupText">
                        <img id="imgPopup" src="./img/${c.strDrinkThumb}" alt=""> 
                        <hr>
                        <div>
                            <label for='editName'>Name</label>
                            <input type='text' value='${c.strDrink}' id='editName'>
                        </div>
                        <div>
                            <label for='editImg'>Img</label>
                            <input type='text' id='editImg' value='${c.strDrinkThumb}'>
                        </div>
                        <div>
                            <label for='editAlcoholic'>Alcoholic</label>
                            <input type='checkbox' id='editAlcoholic' ${c.strAlcoholic ? 'checked' : ''}>
                        </div>

                        <h3>Ingredients</h3>

                        <div>
                            <label for="editIngredient1">
                            <input value='${c.strIngredient1}' id='editIngredient1'>
                        <div/>

                        <div>
                            <label for="editIngredient2">
                            <input value='${c.strIngredient2}' id='editIngredient2'>
                        <div/>
                        <hr class='first'>

                        <h3>Instructions</h3>
    
                        <div>
                            <label for="editInstructions">
                            <textarea id='editInstructions'>${c.strInstructions}</textarea>
                        <div/>
                        <hr>

                        <button id='submitMyRecipeEditedBtn' data-id='${c.idDrink}'>Submit</button>
                    </div>
                </article>
            `;
        })
    }   

    // ATUALIZAR DADOS EDITADOS NA ARRAY
    function submitMyRecipeEdited(id){
        let editName = document.querySelector('#editName');
        let editInstructions = document.querySelector('#editInstructions');
        let editAlcoholic = document.querySelector('#editAlcoholic');
        let editImg = document.querySelector('#editImg');
        let editIngredient1 = document.querySelector('#editIngredient1');
        let editIngredient2 = document.querySelector('#editIngredient2');
        let updatedRecipe = myRecipesList.map(c => {
            if(c.idDrink == id){
                return {
                    ...c,
                    strDrink: editName.value,
                    strAlcoholic: editAlcoholic.checked,
                    strInstructions: editInstructions.value,
                    strDrinkThumb: editImg.value,
                    strIngredient1: editIngredient1.value,
                    strIngredient2: editIngredient2.value,
                }
            }
            else{
                return c;
            }
        })
        console.log(updatedRecipe);
        myRecipesList = updatedRecipe;
        showMyRecipes();
        popup.classList.toggle('open');
        

    }

    // REMOVER RECEITA
    function removeRecipeFromMyRecipe(id){
        let filteredArray= myRecipesList.filter(c => c.idDrink != id)
        myRecipesList = filteredArray;
        showMyRecipes();
    }

    // ALCOHOLIC DRINKS SECTION
    function showAllAlcoholicDrinks(array){
        let sliceArray= array.slice(0,20);
        sliceArray.map(c => {
            let {strDrink, strDrinkThumb, idDrink} = c;
                alcoholicSection.innerHTML += `
                    <article>
                        <h1>${strDrink}<h1/>
                        <img width=200 src="${strDrinkThumb}" data-id='${idDrink}'>
                        <br>
                        <button class='addToFavouritesBtn' data-id='${idDrink}'>add to favourites</button>
                    </article>
                `;
            })
        
    }

    // NON ALCOHOLIC DRINKS SECTION
    function showAllNonAlcoholicDrinks(array){
        let sliceArray= array.slice(0,20);
        sliceArray.map(c => {
            let {strDrink, strDrinkThumb, idDrink} = c;
                nonAlcoholicSection.innerHTML += `
                    <article>
                        <h1>${strDrink}<h1/>
                        <img width=200 src="${strDrinkThumb}" data-id='${idDrink}'>
                        <br>
                        <button class='addToFavouritesBtn' data-id='${idDrink}'>add to favourites</button>
                    </article>
                `;
            })
    }

    // EVENTOS NA SECTION ALCOHOLIC DRINKS
    function alcoholicEvents(e){
        if (e.target.className == 'addToFavouritesBtn') {
            addToFavourites(e.target.dataset.id);
        }
        if (e.target.tagName === 'IMG'){
            let id= e.target.dataset.id;
            popupOpen(id);
        }
    }

    // EVENTOS NA SECTION NON ALCOHOLIC DRINKS
    function nonAlcoholicEvents(e){
        if (e.target.className == 'addToFavouritesBtn') {
            addToFavourites(e.target.dataset.id);
        }
        if (e.target.tagName === 'IMG'){
            let id= e.target.dataset.id;
            popupOpen(id);
        }
    }
} // FIM INIT
    