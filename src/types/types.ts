export type RecipeData = {
    title: string,
    analyzedInstructions: Instruction[],
    extendedIngredients: Ingredients[],
    image: string,
    summary: string
}

export type Instruction = {
    name: string,
    steps: Step[]
}
export type Ingredients = {
    original: string,
}

export type Step = {
    number: number,
    step: string,
    name: string
}


export type KeyProp = {
    index: number,
    id: number,
    readyIn: number,
    title: string,
    image: string,
    nutrition: Nutrients[],
    ingredients: Ingredients[],
}

export type Nutrients = {
    name: string,
    amount: number
}