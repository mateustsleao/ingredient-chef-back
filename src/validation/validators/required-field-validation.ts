import { type Validation } from '@/validation/protocols'
import { MissingParamError } from '@/presentation/errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error | undefined {
    const isMissingParam = input[this.fieldName] === '' || input[this.fieldName] === undefined || input[this.fieldName] === null
    if (isMissingParam) {
      return new MissingParamError(this.fieldName)
    }
  }
}
