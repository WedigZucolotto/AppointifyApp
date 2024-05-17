export const Services = () => {
  return (
    <div>Services</div>
  )
}

// import { useEffect, useState } from 'react'
// import { Button, Header } from '../../components'
// import * as S from './style'
// import { NewService } from '../../components/modals/newService/NewService'
// import { Row } from '../../components/row/Row'
// import { Add } from '@mui/icons-material'
// import {
//   ServiceData,
//   useCompanies,
//   useServices,
//   useTryCatch
// } from '../../hooks'
// import { ModalData, ModalTypes } from '../management/util'
// import { useParams } from 'react-router-dom'

// export const Services = () => {
//   const [modal, setModal] = useState<ModalData>({ id: '', type: 'closed' })
//   const [services, setServices] = useState<ServiceData[]>([])

//   const { getAndSet, fetchWithMessage } = useTryCatch()
//   const { deleteService } = useServices()
//   const { getCompanyServices } = useCompanies()

//   const { companyId = '' } = useParams()

//   useEffect(() => {
//     fetchServices(companyId)
//     getAndSet(getCompanyServices(companyId), setServices)
//   }, [])

//   const fetchServices = (companyId: string) =>
//     getAndSet(getCompanyServices(companyId), setServices)

//   const handleDelete = async () => {
//     await fetchWithMessage(deleteService(modal.id), 'Deletado com sucesso!')
//     fetchServices(companyId)
//     //changeModal('closed')
//   }

//   //const changeModal = (type: ModalTypes, id = '') => setModal({ id, type })

//   return (
//     <>
//       <Header isCalendar={false} />
//       <S.Services>
//         <S.Title>Serviços</S.Title>
//         <Button type="newEvent" onClick={() => changeModal('edit')}>
//           <Add fontSize="large" />
//           <span>Novo serviço</span>
//         </Button>
//         {services.map((service) => (
//           <Row
//             key={service.id}
//             name={service.name}
//             interval={service.interval}
//             handleEdit={() => changeModal('edit', service.id)}
//             handleDelete={() => changeModal('delete', service.id)}
//           />
//         ))}
//       </S.Services>
//       <NewService
//         open={modal.type === 'edit'}
//         id={modal.id}
//         onClose={() => changeModal('closed')}
//         fetchServices={fetchServices}
//         changeModal={changeModal}
//       />
//       <ConfirmationModal
//         open={modal.type === 'delete'}
//         handleYes={handleDelete}
//         handleNot={() => changeModal('closed')}
//       />
//     </>
//   )
// }
