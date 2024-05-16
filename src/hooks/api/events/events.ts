export interface CreateEventRequest {
  name: string
  contact: string
  date: string
  serviceId: string
  userId: string
}

export interface EventData {
  id: string
  title: string
  description: string
  date: string
  serviceName: string
}
