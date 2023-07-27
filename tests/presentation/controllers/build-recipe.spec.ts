import { BuildRecipeController } from '@/presentation/controller'
import { ValidationSpy, BuildRecipeSpy, makeFakeRequest, makeFakeResponse } from '@/tests/presentation/mocks'
import { ok, serverError } from '@/presentation/helpers'

type SutTypes = {
  sut: BuildRecipeController
  validationSpy: ValidationSpy
  buildRecipeSpy: BuildRecipeSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const buildRecipeSpy = new BuildRecipeSpy()

  const sut = new BuildRecipeController(buildRecipeSpy, validationSpy)
  return {
    sut,
    validationSpy,
    buildRecipeSpy
  }
}

describe('Build Recipe Controller', () => {
  test('Should call BuildRecipe with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(makeFakeResponse()))
  })
  test('Should return 500 if BuildRecipe throws', async () => {
    const { sut, buildRecipeSpy } = makeSut()
    jest.spyOn(buildRecipeSpy, 'build').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: validationSpy.error
    })
  })
})
