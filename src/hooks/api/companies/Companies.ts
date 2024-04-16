import { Option } from '..'

export interface CompanyData {
  minDate: string
  maxDate: string
  unavailableDates: string[]
  showExtraFields: boolean
  services: Option[]
}

export interface CompaniesData {
  id: string
  name: string
  planName: string
  open: string
  close: string
}

export interface CreateCompanyRequest {
  name: string
  open: string
  close: string
  planId: string
}
