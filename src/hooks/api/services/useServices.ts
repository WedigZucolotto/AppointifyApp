import {
  useRequest,
  ServiceData,
  CreateServiceRequest,
  UpdateServiceRequest
} from '..'

export const useServices = () => {
  const { get, post, put, del } = useRequest('services')

  const getServiceById = async (id: string): Promise<ServiceData> => {
    const { data } = await get(id)
    return data
  }

  const createService = async (
    request: CreateServiceRequest
  ): Promise<void> => {
    await post('', request)
  }

  const updateService = async (
    id: string,
    request: UpdateServiceRequest
  ): Promise<void> => {
    await put(id, request)
  }

  const deleteService = async (id: string): Promise<void> => {
    await del(id)
  }

  return {
    getServiceById,
    createService,
    updateService,
    deleteService
  }
}
