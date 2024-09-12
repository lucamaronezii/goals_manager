import { X } from "@phosphor-icons/react"
import { radioItems } from "../constants/items"
import { Button } from "./ui/button"
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "./ui/radio-group"

const CreateGoalsDialog = () => {
  return (
    <DialogContent>
      <div className='flex flex-col gap-6 h-full'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <DialogTitle>
              Cadastrar meta
            </DialogTitle>
            <DialogClose>
              <X className='text-zinc-300' />
            </DialogClose>
          </div>
          <DialogDescription>
            Adicione atividade que lhe fazem bem e que você
            quer continuar praticando toda semana.
          </DialogDescription>
        </div>
        <form action="" className='flex flex-col justify-between flex-1'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='title'>Atividade</Label>
              <Input id='title' autoFocus placeholder='Exemplo: estudar, nadar, praticar exercício...' />
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Quantidade</Label>
              <RadioGroup>
                {radioItems.map((item, index) => (
                  <RadioGroupItem key={index} value={String(item.value)}>
                    <RadioGroupIndicator />
                    <span className='text-zinc-300 text-sm font-medium leading-none'>
                      {item.text}
                    </span>
                    <span>{item.emoji}</span>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <DialogClose asChild>
              <Button variant='secondary' className='flex-1'>Fechar</Button>
            </DialogClose>
            <Button className='flex-1'>Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}

export default CreateGoalsDialog
