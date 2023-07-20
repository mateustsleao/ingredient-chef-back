import { type RecipeModel } from '../models/recipe'

export interface BuildRecipeModel {
  name: string
  ingredients: [{
    description: string
  }]
  meal: string
  quantity: number
}

export interface BuildRecipe {
  build: (recipe: BuildRecipeModel) => RecipeModel
}
