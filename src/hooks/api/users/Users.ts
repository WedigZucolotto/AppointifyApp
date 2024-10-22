export type UserType = 'Admin' | 'Owner' | 'Employee'

export interface LoginRequest {
  name: string
  password: string
}

export interface LoginResponse {
  token: string
  completeName: string
  companyId: string
  id: string
  isOwner: boolean
}

export interface UserData {
  id: string
  name: string
  completeName: string
}

export interface UpdateUserRequest {
  name?: string
  password?: string
  completeName?: string
}

export interface UserDayWeek {
  day: string
  week: string
  events: UserEvents
  isPastDate: boolean
}

type UserEvents = { [K in string]: UserEvent[] }

export interface UserEvent {
  id: string
  title: string
  time: string
}

export interface UserMonth {
  day: string
  week: string
  events: UserEvent[]
  isPastDate: boolean
  more?: number
}
