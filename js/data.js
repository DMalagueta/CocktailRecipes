export let cocktails = [];
export let myFavouritesFound = [];
export let randomDrinkArray = [];
export let popupItem = [];
export let alcoholicDrinksData = [];
export let nonAlcoholicDrinksData = [];

// FETCH PROCURA PELO NOME
export let searchByName = (name) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then (response => response.json())
    .then (data => {
        cocktails = data.drinks;
    })
}

// FETCH PROCURA PELO ID PARA OS FAVORITOS
export let findById = (id) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then (response => response.json())
    .then (data => {

        data.drinks.map(c => {
            myFavouritesFound.push({
                idDrink: c.idDrink,
                strDrink: c.strDrink,
                strAlcoholic: c.strAlcoholic,
                strDrinkThumb: c.strDrinkThumb
            })
        })
        
    })
}

// FUNCAO PARA ATUALIZAR ARRAY
export let whenFavouriteRemoved = () => {myFavouritesFound = []};

// FETCH PARA GALERIA DE IMAGENS
export let randomDrink = (slide) => {
    
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data =>{ 
        data.drinks.map(c =>{
            slide.innerHTML += `
            <div class="imgColumn">
                <img src="${c.strDrinkThumb}" data-name='${c.strDrink}'>
            </div>
            `;
            })
        })

}

// FETCH PARA ENVIAR DADOS PARA A POPUP
export let findPopupItem = (id) => {
    popup.innerHTML ='';
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then (response => response.json())
    .then (data => {
       
        data.drinks.map(c => {
            popup.innerHTML = `
            
            <article>
                  
                <div class="popupText">
                <img id="imgPopup" src="${c.strDrinkThumb}" alt=""> 
                    <h1>${c.strDrink}</h1>
                    <hr>
                    <h3>Ingredients</h3>
                    <hr>
                    
                    <p>${c.strIngredient1 == null ? '' : c.strIngredient1}</p>
                    <p>${c.strIngredient2 == null ? '' : c.strIngredient2} </p>
                    <p>${c.strIngredient3 == null ? '' : c.strIngredient3}</p>
                    <p>${c.strIngredient4 == null ? '' : c.strIngredient4}</p>

                    <hr class='first'>
                    <h3>Instructions</h3>
                    <hr>

                    <p>${c.strInstructions}</p>
                </div>
            </article>
            `; 
        
    })
})
}

// FETCH PARA A SECTION ALCOHOLIC
export let alcoholicDrinksFetch = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
        .then(response => response.json())
        .then(data => {
            alcoholicDrinksData = data.drinks;
        })
}

// FETCH PARA A SECTION NON ALCOHOLIC 
export let nonAlcoholicDrinksFetch = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
    .then(response => response.json())
    .then(data =>{
        nonAlcoholicDrinksData = data.drinks;
    })
}