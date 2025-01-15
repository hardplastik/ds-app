'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export interface Program {
  name: string
  startDate: string
  weeks: number
  sessionPerWeek: number
}

interface ProgramFormProps {
  onUpdate: (program: Program) => void
}


export default function ProgramForm({onUpdate}: ProgramFormProps) {
  
  const [program, setProgram] = useState<Program>({
    name: '',
    startDate: '',
    weeks: 0,
    sessionPerWeek: 0
  });
  
  const [date, setDate] = useState<Date>();

  useEffect(() => {

    onUpdate(program);

  }, [program]);


  return (
    <div className='space-y-4'>
      <div className="space-y-1">
        <Label htmlFor="name">Nombre del Programa</Label>
        <Input
          id="name"
          placeholder="Ej. Tonificar"
          value={program.name}
          onChange={(e) => setProgram({ ...program, name: e.target.value })}
          className="bg-slate-50 border-slate-900"
        />
      </div>

      <div className="space-y-1">
        <Label>Fecha de Inicio</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-between text-left font-normal bg-slate-50 border-slate-900',
                !date && 'text-gray-400'
              )}
            >
              {date ? format(date, 'dd/MM/yy') : 'DD/MM/YY'}
              <CalendarIcon className="mr-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate)
                if (newDate) {
                  setProgram({ ...program, startDate: format(newDate, 'dd-MM-yyyy') })
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-1">
        <Label>Elige la duración en semanas</Label>
        <Select 
          onValueChange={(value) => setProgram({ ...program, weeks: Number(value) })}
        >
          <SelectTrigger className="bg-slate-50 border-slate-900">
            <SelectValue placeholder="Seleccionar Semanas" />
          </SelectTrigger>
          <SelectContent>
            {[4, 8, 12, 16, 20].map((week) => (
              <SelectItem key={week} value={week.toString()}>
                {week} semanas
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label>Elige las sesiones por semana</Label>
        <Select
          onValueChange={(value) => setProgram({ ...program, sessionPerWeek: Number(value) })}
        >
          <SelectTrigger className="bg-slate-50 border-slate-900">
            <SelectValue placeholder="Seleccionar número de sesiones" />
          </SelectTrigger>
          <SelectContent>
            {[2, 3, 4, 5, 6].map((sessions) => (
              <SelectItem key={sessions} value={sessions.toString()}>
                {sessions} sesiones
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

