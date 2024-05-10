import { FieldValues, useForm } from 'react-hook-form'
import {
  useTryCatch,
  PlanData,
  usePlans,
  CreatePlanRequest,
  UpdatePlanRequest
} from '../../../hooks'
import { useEffect, useState } from 'react'
import { ModalTypes } from '../../../pages/management/util'
import { ManagementModal } from '../..'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDefaultValues, getSchema } from './schemas'

interface PlanModalProps {
  open: boolean
  fetchPlans: () => void
  changeModal: (type: ModalTypes) => void
  id: string
}

interface FormData {
  name?: string
  showExtraFields?: boolean
}

export const PlanModal = ({
  open,
  fetchPlans,
  changeModal,
  id = ''
}: PlanModalProps) => {
  const isEdit = !!id

  const [plan, setPlan] = useState<PlanData>()

  const { getAndSet, fetchWithMessage } = useTryCatch()
  const { createPlan, updatePlan, getPlanById } = usePlans()

  useEffect(() => {
    if (isEdit) {
      fetchPlan()
    }
    return () => reset()
  }, [])

  const fetchPlan = () => getAndSet(getPlanById(id), setPlan)

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(getSchema(isEdit)),
    defaultValues: getDefaultValues(plan)
  })

  const handleNewPlan = async (values: FieldValues) => {
    await fetchWithMessage(
      createPlan(values as CreatePlanRequest),
      'Criado com sucesso!'
    )
    fetchPlans()
    changeModal('closed')
  }

  const handleUpdatePlan = async (values: FieldValues) => {
    await fetchWithMessage(
      updatePlan(id, values as UpdatePlanRequest),
      'Editado com sucesso!'
    )
    fetchPlans()
    changeModal('closed')
  }

  return (
    <ManagementModal open={open}>
      <form onSubmit={handleSubmit(isEdit ? handleUpdatePlan : handleNewPlan)}>
        <label>Nome</label>
        <input type="text" placeholder="Nome" {...register('name')} />
        <label>Mostra campos extras?</label>
        <div style={{ display: 'flex', width: '50%' }}>
          <label>Sim</label>
          <input
            type="radio"
            value="true"
            style={{ alignSelf: 'center', marginBottom: 0 }}
            {...register('showExtraFields')}
          />
          <label>Não</label>
          <input
            type="radio"
            value="false"
            style={{ alignSelf: 'center', marginBottom: 0 }}
            {...register('showExtraFields')}
          />
        </div>
        <div className="btns">
          <button onClick={() => changeModal('closed')}>Cancelar</button>
          <button>Enviar</button>
        </div>
      </form>
    </ManagementModal>
  )
}
