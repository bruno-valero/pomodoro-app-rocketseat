import { useCyclesProvider } from '@/providers/CyclesContextProvider'
import { HistoryContainer, HistoryList, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export function History() {
  const {
    cycle: { cycle },
  } = useCyclesProvider()

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycle.cycles.map((item) => (
              <tr key={item.id}>
                <td>{item.task}</td>
                <td>{item.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(item.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {item.finishedDate && (
                    <Status statusColor="green">Concuido</Status>
                  )}
                  {item.interruptedDate && (
                    <Status statusColor="red">Interrompido</Status>
                  )}
                  {!item.interruptedDate && !item.finishedDate && (
                    <Status statusColor="yellow">Em Andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
