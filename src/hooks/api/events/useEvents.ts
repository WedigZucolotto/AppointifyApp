import { useRequest } from '../base/useRequest'
import { CreateEventRequest } from './events'

export const useEvents = () => {
  const { post } = useRequest('events')

  const createEvents = async (request: CreateEventRequest): Promise<void> => {
    await post('', request)
  }

  return {
    createEvents
  }
}
