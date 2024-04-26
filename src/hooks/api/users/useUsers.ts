import useSignIn from 'react-auth-kit/hooks/useSignIn'
import {
  CreateUserRequest,
  LoginRequest,
  LoginResponse,
  UpdateUserRequest,
  UserData,
  useRequest,
  UsersData
} from '..'

export const useUsers = () => {
  const { get, post, put, del } = useRequest('users')
  const signIn = useSignIn()

  const login = async (request: LoginRequest): Promise<LoginResponse> => {
    const { data } = await post('login', request)
    signInUser(data)
    return data
  }

  const getAllUsers = async (
    name = '',
    completeName = '',
    type = '',
    companyId = ''
  ): Promise<UsersData[]> => {
    const { data } = await get(
      `?name=${name}&completeName=${completeName}&type=${type}&companyId=${companyId}`
    )
    return data
  }

  const getUserById = async (id: string): Promise<UserData> => {
    const { data } = await get(id)
    return data
  }

  const createUser = async (request: CreateUserRequest): Promise<void> => {
    await post('', request)
  }

  const updateUser = async (
    id: string,
    request: UpdateUserRequest
  ): Promise<void> => {
    await put(id, request)
  }

  const deleteUser = async (id: string): Promise<void> => {
    await del(id)
  }

  const signInUser = (data: LoginResponse) =>
    signIn({
      auth: {
        token: data.token,
        type: 'Bearer'
      },
      userState: data.id
    })

  return {
    login,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  }
}
