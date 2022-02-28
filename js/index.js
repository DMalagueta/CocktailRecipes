import { Cocktail, searchByName, cocktails, findById, myFavouritesFound,whenFavouriteRemoved, popupItem, findPopupItem, randomDrink, randomDrinkArray} from "./data.js";


document.addEventListener('DOMContentLoaded', init, false);
function init() {
    
    ///// VARIAVEIS

    // GLOBAIS
    let main = document.getElementById('main');
    let nav = document.querySelector('nav');
    let grid = document.querySelector('.drinks');
    

    let myFavourites = document.getElementById('myFavourites');
    let gridFavourites = document.querySelector('.myFavourites');
    myFavourites.className = 'hide';

    let myRecipes = document.getElementById('myRecipes');
    myRecipes.className = 'hide';


    // PAGINA INICIAL
    let popularDrink = document.getElementById('popularDrink');
    let popularDrinkText = document.querySelector('.popularDrinks p');

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
    popup.addEventListener('click', popupClose,false);
    gridFavourites.addEventListener('click', myFavouritesEvents,false);
    slideshow.addEventListener('click', slideshowEvents,false);

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