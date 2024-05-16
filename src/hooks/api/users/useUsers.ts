import useSignIn from 'react-auth-kit/hooks/useSignIn'
import {
  LoginRequest,
  LoginResponse,
  UpdateUserRequest,
  UserData,
  UserDayWeek,
  useRequest,
  UserMonth
} from '..'

export const useUsers = () => {
  const { get, post, put } = useRequest('users')
  const signIn = useSignIn()

  const login = async (request: LoginRequest): Promise<LoginResponse> => {
    const { data } = await post('login', request)
    signInUser(data)
    return data
  }

  const getUserById = async (id: string): Promise<UserData> => {
    const { data } = await get(id)
    return data
  }

  const updateUser = async (
    id: string,
    request: UpdateUserRequest
  ): Promise<void> => {
    await put(id, request)
  }

  const signInUser = (data: LoginResponse) =>
    signIn({
      auth: {
        token: data.token,
        type: 'Bearer'
      },
      userState: {
        id: data.id,
        completeName: data.completeName,
        companyId: data.companyId
      }
    })

  const getUserDay = async (id: string, date: string): Promise<UserDayWeek> => {
    const { data } = await get(`${id}/day?date=${date}`)
    return data
  }

  const getUserWeek = async (
    id: string,
    date: string
  ): Promise<UserDayWeek[]> => {
    const { data } = await get(`${id}/week?date=${date}`)
    return data
  }

  const getUserMonth = async (
    id: string,
    date: string
  ): Promise<UserMonth[]> => {
    const { data } = await get(`${id}/month?date=${date}`)
    return data
  }

  return {
    login,
    getUserById,
    updateUser,
    getUserDay,
    getUserWeek,
    getUserMonth
  }
}
