import axios, { AxiosResponse } from 'axios'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

export const useRequest = (baseURL: string) => {
  const authHeader = useAuthHeader()

  const instance = axios.create({
    baseURL: 'https://appointifyapi.onrender.com/api/', // TODO: variável de ambiente
    headers: {
      Authorization: authHeader
    }
  })

  const buildUrl = (url: string) => `${baseURL}/${url}`

  return {
    get: async <T = any>(url: string = ''): Promise<AxiosResponse<T>> =>
      await instance.get(buildUrl(url)),

    del: async <T = any>(url: string = ''): Promise<AxiosResponse<T>> =>
      await instance.delete(buildUrl(url)),

    put: async <T = any>(
      url: string = '',
      request?: any
    ): Promise<AxiosResponse<T>> => await instance.put(buildUrl(url), request),

    post: async <T = any>(
      url: string = '',
      request: any
    ): Promise<AxiosResponse<T>> => await instance.post(buildUrl(url), request)
  }
}
