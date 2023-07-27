import { type Validation } from '@/validation/protocols'

export class ValidationSpy implements Validation {
  error: Error | undefined = undefined
  input: any

  validate (input: any): Error | undefined {
    this.input = input
    return this.error
  }
}
