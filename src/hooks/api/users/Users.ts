export type UserType = 'Admin' | 'Owner' | 'Employee'

export interface LoginRequest {
  name: string
  password: string
}

export interface LoginResponse {
  token: string
  id: string
}

export interface UsersData {
  id: string
  name: string
  completeName: string
  type: UserType
  companyName: string
}

export interface UserData {
  id: string
  name: string
  completeName: string
  type: UserType
  companyId: string
}

export interface CreateUserRequest {
  name: string
  password: string
  completeName: string
  companyId: string
  isOwner: boolean
}

export interface UpdateUserRequest {
  name?: string
  password?: string
  completeName?: string
}
