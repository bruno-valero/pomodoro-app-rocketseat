import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { CyclesContext } from './providers/CyclesContextProvider'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <CyclesContext>
          <Router />
        </CyclesContext>
      </BrowserRouter>
    </ThemeProvider>
  )
}
