import { useEffect, useState } from 'react'
import { Button, ConfirmationModal, Header, Visible } from '../../components'
import * as S from './style'
import { NewService } from '../../components/modals/newService/NewService'
import { Row } from '../../components/row/Row'
import { Add } from '@mui/icons-material'
import {
  ServiceData,
  useCompanies,
  useServices,
  useTryCatch
} from '../../hooks'
import { useParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

export type ModalTypes = 'edit' | 'delete' | 'closed'

interface ModalData {
  id: string
  type: ModalTypes
}

export const Services = () => {
  const [modal, setModal] = useState<ModalData>({ id: '', type: 'closed' })
  const [services, setServices] = useState<ServiceData[]>([])

  const { getAndSet, fetchWithMessage } = useTryCatch()
  const { deleteService } = useServices()
  const { getCompanyServices } = useCompanies()

  const { companyId = '' } = useParams()

  useEffect(() => {
    fetchServices(companyId)
  }, [])

  const fetchServices = (companyId: string) =>
    getAndSet(getCompanyServices(companyId), setServices)

  const handleDelete = async () => {
    await fetchWithMessage(deleteService(modal.id), 'Deletado com sucesso!')
    fetchServices(companyId)
    changeModal('closed')
  }

  const changeModal = (type: ModalTypes, id = '') => setModal({ id, type })

  return (
    <>
      <Header isCalendar={false} />
      <S.Services>
        <S.Title>Serviços</S.Title>
        <S.Button>
          <Button type="newEvent" onClick={() => changeModal('edit')}>
            <Add fontSize="large" />
            <span>Novo serviço</span>
          </Button>
        </S.Button>
        <S.Content $isLoading={!services.length}>
          <Visible when={!services.length}>
            <CircularProgress />
          </Visible>
          {services.map((service) => (
            <Row
              key={service.id}
              name={service.name}
              interval={service.interval}
              handleEdit={() => changeModal('edit', service.id)}
              handleDelete={() => changeModal('delete', service.id)}
            />
          ))}
        </S.Content>
      </S.Services>
      <NewService
        open={modal.type === 'edit'}
        id={modal.id}
        onClose={() => changeModal('closed')}
        fetchServices={fetchServices}
        changeModal={changeModal}
      />
      <ConfirmationModal
        open={modal.type === 'delete'}
        handleYes={handleDelete}
        handleNot={() => changeModal('closed')}
      />
    </>
  )
}
