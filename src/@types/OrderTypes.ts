import { AddressTypes } from "./AddressTypes"
import { CartItemTypes } from "./CartItemTypes"
import { OrderStatusTypes } from "./OrderStatusTypes"

export type OrderTypes = {
  id: number
  status: OrderStatusTypes
  orderDate: string
  userId: string
  userName: string
  shippingAddress: AddressTypes
  shippingPrice: number
  paymentType: 'card' | 'money'
  changeValue?: number
  cupom?: string
  cupomDiscount?: number
  products: CartItemTypes[]
  subtotal: number
  total: number
}