import { useEffect } from 'react'
import { useToasterStore } from 'react-hot-toast'
import toast from 'react-hot-toast'

export const useToastLimit = (limit: number): void => {
  const { toasts } = useToasterStore()
  
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .forEach((t, i) => {
        if (i >= limit) {
          toast.dismiss(t.id)
        }
      })
  }, [toasts, limit])
} 