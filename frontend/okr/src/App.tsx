import CreateGoalsDialog from "./components/CreateGoalsDialog"
import { Dialog } from "./components/ui/dialog"
import Empty from "./pages/Empty"
import Summary from "./pages/Summary"

export const App = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <Dialog>
        {/* <Empty /> */}
        <Summary />
        <CreateGoalsDialog />
      </Dialog>
    </div>
  )
}

export default App
