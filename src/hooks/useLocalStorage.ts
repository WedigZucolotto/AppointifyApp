import { useEffect, useState } from 'react'

interface LocalStorageProps {
  key?: string
}

export const useLocalStorage = ({ key = '' }: LocalStorageProps) => {
  const [hasKey, setHasKey] = useState<boolean>(false)

  useEffect(() => {
    verifyStorage()
  }, [])

  const getStorage = (key: string) => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : ''
  }

  const setStorage = (key: string, value: any) => {
    const now = new Date()
    now.setHours(now.getHours() + 24)
    localStorage.setItem(key, JSON.stringify({ value, expirationDate: now }))
  }

  const verifyStorage = () => {
    const item = localStorage.getItem(key)

    if (!item) {
      return
    }

    const parsedItem = JSON.parse(item)
    const now = new Date(Date.now())
    const expirationDate = new Date(parsedItem.expirationDate)

    if (now > expirationDate) {
      localStorage.removeItem(key)
      return
    }
    setHasKey(true)
  }

  return { hasKey, getStorage, setStorage }
}
