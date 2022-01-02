import { Controller as ReactHookFormController, useForm } from 'react-hook-form'
import composeRefs from '@seznam/compose-react-refs'
import { useEffect } from 'react'

import isBlank from '/utils/is_blank'
import useFormSubmitting from '/hooks/use_form_submitting'
import useStopFormSubmissionOnClientSideValidationFailed from
  '/hooks/use_stop_form_submission_on_client_side_validation_failed'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

import AuthenticityTokenField from '/components/application/_authenticity_token_field'

import { adminSocialAccountPath, adminSocialAccountsPath } from '/routes'

function FormController(props) {
  const { control, defaultValue, inputName, label, name, rules } = props

  return (
    <ReactHookFormController
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={rules}
      render={({
        'field': { 'name': fieldName, onBlur, onChange, ref, value },
        'fieldState': { error, invalid }
      }) => {
        return (
          <TextField
            fullWidth
            name={inputName ?? fieldName}
            inputRef={ref}
            margin="dense"
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={invalid}
            helperText={error?.message}
          />
        )
      }}
    />
  )
}

function useHandleReactActionChangeAddErrors(setError) {
  useEffect(() => {
    const handleReactActionChange = ({ 'detail': { payload, type } }) => {
      if (type !== 'social_account_form_add_errors') return

      const errors = payload

      errors.forEach(({ 'attribute': errorAttribute, 'type': errorType }) => {
        if (errorAttribute === 'name' && errorType === 'taken') {
          setError('social_account[name]', { 'message': 'You suck at naming stuff', 'type': 'taken' })
        }
      })
    }

    document.addEventListener('reactAction', handleReactActionChange)

    return () => document.removeEventListener('reactAction', handleReactActionChange)
  }, [setError])
}

function Form(props) {
  const { onDialogClose, socialAccount } = props
  const newRecord = !socialAccount.id
  const formAction = newRecord ? adminSocialAccountsPath() : adminSocialAccountPath(socialAccount)

  const { control, 'formState': { 'errors': formErrors }, setError, trigger } = useForm({
    'defaultValues': {
      'social_account[app_id]': socialAccount.credentials?.appId ?? '',
      'social_account[app_secret]': socialAccount.credentials?.appSecret ?? '',
      'social_account[name]': socialAccount.name ?? ''
    },
    'mode': 'onChange'
  })

  const useStopFormSubmissionOnClientSideValidationFailedRef =
    useStopFormSubmissionOnClientSideValidationFailed(trigger)
  const formErrorsPresent = Object.keys(formErrors).length !== 0

  const [useFormSubmittingRef, submitting] = useFormSubmitting()

  const formRef = composeRefs(useStopFormSubmissionOnClientSideValidationFailedRef, useFormSubmittingRef)

  useHandleReactActionChangeAddErrors(setError)

  return (
    <form action={formAction} ref={formRef} acceptCharset="utf-8" method="post" data-remote>
      {newRecord || <input type="hidden" name="_method" value="patch" autoComplete="off" />}
      <AuthenticityTokenField />
      <DialogTitle>{newRecord ? 'New Social Account' : 'Edit Social Account'}</DialogTitle>
      <DialogContent>
        <input type="hidden" name="social_account[type]" value={socialAccount.type} />
        <FormController
          control={control}
          name="social_account[name]"
          label="Name *"
          rules={{ 'validate': (value) => !isBlank(value) || 'Please insert a damn name' }} />
        <FormController
          control={control}
          name="social_account[app_id]"
          label="Facebook App Id *"
          rules={{ 'validate': (value) => !isBlank(value) || 'Please insert a bloody Facebook App Id' }} />
        <FormController
          control={control}
          name="social_account[app_secret]"
          label="Facebook App Secret *"
          rules={{ 'validate': (value) => !isBlank(value) || 'Please insert a motherfucking Facebook App Secret' }} />
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={onDialogClose}>Cancel</Button>
        <LoadingButton
          type="submit"
          variant="contained"
          disabled={formErrorsPresent}
          loading={submitting}
        >{newRecord ? 'Create' : 'Update'}</LoadingButton>
      </DialogActions>
      <input type="hidden" name="social_account[handled_errors][][attribute]" value="name" />
      <input type="hidden" name="social_account[handled_errors][][type]" value="taken" />
    </form>
  )
}

export default function DialogForm(props) {
  const { 'onClose': onDialogClose, 'open': dialogOpen, socialAccount } = props

  return (
    <div>
      <Dialog open={dialogOpen} onClose={onDialogClose}>
        <Form socialAccount={socialAccount} onDialogClose={onDialogClose} />
      </Dialog>
    </div>
  )
}
