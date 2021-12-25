import { useCallback } from 'react'

// `trigger` refers to: https://react-hook-form.com/api/useform/trigger
// It returns a form ref that should be attached to a <form> tag
export default function useStopFormSubmissionOnClientSideValidationFailed(trigger) {
  return useCallback((formElement) => {
    if (formElement === null) return

    formElement.addEventListener('turbo:submit-start', async (event) => {
      const valid = await trigger()
      if (valid) return

      event.detail.formSubmission.stop()
    })
  }, [trigger])
}
