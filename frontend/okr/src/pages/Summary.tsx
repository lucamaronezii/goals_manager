import { CheckCircle, Plus } from '@phosphor-icons/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-BR'
import logo from '../assets/objective.png'
import { Button } from '../components/ui/button'
import { DialogTrigger } from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { OutlineButton } from '../components/ui/outline-button'
import { Progress, ProgressIndicator } from '../components/ui/progress-bar'
import { Separator } from '../components/ui/separator'
import { getSummary } from '../services/get-summary'
import { getPending } from '../services/get-pending'
import { createGoalCompletion } from '../services/create-goal-completion'

dayjs.locale(ptBR)

const dayStart = dayjs().startOf('week').format('D')
const dayEnd = dayjs().endOf('week').format('D [de] MMMM')

const Summary = () => {
    const queryClient = useQueryClient()

    const { data: summary } = useQuery({
        queryKey: ['summary'],
        queryFn: getSummary,
        staleTime: 1000 * 60
    })

    const { data: pending } = useQuery({
        queryKey: ['pending-goals'],
        queryFn: getPending,
        staleTime: 1000 * 60
    })

    const handleCompleteGoals = async (goalId: string) => {
        await createGoalCompletion(goalId)
            .then(_ => {
                queryClient.invalidateQueries({ queryKey: ['summary'] })
                queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
            })
    }

    console.log('pending', pending)
    if (!summary) return

    const percentage = Math.round(summary.completed * 100 / summary.total)

    return (
        <div className="max-w-[30rem] flex flex-col gap-5 h-full py-10 px-5">
            <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                    <img src={logo} alt="App logo" width={24} />
                    <Label className=''>{dayStart} a {dayEnd}</Label>
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
                    <ProgressIndicator style={{ width: `${percentage}%` }} />
                </Progress>
                <div className='flex justify-between'>
                    <Label className='text-zinc-500'>Você completou
                        <span className='text-white'> {summary.completed} </span>
                        de
                        <span className='text-white'> {summary.total} </span>
                        nessa semana
                    </Label>
                    <Label className='text-zinc-300'>{percentage}%</Label>
                </div>
            </div>
            <Separator />
            <div className='flex gap-3 flex-wrap'>
                {pending?.map((pending) => (
                    <OutlineButton
                        disabled={pending.desiredWeeklyFrequency <= pending.completionCount}
                        key={pending.id}
                        onClick={() => handleCompleteGoals(pending.id)}
                    >
                        <Plus className='text-zinc-600' size={15} weight="bold" />
                        {pending.title}
                    </OutlineButton>
                ))}
            </div>
            <div className='flex flex-col gap-4'>
                <h2 className='text-xl font-medium'>Sua semana</h2>

                {Object.entries(summary.goalsPerDay).map(([date, goals], index) => {
                    const weekDay = dayjs(date).format('dddd')
                    const parsedDate = dayjs(date).format('D [de] MMMM')

                    return (
                        <div key={index} className='flex flex-col gap-4'>
                            <h3 className='font-medium'>
                                <span className='capitalize'>{weekDay}</span>
                                <span className='text-zinc-400 text-xs'> ({parsedDate})</span>
                            </h3>
                            <ul className='flex flex-col gap-3'>
                                {goals.map((goal) => (
                                    <li key={goal.id} className='flex items-center gap-2'>
                                        <CheckCircle className='size-4 text-pink-400' />
                                        <span className='text-sm text-zinc-400'>
                                            Você completou "<span className='text-zinc-100'>{goal.title}</span>" às <span className='text-zinc-100'>{dayjs(goal.completedAt).format('HH:mm')}h!</span>
                                        </span>
                                        <span className='text-xs text-zinc-600 underline cursor-pointer hover:text-zinc-500'>
                                            Desfazer
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                })}

                {/* <Label className='text-zinc-500'>Você ainda não completou nenhuma meta essa semana</Label> */}
            </div>
        </div>
    )
}

export default Summary
