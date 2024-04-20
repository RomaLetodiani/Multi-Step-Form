export interface addOnI {
  name: string
  price: number
  description: string
}

export interface subscriptionI {
  name: 'arcade' | 'advanced' | 'pro' // Assuming you have an enum for valid plan types
  type: 0 | 1 // Monthly or Yearly plan type
  monthlyPrice: number
  addOns: addOnI[] // Assuming an AddOn objects with details
  active: boolean
  user: string
  expiresAt: string
}

export interface userI {
  username: string
  email: string
  password: string
  verified: boolean
  subscription: subscriptionI | null
}
