import { useRequest } from '../base/useRequest'
import { CreateEventRequest, EventData } from './events'

export const useEvents = () => {
  const { post, get, del } = useRequest('events')

  const getEventById = async (id: string): Promise<EventData> => {
    const { data } = await get(id)
    return data
  }

  const createEvent = async (request: CreateEventRequest): Promise<void> => {
    await post('', request)
  }

  const deleteEvent = async (id: string): Promise<void> => {
    await del(id)
  }

  return {
    getEventById,
    createEvent,
    deleteEvent
  }
}
