
import { useMemo, useState } from 'react'

import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles'

import {
  Alert,
  Container,
  CssBaseline,
  Snackbar,
  useMediaQuery
} from '@mui/material'

import Drawer from './admin/_drawer'

function SuccessSnackbar(props) {
  const { message } = props
  const [open, setOpen] = useState(true)
  const vertical = 'bottom'
  const horizontal = 'center'

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ horizontal, vertical }}>
      <Alert onClose={handleClose} severity="success" sx={{ 'width': '100%' }}>{message}</Alert>
    </Snackbar>
  )
}

export default function Admin(props) {
  const { successMessage } = props
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(
    () => createTheme({
      'palette': {
        'mode': prefersDarkMode ? 'dark' : 'light'
      }
    }),
    [prefersDarkMode]
  )

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Drawer appBarTitle={props.appBarTitle} appBarButtons={props.appBarButtons}>
          <Container>
            {props.children}
          </Container>
        </Drawer>
        {successMessage && <SuccessSnackbar message={successMessage} />}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
