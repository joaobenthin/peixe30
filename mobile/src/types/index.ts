export interface Contact {
  id: string
  firstName: string
  lastName: string
  phone: string
  birthdate: string
  address: string
  email: string
}

export interface ContactResponse {
  contacts: Contact[]
}

export interface AuthResponse {
  access_token: string
}
