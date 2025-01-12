'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from '@/components/contexts/AuthContext'

interface Option {
  label: string
  href: string
}

interface WelcomeCardProps {
  options: Option[]
}

export function WelcomeTrainerCard({ options }: WelcomeCardProps) {
  const { user } = useAuth()

  return (
    <Card className="w-3/4 max-w-md bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-neutral-800">Hola, {user?.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-neutral-600">¿Qué quieres consultar?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((option, index) => (
            <Link
              key={index}
              href={option.href}
              className="w-full px-4 py-2 text-center text-white bg-neutral-700 hover:bg-neutral-800 rounded-md transition-colors duration-200"
            >
              {option.label}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

