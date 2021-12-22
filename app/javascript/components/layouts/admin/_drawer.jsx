// References:
// - https://mui.com/components/drawers/#clipped-under-the-app-bar
// - https://github.com/mui-org/material-ui/blob/v5.2.5/docs/src/pages/components/drawers/ClippedDrawer.js

import {
  AppBar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer as MuiDrawer,
  Toolbar,
  Typography
} from '@mui/material'

import { adminSocialAccountsPath } from '/routes'

const drawerWidth = 240

export default function Drawer(props) {
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
              <ListItemButton component="a" href={adminSocialAccountsPath()}>
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
}
