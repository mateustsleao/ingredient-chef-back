export interface RecipeModel {
  id: string
  name: string
  ingredients: [{
    description: string
  }]
  steps: [{
    step: string
  }]
  nutrition: {
    values: [{
      nutriente: string
    }]
    fact: string
  }
  portions: number
  time: number
}
