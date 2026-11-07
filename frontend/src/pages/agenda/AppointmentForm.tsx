
import { useState } from 'react'
import { X, CalendarDays, Clock, UserRound, Scissors } from 'lucide-react'

interface ExistingAppointment {
  barberId: number
  date: string
  start: string
  end: string
  status: string
}

interface AppointmentFormProps {
  appointments: ExistingAppointment[]
  onClose: () => void
  onSave: (appointment: {
    client: string
    service: string
    barber: string
    date: string
    time: string
    status: string
  }) => void
}

const clients = [
  'Carlos Ramírez',
  'José Hernández',
  'Luis García',
  'Fernando López',
  'Roberto Sánchez',
  'Andrés Torres',
]

const services = [
  { name: 'Corte clásico', duration: 30, price: 150 },
  { name: 'Corte + barba', duration: 45, price: 220 },
  { name: 'Degradado', duration: 45, price: 180 },
  { name: 'Barba', duration: 30, price: 100 },
]

const barbers = ['Miguel', 'Alejandro', 'Daniel']

export default function AppointmentForm({
  appointments,
  onClose,
  onSave,
}: AppointmentFormProps) {
  const [client, setClient] = useState('')
  const [service, setService] = useState('')
  const [barber, setBarber] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [error, setError] = useState('')

  const selectedService = services.find((item) => item.name === service)

    const hasScheduleConflict = () => {
        if (!selectedService || !date || !time || !barber) {
            return false
        }

        const barberIndex = barbers.indexOf(barber)

        if (barberIndex === -1) return false

        const barberId = barberIndex + 1
        const startMinutes = timeToMinutes(time)
        const endMinutes = startMinutes + selectedService.duration

        return appointments.some((appointment) => {
            if (
            appointment.barberId !== barberId ||
            appointment.date !== date ||
            ['Cancelada', 'No asistió'].includes(appointment.status)
            ) {
            return false
            }

            const existingStart = timeToMinutes(appointment.start)
            const existingEnd = timeToMinutes(appointment.end)

            return startMinutes < existingEnd && endMinutes > existingStart
        })
        }

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!client || !service || !barber || !date || !time) {
        setError('Completa todos los campos.')
        return
    }

    if (hasScheduleConflict()) {
        setError('Este barbero ya tiene una cita en ese horario.')
        return
    }

    onSave({
        client,
        service,
        barber,
        date,
        time,
        status: 'Confirmada',
    })
    
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text)]">
              Nueva cita
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Registra una nueva cita para tu barbería.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--background)]"
            aria-label="Cerrar formulario"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text)]">
              Cliente
            </label>
            <div className="relative">
              <UserRound
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <select
                value={client}
                onChange={(event) => setClient(event.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-3 text-sm text-[var(--text)] outline-none focus:border-emerald-500"
              >
                <option value="">Seleccionar cliente</option>
                {clients.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text)]">
              Servicio
            </label>
            <div className="relative">
              <Scissors
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <select
                value={service}
                onChange={(event) => setService(event.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-3 text-sm text-[var(--text)] outline-none focus:border-emerald-500"
              >
                <option value="">Seleccionar servicio</option>
                {services.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedService && (
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                Duración: {selectedService.duration} min · Precio: $
                {selectedService.price} MXN
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text)]">
              Barbero
            </label>
            <select
              value={barber}
              onChange={(event) => setBarber(event.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--text)] outline-none focus:border-emerald-500"
            >
              <option value="">Seleccionar barbero</option>
              {barbers.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">
                Fecha
              </label>
              <div className="relative">
                <CalendarDays
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full min-w-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-2 text-sm text-[var(--text)] outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">
                Hora
              </label>
              <div className="relative">
                <Clock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
                <input
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  className="w-full min-w-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-2 text-sm text-[var(--text)] outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-[var(--border)] pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--background)]"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Crear cita
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
