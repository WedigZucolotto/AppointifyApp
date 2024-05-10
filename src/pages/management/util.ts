export interface ModalData {
  id: string
  type: ModalTypes
}

export type ModalTypes = 'edit' | 'delete' | 'closed'

export const header = {
  companies: {
    id: '',
    name: 'Nome',
    planName: 'Plano',
    open: 'Abre',
    close: 'Fecha'
  },
  services: {
    id: '',
    name: 'Nome',
    interval: 'Intervalo'
  },
  events: {
    id: '',
    title: 'Título',
    description: 'Descrição',
    date: 'Data',
    userName: 'Usuário',
    serviceName: 'Serviço'
  },
  users: {
    id: '',
    name: 'Username',
    completeName: 'Nome completo',
    type: 'Tipo',
    companyName: 'Empresa'
  },
  plans: {
    id: '',
    name: 'Nome',
    showExtraFields: 'Habilita campos extras?'
  }
}

export const timeOptions = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00'
]
