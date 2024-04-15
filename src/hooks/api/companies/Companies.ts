
export interface CompanyData {
  minDate: string
  maxDate: string
  unavailableDates: string[]
  showExtraFields: boolean
  services: ServiceData[]
}

interface ServiceData {
  id: string
  name: string
}
