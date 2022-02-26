
export class Cocktail{
    constructor(
        strDrink,
        strAlcoholic,
        strInstructions,
        strDrinkThumb,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
    ){
        this.strDrink        = strDrink;
        this.strAlcoholic    = strAlcoholic;
        this.strInstructions = strInstructions;
        this.strDrinkThumb   = strDrinkThumb;
        this.strIngredient1  = strIngredient1;
        this.strIngredient2  = strIngredient2;
        this.strIngredient3  = strIngredient3;
        this.strIngredient4  = strIngredient4;
        this.strIngredient5  = strIngredient5;
        this.strIngredient6  = strIngredient6;
        this.strIngredient7  = strIngredient7;
    }
}

export let cocktails = [];

export let searchByName = (name) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then (response => response.json())
    .then (data => {
        cocktails = data.drinks;
    })
}
