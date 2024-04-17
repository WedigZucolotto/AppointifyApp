import { useRequest } from '..'
import { ServicesData } from './Services'

export const useServices = () => {
  const { get } = useRequest('services')

  // const getServiceById = async (id: string): Promise<ServiceData> => {
  //   const { data } = await get(id)
  //   return data
  // }

  const getAllServices = async (companyId: string): Promise<ServicesData[]> => {
    const { data } = await get(`?companyId=${companyId}`)
    return data
  }

  // const createService = async (
  //   request: CreateServiceRequest
  // ): Promise<void> => {
  //   await post('', request)
  // }

  return { getAllServices }
}
