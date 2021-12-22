
import { useMemo } from 'react'

import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles'

import {
  Container,
  CssBaseline,
  useMediaQuery
} from '@mui/material'

import Drawer from './admin/_drawer'

export default function Admin(props) {
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
        <Drawer appBarTitle={props.appBarTitle}>
          <Container>
            {props.children}
          </Container>
        </Drawer>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
