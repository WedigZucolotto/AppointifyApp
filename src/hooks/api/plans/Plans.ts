export interface PlanData {
  id: string
  name: string
  showExtraFields: boolean
}

export interface PlansData {
  id: string
  name: string
  showExtraFields: boolean
}

export interface CreatePlanRequest {
  name: string
  showExtraFields: boolean
}

export interface UpdatePlanRequest {
  name?: string
  showExtraFields?: boolean
}
