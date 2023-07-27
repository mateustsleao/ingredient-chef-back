import { type RecipeModel } from '@/domain/models'
import { type BuildRecipe, type BuildRecipeParams } from '@/domain/use-cases'
import { type HttpRequest } from '@/presentation/protocols'

export class BuildRecipeSpy implements BuildRecipe {
  async build (recipe: BuildRecipeParams): Promise<RecipeModel> {
    return makeFakeResponse()
  }
}

export const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'valid_name',
    ingredients: [{
      description: 'valid_description'
    }],
    meal: 'valid_meal',
    quantity: 0
  }
})

export const makeFakeResponse = (): RecipeModel => ({
  id: 'valid_id',
  name: 'valid_name',
  ingredients: [{
    description: 'valid_description'
  }],
  steps: [{
    step: 'valid_step'
  }],
  nutrition: {
    values: [{
      name: 'valid_nutrition_name'
    }],
    fact: 'valid_nutritionFact'
  },
  portions: 1,
  time: 1
})
