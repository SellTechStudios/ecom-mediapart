export type P24PaymentMethodsResponse = {
  data: P24PaymentMethod[]
}

export type P24PaymentMethod = {
  id: number
  imgUrl: string
  mobileImgUrl?: string
  name: string
  status: boolean
}
