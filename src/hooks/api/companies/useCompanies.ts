import { useRequest, CompanyData } from '..'

export const useCompanies = () => {
  const { get } = useRequest('companies')

  const getCompanyById = async (id: string): Promise<CompanyData> => {
    const { data } = await get(id)
    return data
  }

  return { getCompanyById }
}
