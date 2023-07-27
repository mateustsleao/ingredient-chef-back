export class InvalidParamError extends Error {
  constructor (paramName: string, paramValue: string) {
    super(`The ${paramValue} value is not allowed for the ${paramName} parameter`)
    this.name = 'InvalidParamError'
  }
}
