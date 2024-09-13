import { useQuery } from "@tanstack/react-query"
import CreateGoalsDialog from "./components/CreateGoalsDialog"
import { Dialog } from "./components/ui/dialog"
import Empty from "./pages/Empty"
import Summary from "./pages/Summary"
import { getSummary } from "./services/get-summary"

export const App = () => {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60
  })

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <Dialog>
        {data && data.total > 0 ? <Summary /> : <Empty />}
        <CreateGoalsDialog />
      </Dialog>
    </div>
  )
}

export default App
