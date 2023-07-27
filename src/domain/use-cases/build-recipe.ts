import { type RecipeModel } from '@/domain/models'

export interface BuildRecipe {
  build: (data: BuildRecipeParams) => Promise<RecipeModel>
}

export type BuildRecipeParams = {
  ingredients?: [{
    description: string
  }]
  meal?: string
  quantity: number
}
