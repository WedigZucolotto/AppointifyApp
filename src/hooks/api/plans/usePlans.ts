import {
  useRequest,
  Option,
  PlanData,
  CreatePlanRequest,
  UpdatePlanRequest
} from '..'

export const usePlans = () => {
  const { get, post, put, del } = useRequest('plans')

  const getPlanOptions = async (): Promise<Option[]> => {
    const { data } = await get('options')
    return data
  }

  const getPlanById = async (id: string): Promise<PlanData> => {
    const { data } = await get(id)
    return data
  }

  const getAllPlans = async (): Promise<PlanData[]> => {
    const { data } = await get()
    return data
  }

  const createPlan = async (request: CreatePlanRequest): Promise<void> => {
    await post('', request)
  }

  const updatePlan = async (
    id: string,
    request: UpdatePlanRequest
  ): Promise<void> => {
    await put(id, request)
  }

  const deletePlan = async (id: string): Promise<void> => {
    await del(id)
  }

  return {
    getPlanOptions,
    getAllPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan
  }
}
