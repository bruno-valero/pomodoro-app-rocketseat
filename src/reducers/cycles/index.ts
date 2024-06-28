import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate: Date | null
  finishedDate: Date | null
}

type ActionType = 'ADD_NEW_CYCLE' | 'FINISH_CYCLE' | 'INTERRUPT_CYCLE'
type Actions = {
  type: ActionType
  payload: {
    data: unknown
  }
}

export type CyclesState = {
  cycles: Cycle[]
  activeCycleId: string | null
  activeCycle: Cycle | null
}

export function cyclesReducer(state: CyclesState, action: Actions) {
  if (action.type === ActionTypes.FINISH_CYCLE) {
    const data = action.payload.data as Cycle
    const index = state.cycles.findIndex((item) => item.id === data.id)
    data.finishedDate = new Date()
    state.cycles.splice(index, 1, data)
    state.activeCycleId = data.id
    state.activeCycle = null
    return state
  }

  if (action.type === ActionTypes.INTERRUPT_CYCLE) {
    const data = action.payload.data as Cycle
    const index = state.cycles.findIndex((item) => item.id === data.id)
    data.interruptedDate = new Date()
    state.cycles.splice(index, 1, data)
    state.activeCycleId = null
    state.activeCycle = null
    return state
  }

  if (action.type === ActionTypes.ADD_NEW_CYCLE) {
    const data = action.payload.data as Cycle
    state.activeCycleId = data.id
    state.activeCycle = data
    return { ...state, cycles: [...state.cycles, data] }
  }

  return state
}
