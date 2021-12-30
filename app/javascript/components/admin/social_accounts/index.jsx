import { uniqueId } from 'lodash-es'
import { useState } from 'react'

import Layout from '/components/layouts/admin'
import ServerContext from '/react_lifecycle/server_context'

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

import AuthenticityTokenField from '/components/application/_authenticity_token_field'
import NewDialogForm from './_new_dialog_form'

import {
  adminSocialAccountPath,
  adminSocialAccountsUrl,
  editAdminSocialAccountPath,
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

function SocialAccountIcon(props) {
  const { socialAccount } = props

  if (isFacebookSocialAccount(socialAccount)) return <FacebookIcon titleAccess="Facebook" />

  return null
}

function AppBarButtons(props) {
  const { handleNewDialogOpen } = props

  const handleNewLinkClick = (event) => {
    if (handleNewDialogOpen) {
      event.preventDefault()
      handleNewDialogOpen()
    }
  }

  return (
    <Tooltip title="New social account">
      <IconButton
        component="a"
        href={newAdminSocialAccountPath()}
        onClick={(e) => handleNewLinkClick(e)}
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

function EditAction({ socialAccount }) {
  return (
    <Tooltip title="Edit this social account">
      <IconButton component="a" href={editAdminSocialAccountPath(socialAccount)} aria-label="edit social account">
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

function TableItem({ socialAccount }) {
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
          {socialAccount.updatedAt}
        </TableCell>
        <TableCell rowSpan={2}>
          <Stack direction="row" spacing={1}>
            <EditAction socialAccount={socialAccount} />
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

function changeURL(currentURL, setServerContext) {
  navigator.history.push(currentURL)

  setServerContext((state) => {
    return { ...state, 'currentURL': currentURL.toString() }
  })
}

export default function Index(
  { 'newDialogOpen': initialNewDialogOpen, newSocialAccount, socialAccounts, successMessage }
) {
  const [newDialogOpen, setNewDialogOpen] = useState(initialNewDialogOpen ?? false)

  const handleOnNewDialogClose = (setServerContext) => {
    setNewDialogOpen(false)
    changeURL(new URL(adminSocialAccountsUrl()), setServerContext)
  }

  const handleOnNewDialogOpen = (setServerContext) => {
    setNewDialogOpen(true)
    changeURL(new URL(newAdminSocialAccountUrl()), setServerContext)
  }

  return (
    <ServerContext.Consumer>
      {({ setServerContext }) => {
        return (
          <Layout
            appBarTitle="Social Accounts"
            appBarButtons={<AppBarButtons handleNewDialogOpen={() => handleOnNewDialogOpen(setServerContext)} />}
            successMessage={successMessage}
          >
            <NewDialogForm
              open={newDialogOpen}
              onClose={() => handleOnNewDialogClose(setServerContext)}
              socialAccount={newSocialAccount}
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
                  {socialAccounts.map((socialAccount, i) => <TableItem key={i} socialAccount={socialAccount} />)}
                </TableBody>
              </Table>
            </TableContainer>
          </Layout>
        )
      }}
    </ServerContext.Consumer>
  )
}
