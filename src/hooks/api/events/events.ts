export interface CreateEventRequest {
  name: string
  contact: string
  date: string
  serviceId: string
  userId: string
}

export interface EventsData {
  id: string
  title: string
  description?: string
  date: string
  userName: string
  serviceName: string
}

export interface EventData {
  id: string
  title: string
  description?: string
  date: string
  serviceName: string
}

export interface EventsFilter {
  companyId?: string
  userId?: string
  title?: string
  date?: string
  serviceName?: string
}
