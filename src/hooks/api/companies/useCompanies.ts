import {
  useRequest,
  CompanyData,
  CreateCompanyRequest,
  CompaniesData
} from '..'

export const useCompanies = () => {
  const { get, post } = useRequest('companies')

  const getCompanyById = async (id: string): Promise<CompanyData> => {
    const { data } = await get(id)
    return data
  }

  const getAllCompanies = async (): Promise<CompaniesData[]> => {
    const { data } = await get()
    return data
  }

  const createCompany = async (
    request: CreateCompanyRequest
  ): Promise<void> => {
    await post('', request)
  }

  return { getCompanyById, getAllCompanies, createCompany }
}
