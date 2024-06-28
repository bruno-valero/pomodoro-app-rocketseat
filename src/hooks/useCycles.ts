import { Cycle, CyclesState, cyclesReducer } from '@/reducers/cycles'
import {
  addNewCycleAction,
  finishCycleAction,
  interruptCycleAction,
} from '@/reducers/cycles/actions'
import { useCallback, useEffect, useReducer } from 'react'

export type Cycles = {
  cycle: {
    cycle: CyclesState
    finishCycle: (cycle: Cycle) => void
    interruptCycle: (cycle: Cycle) => void
    addCycle: (cycle: Cycle) => void
  }
}

export function useCycles(): Cycles {
  const [cycle, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
      activeCycle: null,
    },
    (initialState) => {
      const soredStateJson = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )
      if (soredStateJson) {
        const storedState = JSON.parse(soredStateJson) as CyclesState
        function dateFromJson<T extends string | Date | null>(jsonDate: T) {
          return (jsonDate ? new Date(jsonDate) : null) as T
        }
        const cyclesState: CyclesState = {
          cycles: storedState.cycles.map((item) => {
            item.finishedDate = dateFromJson(item.finishedDate)
            item.interruptedDate = dateFromJson(item.interruptedDate)
            item.startDate = dateFromJson(item.startDate)
            return item
          }),
          activeCycle: storedState.activeCycle,
          activeCycleId: storedState.activeCycleId,
        }
        return cyclesState
      }
      return initialState
    },
  )

  useEffect(() => {
    const stateJson = JSON.stringify(cycle)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJson)
  }, [cycle])

  const finishCycle = useCallback((cycle: Cycle) => {
    dispatch(finishCycleAction(cycle))
    // setCycle((prev) => {
    //   const index = prev.findIndex((item) => item.id === cycle.id)
    //   cycle.finishedDate = new Date()
    //   return prev.splice(index, 1, cycle)
    // })
  }, [])

  const interruptCycle = useCallback((cycle: Cycle) => {
    dispatch(interruptCycleAction(cycle))
    // setCycle((prev) => {
    //   const index = prev.findIndex((item) => item.id === cycle.id)
    //   cycle.interruptedDate = new Date()
    //   return prev.splice(index, 1, cycle)
    // })
  }, [])

  const addCycle = useCallback((cycle: Cycle) => {
    dispatch(addNewCycleAction(cycle))
    // setCycle((prev) => [...prev, cycle])
  }, [])

  const Cycles = {
    cycle: { cycle, finishCycle, interruptCycle, addCycle },
    // activeCycleId: { activeCycleId, disableActiveCycleId, enableActiveCycleId },
    // activeCycle,
  }

  return Cycles
}
