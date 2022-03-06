
export class Cocktail{
    constructor(
        idDrink,
        strDrink,
        strAlcoholic,
        strInstructions,
        strDrinkThumb,
        strIngredient1,
        strIngredient2
    ){
        this.idDrink         = idDrink;
        this.strDrink        = strDrink;
        this.strAlcoholic    = strAlcoholic;
        this.strInstructions = strInstructions;
        this.strDrinkThumb   = strDrinkThumb;
        this.strIngredient1  = strIngredient1;
        this.strIngredient2  = strIngredient2;
    }
}

export let myCocktailRecipes = [
    {
        idDrink: 1,
        strDrink: "Pina Colada à la Diego",
        strAlcoholic: true,
        strInstructions: "Misturar tudo e voilá",
        strDrinkThumb: 'pinacolada.jpeg',
        strIngredient1: 'Absinto',
        strIngredient2: 'Malibu'
    }
]