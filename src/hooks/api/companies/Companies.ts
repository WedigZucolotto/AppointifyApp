import { Option } from '..'

export interface CompanyData {
  id: string
  name: string
  planId: string
  open: string
  close: string
}

export type UpdateCompanyRequest = Partial<Omit<CompanyData, 'id'>>

export interface CompanyScheduleData {
  minDate: string
  maxDate: string
  unavailableDates: string[]
  showExtraFields: boolean
  services: Option[]
}

export interface AvailableTime {
  time: string
  userId: string
}
