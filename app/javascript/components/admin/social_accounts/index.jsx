import { forwardRef, useState } from 'react'
import { uniqueId } from 'lodash-es'

import Layout from '/components/layouts/admin'
import ServerContext from '/turbo_react/server_context'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'

import { LoadingButton } from '@mui/lab'

import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Facebook as FacebookIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material'

import ReactTimeAgo from 'react-time-ago'

import AuthenticityTokenField from '/components/application/_authenticity_token_field'
import DialogForm from './_dialog_form'

import {
  adminSocialAccountPath,
  adminSocialAccountsUrl,
  editAdminSocialAccountPath,
  editAdminSocialAccountUrl,
  newAdminSocialAccountPath,
  newAdminSocialAccountUrl
} from '/routes'
import { navigator } from '@hotwired/turbo'

function isFacebookSocialAccount(socialAccount) {
  return socialAccount.type === 'SocialAccount::Facebook'
}

function socialAccountExternalURL(socialAccount) {
  if (isFacebookSocialAccount(socialAccount)) return `https://developers.facebook.com/apps/${socialAccount.credentials.appId}`

  return null
}

function changeURL(currentURL, setServerContext) {
  navigator.history.push(currentURL)

  setServerContext((state) => {
    return { ...state, 'currentURL': currentURL.toString() }
  })
}

function SocialAccountIcon({ socialAccount }) {
  if (isFacebookSocialAccount(socialAccount)) return <FacebookIcon titleAccess="Facebook" />

  return null
}

function AppBarButtons({ handleDialogFormOpen }) {
  const handleButtonClick = (event) => {
    event.preventDefault()
    handleDialogFormOpen()
  }

  return (
    <Tooltip title="New social account">
      <IconButton
        component="a"
        href={newAdminSocialAccountPath()}
        onClick={(e) => handleButtonClick(e)}
        aria-label="new social account"
      >
        <AddIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  )
}

function DeleteDialog(props) {
  const { confirmButtonLoading, formId, handleClose, handleConfirm, open } = props
  let { handleCancel } = props

  if (!handleCancel) handleCancel = handleClose

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>
          Delete this social account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} autoFocus>Nah, fuck it</Button>
        <LoadingButton
          onClick={handleConfirm}
          type="submit"
          form={formId}
          loadingPosition="start"
          startIcon={<DeleteIcon />}
          loading={confirmButtonLoading}
          variant="contained"
        >
          Come on
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

function EditAction({ handleDialogFormOpen, socialAccount }) {
  const handleButtonClick = (event) => {
    event.preventDefault()
    handleDialogFormOpen()
  }

  return (
    <Tooltip title="Edit this social account">
      <IconButton
        component="a"
        href={editAdminSocialAccountPath(socialAccount)}
        aria-label="edit social account"
        onClick={(e) => handleButtonClick(e)}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  )
}

function DeleteAction({ socialAccount }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogConfirmButtonLoading, setDialogConfirmButtonLoading] = useState(false)
  const [formId] = useState(uniqueId())

  const handleDialogOpen = () => setDialogOpen(true)
  const handleDialogClose = () => setDialogOpen(false)
  const handleFormSubmit = () => setDialogConfirmButtonLoading(true)

  return (
    <>
      <Tooltip title="Delete this social account">
        <Box
          component="form"
          sx={{ 'display': 'inline' }}
          method="post"
          action={adminSocialAccountPath(socialAccount)}
          id={formId}
          onSubmit={handleFormSubmit}
        >
          <AuthenticityTokenField />
          <input type="hidden" name="_method" value="delete" autoComplete="off" />
          <IconButton aria-label="delete social account" onClick={handleDialogOpen}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Tooltip>
      <DeleteDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        formId={formId}
        confirmButtonLoading={dialogConfirmButtonLoading}
      />
    </>
  )
}

const ReactTimeAgoTooltipContainer = forwardRef((props, ref) => {
  const { children, verboseDate, ...rest } = props

  return <Tooltip {...rest} title={verboseDate} ref={ref}>{children}</Tooltip>
})
ReactTimeAgoTooltipContainer.displayName = 'ReactTimeAgoTooltipContainer'

