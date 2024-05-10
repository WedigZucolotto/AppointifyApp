import { useEffect, useState } from 'react'
import { ManagementLayout } from '..'
import { ModalData, ModalTypes, header } from '../util'
import { PlansData, usePlans, useTryCatch } from '../../../hooks'
import {
  ConfirmationModal,
  PlanModal,
  TableItem,
  Visible
} from '../../../components'

export const Plan = () => {
  const [modal, setModal] = useState<ModalData>({ id: '', type: 'closed' })
  const [plans, setPlans] = useState<PlansData[]>([])

  const { getAndSet, fetchWithMessage } = useTryCatch()
  const { getAllPlans, deletePlan } = usePlans()

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = () => getAndSet(getAllPlans(), setPlans)

  const changeModal = (type: ModalTypes, id = '') => setModal({ id, type })

  const handleDelete = async () => {
    await fetchWithMessage(deletePlan(modal.id), 'Deletado com sucesso!')
    fetchPlans()
    changeModal('closed')
  }

  const plansTable = [header.plans, ...plans]

  const mapExtraFields = (showExtraFields: boolean | string) => {
    if (typeof showExtraFields === 'string') {
      return showExtraFields
    }
    return showExtraFields ? 'Sim' : 'Não'
  }

  return (
    <ManagementLayout>
      <h2>Planos</h2>
      <div className="filters">
        <button onClick={() => changeModal('edit')}>Novo Plano</button>
      </div>
      <div className="table">
        {plansTable.map((plan, index) => (
          <TableItem
            handleEdit={() => changeModal('edit', plan.id)}
            handleDelete={() => changeModal('delete', plan.id)}
            showDeleteBtn={index !== 0}
            showEditBtn={index !== 0}
          >
            <span style={{ width: '100px' }}>{plan.name}</span>
            <span style={{ width: '150px' }}>
              {mapExtraFields(plan.showExtraFields)}
            </span>
          </TableItem>
        ))}
      </div>
      <Visible when={plans.length === 0}>
        <span className="notFound">Nenhum registro encontrado.</span>
      </Visible>
      <PlanModal
        open={modal.type === 'edit'}
        fetchPlans={fetchPlans}
        changeModal={changeModal}
        id={modal.id}
      />
      <ConfirmationModal
        open={modal.type === 'delete'}
        handleYes={handleDelete}
        handleNot={() => changeModal('closed')}
      />
    </ManagementLayout>
  )
}
