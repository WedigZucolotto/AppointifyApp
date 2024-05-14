import { useRequest } from '../base/useRequest'
import {
  CreateEventRequest,
  EventData,
  EventsData,
  EventsFilter
} from './events'

export const useEvents = () => {
  const { post, get, del } = useRequest('events')

  const getAllEvents = async (filter: EventsFilter): Promise<EventsData[]> => {
    const {
      companyId = '',
      userId = '',
      title = '',
      date = '',
      serviceName = ''
    } = filter

    const { data } = await get(
      `?userId=${userId}&title=${title}&date=${date}&serviceName=${serviceName}`
    )
    return data
  }

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
    getAllEvents,
    getEventById,
    createEvent,
    deleteEvent
  }
}
