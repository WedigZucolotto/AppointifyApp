import { AxiosError } from 'axios'

// interface ErrorResponse {
//   Title: string
//   Status: number
//   Errors: string[]
// }

interface Response<T> {
  success?: boolean
  data?: T | null
}

export const useTryCatch = () => {
  const getAndSet = async <T>(get: Promise<T>, set: (prop: T) => void) => {
    const { data, success } = await callApi(get)
    if (data && success) {
      set(data)
    }
  }

  const sendAndGet = async <T, U>(
    send: Promise<T>,
    get: Promise<U>,
    set: (prop: U) => void
  ) => {
    const { success } = await callApi(send)

    if (success) {
      getAndSet(get, set)
    }
  }

  const callApi = async <T>(promise: Promise<T>): Promise<Response<T>> => {
    try {
      const data = await promise
      return { data, success: true }
    } catch (error: unknown) {
      //   const axiosError = error as AxiosError
      //   const response = axiosError?.response?.data as ErrorResponse
      //   showErrorSnackbar(response.Errors[0])
      return { data: null, success: false }
    }
  }

  return {
    callApi,
    getAndSet,
    sendAndGet
  }
}
