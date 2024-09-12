import dayjs from 'dayjs'
import logo from '../assets/objective.png'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { DialogTrigger } from '../components/ui/dialog'
import { CheckCircle, Plus } from '@phosphor-icons/react'
import { Progress, ProgressIndicator } from '../components/ui/progress-bar'
import { OutlineButton } from '../components/ui/outline-button'
import { Separator } from '../components/ui/separator'

const dayStart = dayjs().startOf('week').format('D')
const dayEnd = dayjs().endOf('week').format('D')
const month = new Date().toLocaleString('default', { 'month': 'long' })

const Summary = () => {
    return (
        <div className="max-w-[30rem] flex flex-col gap-5 h-full py-10 px-5">
            <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                    <img src={logo} alt="App logo" width={24} />
                    <Label className=''>{dayStart} a {dayEnd} de {month}</Label>
                </div>
                <DialogTrigger asChild>
                    <Button className='h-7'>
                        <Plus size={15} weight="bold" />
                        Cadastrar meta
                    </Button>
                </DialogTrigger>
            </div>
            <div className='flex flex-col gap-3'>
                <Progress value={1} max={15}>
                    <ProgressIndicator style={{ width: '90%' }} />
                </Progress>
                <div className='flex justify-between'>
                    <Label className='text-zinc-500'>Você completou
                        <span className='text-white'> {1} </span>
                        de
                        <span className='text-white'> {2} </span>
                        nessa semana
                    </Label>
                    <Label className='text-zinc-300'>{50}%</Label>
                </div>
            </div>
            <Separator />
            <div className='flex gap-3 flex-wrap'>
                <OutlineButton>
                    <Plus className='text-zinc-600' size={15} weight="bold" />
                    Meditar
                </OutlineButton>
                <OutlineButton>
                    <Plus className='text-zinc-600' size={15} weight="bold" />
                    Meditar
                </OutlineButton>
                <OutlineButton>
                    <Plus className='text-zinc-600' size={15} weight="bold" />
                    Meditar
                </OutlineButton>
            </div>
            <div className='flex flex-col gap-4'>
                <h2 className='text-xl font-medium'>Sua semana</h2>
                <div className='flex flex-col gap-4'>
                    <h3 className='font-medium'>
                        Domingo <span className='text-zinc-400 text-xs'> (12 de setembro)</span>
                    </h3>
                    <ul className='flex flex-col gap-3'>
                        <li className='flex items-center gap-2'>
                            <CheckCircle className='size-4 text-pink-400' />
                            <span className='text-sm text-zinc-400'>
                                Você completou "<span className='text-zinc-100'>Nadar</span>" às <span className='text-zinc-100'>08:13h!</span>
                            </span>
                            <span className='text-xs text-zinc-600 underline cursor-pointer hover:text-zinc-500'>
                                Desfazer
                            </span>
                        </li>
                    </ul>
                </div>
                {/* <Label className='text-zinc-500'>Você ainda não completou nenhuma meta essa semana</Label> */}
            </div>
        </div>
    )
}

export default Summary
