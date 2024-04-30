import {
  useRequest,
  CompanyData,
  CreateCompanyRequest,
  CompaniesData,
  UpdateCompanyRequest,
  CompanyScheduleData,
  AvailableTime
} from '..'

export const useCompanies = () => {
  const { get, post, put, del } = useRequest('companies')

  const getAllCompanies = async (): Promise<CompaniesData[]> => {
    const { data } = await get()
    return data
  }

  const getAvailableTimes = async (
    id: string,
    date: string,
    serviceId: string,
    userId?: string
  ): Promise<AvailableTime[]> => {
    const partes = date.split('/')
    const dateFormated = partes[0] + '%2F' + partes[1] + '%2F' + partes[2]
    console.log(dateFormated)
    const { data } = await get(
      `${id}/available-times?Date=${dateFormated}&ServiceId=${serviceId}`
    )
    return data
  }

  const getCompanyById = async (id: string): Promise<CompanyData> => {
    const { data } = await get(id)
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

  //TODO: availableTimes

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
    createCompany,
    deleteCompany,
    updateCompany,
    getAvailableTimes
  }
}
