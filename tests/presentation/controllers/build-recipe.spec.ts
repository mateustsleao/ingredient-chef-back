import { BuildRecipeController } from '../../../src/controller/build-recipe-controller'
import { type RecipeModel } from '../../../src/domain/models/recipe'
import { type BuildRecipe, type BuildRecipeModel } from '../../../src/domain/use-cases/build-recipe'
import { type HttpRequest } from '../protocols/http'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'valid_name',
    ingredients: [{
      description: 'valid_description'
    }],
    meal: 'valid_meal',
    quantity: 1
  }
})

const makeBuildRecipe = (): BuildRecipe => {
  class BuildRecipeStub implements BuildRecipe {
    build (recipe: BuildRecipeModel): RecipeModel {
      return {
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
            nutriente: 'valid_nutriente'
          }],
          fact: 'valid_nutritionFact'
        },
        portions: 1,
        time: 1
      }
    }
  }
  return new BuildRecipeStub()
}

type SutTypes = {
  sut: BuildRecipeController
  buildRecipeStub: BuildRecipe
}

const makeSut = (): SutTypes => {
  const buildRecipeStub = makeBuildRecipe()
  const sut = new BuildRecipeController(buildRecipeStub)
  return {
    sut,
    buildRecipeStub
  }
}
describe('Build Recipe Controller', () => {
  test('Should call BuildRecipe with correct values', () => {
    const { sut, buildRecipeStub } = makeSut()
    const buildRecipeSpy = jest.spyOn(buildRecipeStub, 'build')
    const httpRequest = makeFakeRequest()
    sut.handle(httpRequest)
    expect(buildRecipeSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  test('Should return 200 if valid data is provided', () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
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
          nutriente: 'valid_nutriente'
        }],
        fact: 'valid_nutritionFact'
      },
      portions: 1,
      time: 1
    })
  })
})
