import { type Validation } from '@/validation/protocols'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {
    this.validations = validations
  }

  validate (input: any): Error | undefined {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error != null) {
        return error
      }
    }
  }
}
