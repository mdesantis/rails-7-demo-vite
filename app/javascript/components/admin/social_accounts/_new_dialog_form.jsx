import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import AuthenticityTokenField from '/components/application/_authenticity_token_field'

import { Controller as ReactHookFormController, useForm } from 'react-hook-form'
import useStopFormSubmissionOnClientSideValidationFailed from
  '/hooks/use_stop_form_submission_on_client_side_validation_failed'

import { adminSocialAccountsPath } from '/routes'

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

export default function NewDialogForm(props) {
  const { 'onClose': onDialogClose, 'open': dialogOpen, socialAccount } = props
  const theme = useTheme()
  const { control, 'formState': { 'errors': formErrors }, reset, trigger } = useForm({
    'defaultValues': {
      'social_account[app_id]': socialAccount.credentials?.appId ?? '',
      'social_account[app_secret]': socialAccount.credentials?.appSecret ?? '',
      'social_account[name]': socialAccount.name ?? ''
    },
    'mode': 'onChange'
  })
  const formRef = useStopFormSubmissionOnClientSideValidationFailed(trigger)
  const formErrorsPresent = Object.keys(formErrors).length !== 0

  const resetFormAfterDialogTransitionEnd = () => setTimeout(() => reset(), theme.transitions.duration.standard)
  const handleDialogClose = (event) => {
    resetFormAfterDialogTransitionEnd()

    if (onDialogClose) onDialogClose(event)
  }

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <form action={adminSocialAccountsPath()} ref={formRef} acceptCharset="utf-8" method="post" data-remote>
          <AuthenticityTokenField />
          <DialogTitle>New Social Account</DialogTitle>
          <DialogContent>
            <input type="hidden" name="social_account[type]" value={socialAccount.type} />
            <FormController
              control={control}
              name="social_account[name]"
              label="Name *"
              rules={{ 'required': 'Please insert a damn name' }}
            />
            <FormController
              control={control}
              name="social_account[app_id]"
              label="Facebook App Id *"
              rules={{ 'required': 'Please insert a bloody Facebook App Id' }}
            />
            <FormController
              control={control}
              name="social_account[app_secret]"
              label="Facebook App Secret *"
              rules={{ 'required': 'Please insert a motherfucking Facebook App Secret' }}
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleDialogClose}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={formErrorsPresent}>Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
