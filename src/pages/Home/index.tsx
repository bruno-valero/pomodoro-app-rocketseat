import { Cycle } from '@/reducers/cycles'
import { HomeMain } from './components/HomeMain'
import { HomeProvider } from './providers/HomeProvider'

export type ActiveCycle = Cycle | null

export function Home() {
  return (
    <HomeProvider>
      <HomeMain />
    </HomeProvider>
  )
}
