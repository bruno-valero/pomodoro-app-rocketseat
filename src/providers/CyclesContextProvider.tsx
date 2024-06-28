import { Cycles, useCycles } from '@/hooks/useCycles'
import { createContext, useContext } from 'react'

export type CyclesContextInitial = Cycles

const CyclesContextInitial = createContext({} as CyclesContextInitial)

interface CyclesContextProps {
  children: React.ReactNode
}

export function CyclesContext({ children }: CyclesContextProps) {
  const cycle = useCycles()
  return (
    <CyclesContextInitial.Provider value={cycle}>
      {children}
    </CyclesContextInitial.Provider>
  )
}

export const useCyclesProvider = () => useContext(CyclesContextInitial) // eslint-disable-line
