import { AxiosError } from 'axios'
import { useSnackbarContext } from '..'

interface ErrorResponse {
  Title: string
  Status: number
  Errors: string[]
}

interface Response<T> {
  success?: boolean
  data?: T | null
}

export const useTryCatch = () => {
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext()

  const getAndSet = async <T>(get: Promise<T>, set: (prop: T) => void) => {
    const { data, success } = await callApi(get)
    if (data && success) {
      set(data)
      return { data, success }
    }
  }

  const fetchWithMessage = async <T>(promise: Promise<T>, message: string) => {
    const { success } = await callApi(promise)
    if (success) {
      showSuccessSnackbar(message)
      return { success }
    }
  }

  const callApi = async <T>(promise: Promise<T>): Promise<Response<T>> => {
    try {
      const data = await promise
      return { data, success: true }
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      const response = axiosError?.response?.data as ErrorResponse
      showErrorSnackbar(response.Errors[0])
      return { data: null, success: false }
    }
  }

  return {
    callApi,
    getAndSet,
    fetchWithMessage
  }
}
