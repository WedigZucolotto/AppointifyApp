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
  const fetchAndSet = async <T>(
    promise: Promise<T>,
    set: (prop: T) => void
  ) => {
    const { data, success } = await fetchData(promise)
    if (data && success) {
      set(data)
    }
  }

  const fetchData = async <T>(promise: Promise<T>): Promise<Response<T>> => {
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
    fetchData,
    fetchAndSet
  }
}
