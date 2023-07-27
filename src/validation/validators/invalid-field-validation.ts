import { type Validation } from '@/validation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class InvalidFieldValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly validValues: string[]) { }

  validate (input: any): Error | undefined {
    const isInvalidValue = !this.validValues.includes(input[this.fieldName])
    if (isInvalidValue) {
      return new InvalidParamError(this.fieldName, input[this.fieldName])
    }
  }
}
