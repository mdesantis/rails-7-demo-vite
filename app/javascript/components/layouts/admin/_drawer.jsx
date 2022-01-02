// References:
// - https://mui.com/components/drawers/#clipped-under-the-app-bar
// - https://github.com/mui-org/material-ui/blob/v5.2.5/docs/src/pages/components/drawers/ClippedDrawer.js

import ServerContext from '/turbo_react/server_context'

import {
  AppBar,
  Box,
  List,
  ListItem,
  ListItemText,
  Drawer as MuiDrawer,
  ListItemButton as MuiListItemButton,
  Toolbar,
  Typography
} from '@mui/material'

import { adminSocialAccountsPath } from '/routes'

const drawerWidth = 240

function ListItemButton(props) {
  const { href, selectedHref } = props

  return (
    <MuiListItemButton component="a" href={href} selected={href === selectedHref}>
      {props.children}
    </MuiListItemButton>
  )
}

export default function Drawer(props) {
  return (
    <ServerContext.Consumer>
      {({ 'serverContext': { 'currentURL': currentURLAsString } }) => {
        const currentURL = new URL(currentURLAsString)

        return (
          <Box sx={{ 'display': 'flex' }}>
            <AppBar position="fixed" sx={{ 'zIndex': (theme) => theme.zIndex.drawer + 1 }}>
              <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ 'flexGrow': 1 }}>
                  {props.appBarTitle}
                </Typography>
                {props.appBarButtons}
              </Toolbar>
            </AppBar>
            <MuiDrawer
              variant="permanent"
              sx={{
                '& .MuiDrawer-paper': { 'boxSizing': 'border-box', 'width': drawerWidth },
                'flexShrink': 0,
                'width': drawerWidth
              }}
            >
              <Toolbar />
              <Box sx={{ 'overflow': 'auto' }}>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href={adminSocialAccountsPath()}
                      selectedHref={currentURL.pathname}
                    >
                      <ListItemText primary="Social Accounts" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </MuiDrawer>
            <Box component="main" sx={{ 'flexGrow': 1, 'p': 3 }}>
              <Toolbar />
              {props.children}
            </Box>
          </Box>
        )
      }}
    </ServerContext.Consumer>
  )
}
