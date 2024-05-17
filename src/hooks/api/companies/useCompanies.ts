import {
  useRequest,
  CompanyData,
  CreateCompanyRequest,
  CompaniesData,
  UpdateCompanyRequest,
  CompanyScheduleData,
  AvailableTime,
  CompaniesFilter,
  ServiceData
} from '..'

export const useCompanies = () => {
  const { get, post, put, del } = useRequest('companies')

  const getAllCompanies = async (
    filter: CompaniesFilter
  ): Promise<CompaniesData[]> => {
    const { name = '', planId = '' } = filter
    const { data } = await get(`?name=${name}&planId=${planId}`)
    return data
  }

  const getAvailableTimes = async (
    id: string,
    date: string,
    serviceId: string,
    userId = ''
  ): Promise<AvailableTime[]> => {
    const { data } = await get(
      `${id}/available-times?Date=${date}&ServiceId=${serviceId}&UserId=${userId}`
    )
    return data
  }

  const getCompanyById = async (id: string): Promise<CompanyData> => {
    const { data } = await get(id)
    return data
  }

  const getCompanyServices = async (id: string): Promise<ServiceData[]> => {
    const { data } = await get(`${id}/services`)
    return data
  }

  const createCompany = async (
    request: CreateCompanyRequest
  ): Promise<void> => {
    await post('', request)
  }

  const updateCompany = async (
    id: string,
    request: UpdateCompanyRequest
  ): Promise<void> => {
    await put(id, request)
  }

  const deleteCompany = async (id: string): Promise<void> => {
    await del(id)
  }

  const getCompanySchedule = async (
    id: string
  ): Promise<CompanyScheduleData> => {
    const { data } = await get(`${id}/to-schedule`)
    return data
  }

  return {
    getCompanyById,
    getCompanySchedule,
    getAllCompanies,
    getCompanyServices,
    createCompany,
    deleteCompany,
    updateCompany,
    getAvailableTimes
  }
}
