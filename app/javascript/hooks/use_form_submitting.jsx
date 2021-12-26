import { useCallback, useState } from 'react'

export default function useFormSubmitting() {
  const [submitting, setSubmitting] = useState(false)

  const callback = useCallback((formElement) => {
    if (formElement === null) return

    formElement.addEventListener('turbo:submit-start', () => setSubmitting(true))
    formElement.addEventListener('turbo:submit-end', () => setSubmitting(false))
  }, [setSubmitting])

  return [callback, submitting, setSubmitting]
}
