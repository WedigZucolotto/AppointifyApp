export interface ServiceData {
  id: string
  name: string
  interval: string
}

export interface CreateServiceRequest {
  name: string
  interval: string
  companyId: string
}

export type UpdateServiceRequest = Partial<Omit<ServiceData, 'id'>>
