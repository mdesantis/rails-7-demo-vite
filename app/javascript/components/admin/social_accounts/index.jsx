import { Fragment } from 'react'

import { Add as AddIcon, Facebook as FacebookIcon, OpenInNew as OpenInNewIcon } from '@mui/icons-material'

import Layout from '/components/layouts/admin'

import { newAdminSocialAccountPath } from '/routes'

import {
  Grid,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'

function isFacebookSocialAccount(socialAccount) {
  return socialAccount.type === 'SocialAccount::Facebook'
}

function socialAccountExternalURL(socialAccount) {
  if (isFacebookSocialAccount(socialAccount)) {
    return `https://developers.facebook.com/apps/${socialAccount.credentials.appId}`
  }

  return null
}

function SocialAccountIcon(props) {
  const { socialAccount } = props

  if (isFacebookSocialAccount(socialAccount)) {
    return <FacebookIcon titleAccess="Facebook" />
  }

  return null
}

function AppBarButtons() {
  return (
    <Tooltip title="New Social Account">
      <Link href={newAdminSocialAccountPath()}>
        <IconButton aria-label="new social account">
          <AddIcon fontSize="large" />
        </IconButton>
      </Link>
    </Tooltip>
  )
}

export default function Index(props) {
  return (
    <Layout appBarTitle="Social Accounts" appBarButtons={<AppBarButtons />}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell colSpan={2}>Credentials</TableCell>
              <TableCell>External URL</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.socialAccounts.map((socialAccount, i) => {
              return (
                <Fragment key={i}>
                  <TableRow>
                    <TableCell rowSpan={2}>
                      <SocialAccountIcon socialAccount={socialAccount} />
                    </TableCell>
                    <TableCell rowSpan={2}>{socialAccount.name}</TableCell>
                    <TableCell
                      size="small"
                      sx={{ 'borderBottom': 0, 'pb': 0.75, 'pl': 4, 'pr': 2, 'pt': 2 }}
                    >App Id</TableCell>
                    <TableCell
                      size="small"
                      sx={{ 'borderBottom': 0, 'pb': 0.75, 'pl': 2, 'pr': 4, 'pt': 2 }}
                    >
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
                  </TableRow>
                  <TableRow>
                    <TableCell
                      size="small"
                      sx={{ 'pb': 2, 'pl': 4, 'pr': 2, 'pt': 0.75 }}
                    >App Secret</TableCell>
                    <TableCell
                      size="small"
                      sx={{ 'pb': 2, 'pl': 2, 'pr': 4, 'pt': 0.75 }}
                    >
                      <code>{socialAccount.credentials.appSecret}</code>
                    </TableCell>
                  </TableRow>
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  )
}
