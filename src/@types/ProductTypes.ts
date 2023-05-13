import { CategoryTypes } from "./CategoryTypes"

export type ProductTypes = {
  id: number
  imagem: string
  category: CategoryTypes
  name: string
  description?: string
  price: number
}