export interface Person {
  id: string
  firstName: string
  lastName: string
  grade: string
  section: string
  registeredAt: Date
  hasServiceBooklet: boolean
}

export interface Section {
  name: string
  createdAt: Date
}
