import { Cycles } from '@/hooks/useCycles'
import { useCyclesProvider } from '@/providers/CyclesContextProvider'
import { createContext, useContext } from 'react'
import { HomeCountDown, useHomeCountDown } from '../hooks/useHomeCountDown'
import { HomeForm, useHomeForm } from '../hooks/useHomeForm'

export type HomeContextInitialProps = {
  homeForm: HomeForm
  cycles: Cycles
  homeCountDown: HomeCountDown
}

export const HomeContextInitial = createContext({} as HomeContextInitialProps)

interface HomeProviderProps {
  children: React.ReactNode
}

export function HomeProvider({ children }: HomeProviderProps) {
  //   MAIN SESSION
  const cycles = useCyclesProvider()

  //   COUNT DOWN SECSSION
  const homeCountDown = useHomeCountDown({ cycles })

  // FORM SESSION
  const homeForm = useHomeForm({ homeCountDown })

  const context: HomeContextInitialProps = {
    homeForm,
    cycles,
    homeCountDown,
  }

  return (
    <HomeContextInitial.Provider value={context}>
      {children}
    </HomeContextInitial.Provider>
  )
}

export const useHomeContext = () => useContext(HomeContextInitial) // eslint-disable-line
