import { useRequest, Option } from '..'

export const usePlans = () => {
  const { get } = useRequest('plans')

  const getPlanOptions = async (): Promise<Option[]> => {
    const { data } = await get('options')
    return data
  }

  return { getPlanOptions }
}
