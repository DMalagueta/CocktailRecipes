document.addEventListener('DOMContentLoaded', init, false);
function init() {
    

    ///// VARIAVEIS
    let main = document.getElementById('main')
    let grid = document.querySelector('.drinks');

    // PROCURA PELO INPUT
    let drinkSearch = document.getElementById('drinkSearch');
    let searchInput = document.getElementById('searchInpt');
    let searchFilters = document.getElementById('searchFilters');
    searchFilters.className = 'hide';
    let cocktails = []
    let popularDrink = document.getElementById('popularDrink');
    let popularDrinkText = document.querySelector('.popularDrinks p')
    let popularIngredient = document.getElementById('popularIngredient');
    let popup = document.querySelector('.popup');


    // SLIDESHOW
    let slides = document.getElementsByClassName("slides");
    let slideIndex = 1;
    let prevSlide = document.getElementById('prev');
    let nextSlide = document.getElementById('next');

    ///// EVENTOS
    searchInput.addEventListener('input',searchCocktailByName,false);
    grid.addEventListener('click', gridEvents,false);
    popup.addEventListener('click', popupClose,false);

    prevSlide.addEventListener('click', moveToPrev, false);
    nextSlide.addEventListener('click', moveToNext, false);
    
    ///// FUNCIONALIDADES

    // PROCURA PELO INPUT
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
    function searchCocktailByName(e) {

        if(e.target.value === ''){
            main.className = 'main';
            drinkSearch.className = 'hide';
            searchFilters.className = 'hide';
        }
        else {
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${e.target.value}`)
            .then (response => response.json())
            .then (data => {
                cocktails = data.drinks;
                showCocktailByName();
            })
            .catch (error => drinkSearch.innerHTML = `<h1>Drink ${e.target.value} not found</h1>`)
        }
    }

    function showCocktailByName() {
        main.className = 'hide';
        drinkSearch.className = 'drinks';
        searchFilters.className = 'searchFilters';
        drinkSearch.innerHTML = ``;
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

    // RANDOM IMAGE
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data =>{
        data.drinks.map( c => {
            popularDrink.src = `${c.strDrinkThumb}`
            popularDrinkText.innerHTML = `${c.strDrink}`
        })
    })

    // SLIDESHOW
    showSlides(slideIndex);

    function moveToPrev(){
        showSlides(slideIndex -= 1);
    }

    function moveToNext(){
        showSlides(slideIndex += 1);
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
    }
}