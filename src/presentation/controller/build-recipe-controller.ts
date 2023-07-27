import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { type BuildRecipe } from '@/domain/use-cases'
import { type Validation } from '@/validation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers'

export class BuildRecipeController implements Controller {
  constructor (
    private readonly buildRecipe: BuildRecipe,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      const isError = error !== null && error !== undefined
      if (isError) {
        return badRequest(error)
      }
      const recipe = await this.buildRecipe.build(httpRequest.body)
      return ok(recipe)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
