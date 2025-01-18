'use client'

import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useStoredState from '@/hooks/use-stored-state'
import { format, subDays } from 'date-fns'
import DatePicker from '../ui/date-picker'
import DropDown, { DropDownOptionProps } from '../ui/dropdown'
export interface ProgramSeed {
  name: string
  startDate: string
  weeks: number
  sessionPerWeek: number
}

export interface ProgramFormProps {
  onUpdate: (seed: ProgramSeed) => void
}

export default function ProgramForm({
  onUpdate
}: ProgramFormProps) {
  
  const [program, setProgram] = useStoredState<ProgramSeed>('program-seed', {
    name: '',
    startDate: '',
    weeks: 0,
    sessionPerWeek: 0
  });

  useEffect(() => {

    if (!date && program.startDate) {
      setDate(subDays(program.startDate, 1));
    }

    onUpdate(program);

  }, [program]);
  
  const [date, setDate] = useState<Date>();

  const weekOptions: DropDownOptionProps[] = [{
    label: `${1} semana`,
    value: 1,
  },{
    label: `${4} semanas`,
    value: 4,
  },{
    label: `${8} semanas`,
    value: 8,
  },{
    label: `${12} semanas`,
    value: 12,
  },{
    label: `${16} semanas`,
    value: 16,
  },{
    label: `${20} semanas`,
    value: 20,
  }];

  const sessionsPerWeek: DropDownOptionProps[] = [{
    label: `${2} sessions`,
    value: 2,
  },{
    label: `${3} sessions`,
    value: 3,
  },{
    label: `${4} sessions`,
    value: 4,
  },{
    label: `${5} sessions`,
    value: 5,
  },{
    label: `${6} sessions`,
    value: 6,
  }];

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
        <DatePicker value={date} onSetDate={(value?: Date) => {
          
          if (value) {
            setDate(value);
            const date = format(value, "yyyy-MM-dd'T'hh:mm:ss")
            setProgram({...program, startDate: date})
          }
        }} />
      </div>

      <div className="space-y-1">
        <Label>Elige la duración en semanas</Label>
        <DropDown value={program.weeks} options={weekOptions} placeholder='Seleccionar número de semanas' 
          onSelect={(value) => setProgram({ ...program, weeks: Number(value) })} />
      </div>

      <div className="space-y-1">
        <Label>Elige las sesiones por semana</Label>
        <DropDown value={program.sessionPerWeek} options={sessionsPerWeek} placeholder='Seleccionar número de sesiones por semana' 
          onSelect={(value) => setProgram({ ...program, sessionPerWeek: Number(value) })} />
      </div>
    </div>
  )
}

