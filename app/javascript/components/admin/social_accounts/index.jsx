import { Fragment } from 'react'

import { Facebook as FacebookIcon, OpenInNew as OpenInNewIcon } from '@mui/icons-material'

import Layout from '/components/layouts/admin'

import {
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
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

export default function Index(props) {
  return (
    <Layout appBarTitle={'Social Accounts'}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell colSpan={2}>Credentials</TableCell>
              <TableCell>External Link</TableCell>
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
                    <TableCell size="small">App Id</TableCell>
                    <TableCell size="small"><code>{socialAccount.credentials.appId}</code></TableCell>
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
                    <TableCell size="small">App Secret</TableCell>
                    <TableCell size="small"><code>{socialAccount.credentials.appSecret}</code></TableCell>
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
