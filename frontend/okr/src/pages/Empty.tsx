import { Plus } from '@phosphor-icons/react'
import empty from '../assets/lets-start.png'
import logo from '../assets/objective.png'
import { Button } from '../components/ui/button'
import { DialogTrigger } from '../components/ui/dialog'

const Empty = () => {
    return (
        <>
            <div className="flex gap-3 items-center">
                <img className='' src={logo} alt="App logo" width={25} />
                Personal goals manager
            </div>
            <img src={empty} alt="Women trying to launch a rocket" />
            <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
                Você ainda não cadastrou nenhuma meta. Cadastre uma agora mesmo.
            </p>
            <DialogTrigger asChild>
                <Button>
                    <Plus size={20} weight="bold" /> 
                    Cadastrar meta
                </Button>
            </DialogTrigger>
        </>
    )
}

export default Empty
