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