import { Option } from '..'

export interface CompaniesData {
  id: string
  name: string
  planName: string
  open: string
  close: string
}

export interface CompaniesFilter {
  name?: string
  planId?: string
}

export interface CompanyData {
  id: string
  name: string
  planId: string
  open: string
  close: string
}

export interface CreateCompanyRequest {
  name: string
  open: string
  close: string
  planId: string
}

export interface UpdateCompanyRequest {
  name?: string
  open?: string
  close?: string
  planId?: string
}

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
