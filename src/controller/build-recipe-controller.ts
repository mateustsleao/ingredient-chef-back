import { type HttpRequest, type HttpResponse } from '../../tests/presentation/protocols/http'
import { type BuildRecipe } from '../domain/use-cases/build-recipe'

export class BuildRecipeController {
  constructor (private readonly buildRecipe: BuildRecipe) { }
  handle (httpRequest: HttpRequest): HttpResponse {
    const recipe = this.buildRecipe.build(httpRequest.body)
    return {
      statusCode: 200,
      body: recipe
    }
  }
}
