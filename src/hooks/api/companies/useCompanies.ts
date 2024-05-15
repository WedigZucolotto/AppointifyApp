import {
  useRequest,
  CompanyData,
  UpdateCompanyRequest,
  CompanyScheduleData,
  AvailableTime
} from '..'

export const useCompanies = () => {
  const { get, put } = useRequest('companies')

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

  const updateCompany = async (
    id: string,
    request: UpdateCompanyRequest
  ): Promise<void> => {
    await put(id, request)
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
    updateCompany,
    getAvailableTimes
  }
}
