export interface ServicesData {
  id: string
  name: string
  interval: string
}

export interface ServicesFilter {
  companyId?: string
  name?: string
}

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

export interface UpdateServiceRequest {
  name?: string
  interval?: string
}
