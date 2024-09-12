import { Plus } from '@phosphor-icons/react'
import { useState } from 'react'
import empty from '../assets/lets-start.png'
import logo from '../assets/objective.png'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

const Empty = () => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Dialog>
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

            <DialogContent>
oi
            </DialogContent>
        </Dialog>
    )
}

export default Empty