function TableItem({ handleDialogFormOpen, socialAccount }) {
  const updatedAtDate = new Date(socialAccount.updatedAt)

  return (
    <>
      <TableRow>
        <TableCell rowSpan={2}>
          <SocialAccountIcon socialAccount={socialAccount} />
        </TableCell>
        <TableCell rowSpan={2}>{socialAccount.name}</TableCell>
        <TableCell size="small" sx={{ 'borderBottom': 0, 'pb': 0.75, 'pl': 2, 'pr': 1, 'pt': 2 }}>
          App Id
        </TableCell>
        <TableCell size="small" sx={{ 'borderBottom': 0, 'pb': 0.75, 'pl': 1, 'pr': 2, 'pt': 2 }}>
          <code>{socialAccount.credentials.appId}</code>
        </TableCell>
        <TableCell rowSpan={2}>
          <Link
            href={socialAccountExternalURL(socialAccount)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Grid container direction="row" alignItems="center">
              {socialAccountExternalURL(socialAccount)} <OpenInNewIcon fontSize="small" />
            </Grid>
          </Link>
        </TableCell>
        <TableCell rowSpan={2}>
          <ReactTimeAgo
            date={updatedAtDate}
            timeStyle="round-minute"
            wrapperComponent={ReactTimeAgoTooltipContainer}
            tooltip={false}
          />
        </TableCell>
        <TableCell rowSpan={2}>
          <Stack direction="row" spacing={1}>
            <EditAction socialAccount={socialAccount} handleDialogFormOpen={handleDialogFormOpen} />
            <DeleteAction socialAccount={socialAccount} />
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell size="small" sx={{ 'pb': 2, 'pl': 2, 'pr': 1, 'pt': 0.75 }}>
          App Secret
        </TableCell>
        <TableCell size="small" sx={{ 'pb': 2, 'pl': 1, 'pr': 2, 'pt': 0.75 }}>
          <code>{socialAccount.credentials.appSecret}</code>
        </TableCell>
      </TableRow>
    </>
  )
}

export default function Index(
  {
    'dialogFormOpen': initialDialogFormOpen,
    'formSocialAccount': initialFormSocialAccount,
    socialAccounts,
    successMessage
  }
) {
  const [dialogFormOpen, setDialogFormOpen] = useState(initialDialogFormOpen ?? false)
  const [formSocialAccount, setFormSocialAccount] = useState(initialFormSocialAccount)

  const handleOnDialogFormClose = (setServerContext) => {
    setDialogFormOpen(false)
    changeURL(new URL(adminSocialAccountsUrl()), setServerContext)
  }

  const handleOnDialogFormOpen = (setServerContext, url, socialAccount) => {
    setDialogFormOpen(true)
    if (socialAccount) setFormSocialAccount(socialAccount)
    changeURL(url, setServerContext)
  }

  return (
    <ServerContext.Consumer>
      {({ setServerContext }) => {
        return (
          <Layout
            appBarTitle="Social Accounts"
            appBarButtons={
              <AppBarButtons
                handleDialogFormOpen={
                  () => handleOnDialogFormOpen(setServerContext, new URL(newAdminSocialAccountUrl()))
                }
              />
            }
            successMessage={successMessage}
          >
            <DialogForm
              open={dialogFormOpen}
              onClose={() => handleOnDialogFormClose(setServerContext)}
              socialAccount={formSocialAccount}
            />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell colSpan={2}>Credentials</TableCell>
                    <TableCell>External URL</TableCell>
                    <TableCell>Last Updated</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {socialAccounts.map((socialAccount, i) => {
                    return (
                      <TableItem
                        key={i}
                        socialAccount={socialAccount}
                        handleDialogFormOpen={
                          () => handleOnDialogFormOpen(
                            setServerContext,
                            new URL(editAdminSocialAccountUrl(socialAccount)),
                            socialAccount
                          )
                        }
                      />
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Layout>
        )
      }}
    </ServerContext.Consumer>
  )
}
