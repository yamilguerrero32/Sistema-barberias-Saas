import AppointmentForm from './AppointmentForm'
import { useMemo, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  List,
  Columns3,
  Clock,
  Plus,
  Filter,
  MoreHorizontal,
  UserRound,
} from 'lucide-react'

type ViewMode = 'day' | 'week' | 'list'

type AppointmentStatus =
  | 'Pendiente'
  | 'Confirmada'
  | 'En espera'
  | 'En servicio'
  | 'Completada'
  | 'Cancelada'
  | 'No asistió'

interface Barber {
  id: number
  name: string
}

interface Appointment {
  id: number
  client: string
  service: string
  barberId: number
  date: string
  start: string
  end: string
  status: AppointmentStatus
}

const barbers: Barber[] = [
  { id: 1, name: 'Miguel' },
  { id: 2, name: 'Alejandro' },
  { id: 3, name: 'Daniel' },
]

const initialAppointments: Appointment[] = [
  {
    id: 1,
    client: 'Carlos Ramírez',
    service: 'Corte clásico',
    barberId: 1,
    date: '2026-11-06',
    start: '09:00',
    end: '09:30',
    status: 'Confirmada',
  },
  {
    id: 2,
    client: 'José Hernández',
    service: 'Corte + barba',
    barberId: 2,
    date: '2026-11-06',
    start: '09:30',
    end: '10:15',
    status: 'Pendiente',
  },
  {
    id: 3,
    client: 'Luis García',
    service: 'Degradado',
    barberId: 1,
    date: '2026-11-06',
    start: '10:00',
    end: '10:45',
    status: 'En servicio',
  },
  {
    id: 4,
    client: 'Fernando López',
    service: 'Corte clásico',
    barberId: 3,
    date: '2026-11-06',
    start: '11:00',
    end: '11:30',
    status: 'Completada',
  },
  {
    id: 5,
    client: 'Roberto Sánchez',
    service: 'Barba',
    barberId: 2,
    date: '2026-11-06',
    start: '12:00',
    end: '12:30',
    status: 'En espera',
  },
  {
    id: 6,
    client: 'Andrés Torres',
    service: 'Corte clásico',
    barberId: 1,
    date: '2026-11-07',
    start: '10:00',
    end: '10:30',
    status: 'Confirmada',
  },
]

const statuses: AppointmentStatus[] = [
  'Pendiente',
  'Confirmada',
  'En espera',
  'En servicio',
  'Completada',
  'Cancelada',
  'No asistió',
]

const statusStyles: Record<AppointmentStatus, string> = {
  Pendiente:
    'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900',
  Confirmada:
    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900',
  'En espera':
    'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-900',
  'En servicio':
    'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-900',
  Completada:
    'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900',
  Cancelada:
    'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900',
  'No asistió':
    'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700',
}

function dateToString(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function addDays(date: Date, amount: number) {
  const result = new Date(date)
  result.setDate(result.getDate() + amount)
  return result
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'short',
    day: 'numeric',
  }).format(date)
}

const serviceDurations: Record<string, number> = {
  'Corte clásico': 30,
  'Corte + barba': 45,
  Degradado: 45,
  Barba: 30,
}

function addMinutesToTime(time: string, minutes: number) {
  const [hours, mins] = time.split(':').map(Number)
  const totalMinutes = hours * 60 + mins + minutes

  const endHours = Math.floor(totalMinutes / 60)
  const endMinutes = totalMinutes % 60

  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`
}

function Agenda() {
  const [selectedDate, setSelectedDate] = useState(
    new Date(2026, 10, 6),
  )

  const [view, setView] = useState<ViewMode>('day')
  const [selectedBarber, setSelectedBarber] = useState('all')
  const [appointments, setAppointments] = useState(initialAppointments)
  const [isAppointmentFormOpen, setIsAppointmentFormOpen] = useState(false)

  const weekDates = useMemo(() => {
    const day = selectedDate.getDay()
    const mondayOffset = day === 0 ? -6 : 1 - day

    const monday = addDays(selectedDate, mondayOffset)

    return Array.from({ length: 7 }, (_, index) =>
      addDays(monday, index),
    )
  }, [selectedDate])

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((appointment) => {
        if (selectedBarber === 'all') return true
        return appointment.barberId === Number(selectedBarber)
      })
      .filter((appointment) => {
        if (view === 'week') {
          const firstDay = dateToString(weekDates[0])
          const lastDay = dateToString(weekDates[6])

          return (
            appointment.date >= firstDay &&
            appointment.date <= lastDay
          )
        }

        return appointment.date === dateToString(selectedDate)
      })
      .sort((a, b) => a.start.localeCompare(b.start))
  }, [appointments, selectedBarber, selectedDate, view, weekDates])

  const changeStatus = (id: number, status: AppointmentStatus) => {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status }
          : appointment,
      ),
    )
  }

  const changeDate = (amount: number) => {
    setSelectedDate((current) =>
      addDays(current, view === 'week' ? amount * 7 : amount),
    )
  }

  const getBarberName = (id: number) => {
    return barbers.find((barber) => barber.id === id)?.name ?? 'Sin asignar'
  }

  const visibleBarbers =
    selectedBarber === 'all'
      ? barbers
      : barbers.filter((barber) => barber.id === Number(selectedBarber))

  const isBlocking = (status: AppointmentStatus) =>
    !['Cancelada', 'No asistió'].includes(status)

  const renderAppointment = (appointment: Appointment) => (
    <article
      key={appointment.id}
      className={`rounded-xl border p-3 transition-colors ${
        isBlocking(appointment.status)
          ? 'border-[var(--border)] bg-[var(--surface)]'
          : 'border-dashed border-[var(--border)] bg-[var(--background)] opacity-60'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">
            {appointment.client}
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            {appointment.service}
          </p>
        </div>

        <MoreHorizontal
          size={18}
          className="shrink-0 text-[var(--text-muted)]"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
        <Clock size={14} />
        {appointment.start} - {appointment.end}
      </div>

      {view === 'week' && (
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          {getBarberName(appointment.barberId)}
        </p>
      )}

      <div className="mt-3">
        <select
          value={appointment.status}
          onChange={(event) =>
            changeStatus(
              appointment.id,
              event.target.value as AppointmentStatus,
            )
          }
          aria-label={`Estado de la cita de ${appointment.client}`}
          className={`max-w-full rounded-full border px-2.5 py-1 text-xs font-medium outline-none ${statusStyles[appointment.status]}`}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
          {isAppointmentFormOpen && (
  <AppointmentForm
    appointments={appointments}
    onClose={() => setIsAppointmentFormOpen(false)}
    onSave={(data) => {
      const selectedBarberData = barbers.find(
        (barber) => barber.name === data.barber,
      )

      if (!selectedBarberData) return

      const duration = serviceDurations[data.service]

      if (!duration) return

      const newAppointment: Appointment = {
        id:
          Math.max(0, ...appointments.map((appointment) => appointment.id)) +
          1,
        client: data.client,
        service: data.service,
        barberId: selectedBarberData.id,
        date: data.date,
        start: data.time,
        end: addMinutesToTime(data.time, duration),
        status: 'Confirmada',
      }

      setAppointments((current) => [...current, newAppointment])

      setSelectedDate(new Date(`${data.date}T12:00:00`))
      setSelectedBarber('all')
      setView('day')
    }}
  />
)}
        
      </div>
    </article>
  )

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Encabezado */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Agenda de citas
          </h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Organiza los horarios y reservaciones de tu barbería.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAppointmentFormOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          <Plus size={18} />
          Nueva cita
        </button>
      </section>

      {/* Controles */}
      <section className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => changeDate(-1)}
            aria-label="Fecha anterior"
            className="rounded-lg border border-[var(--border)] p-2 hover:bg-[var(--background)]"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => setSelectedDate(new Date(2026, 10, 6))}
            className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium hover:bg-[var(--background)]"
          >
            Hoy
          </button>

          <button
            type="button"
            onClick={() => changeDate(1)}
            aria-label="Fecha siguiente"
            className="rounded-lg border border-[var(--border)] p-2 hover:bg-[var(--background)]"
          >
            <ChevronRight size={18} />
          </button>

          <div className="ml-1 flex items-center gap-2 text-sm font-semibold capitalize">
            <CalendarDays size={17} className="text-emerald-600" />
            {view === 'week'
              ? `${formatShortDate(weekDates[0])} - ${formatShortDate(weekDates[6])}`
              : formatDate(selectedDate)}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2">
            <Filter size={16} className="text-[var(--text-muted)]" />

            <select
              value={selectedBarber}
              onChange={(event) => setSelectedBarber(event.target.value)}
              className="max-w-36 bg-transparent text-sm outline-none"
            >
              <option value="all">Todos los barberos</option>

              {barbers.map((barber) => (
                <option key={barber.id} value={barber.id}>
                  {barber.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex rounded-lg border border-[var(--border)] p-1">
            <button
              type="button"
              onClick={() => setView('day')}
              title="Vista diaria"
              className={`rounded-md p-2 ${
                view === 'day'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                  : 'text-[var(--text-muted)] hover:bg-[var(--background)]'
              }`}
            >
              <Columns3 size={17} />
            </button>

            <button
              type="button"
              onClick={() => setView('week')}
              title="Vista semanal"
              className={`rounded-md p-2 ${
                view === 'week'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                  : 'text-[var(--text-muted)] hover:bg-[var(--background)]'
              }`}
            >
              <CalendarDays size={17} />
            </button>

            <button
              type="button"
              onClick={() => setView('list')}
              title="Vista de lista"
              className={`rounded-md p-2 ${
                view === 'list'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                  : 'text-[var(--text-muted)] hover:bg-[var(--background)]'
              }`}
            >
              <List size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* Vista diaria */}
      {view === 'day' && (
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {visibleBarbers.map((barber) => {
            const barberAppointments = filteredAppointments.filter(
              (appointment) => appointment.barberId === barber.id,
            )

            return (
              <div
                key={barber.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              >
                <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                      <UserRound size={19} />
                    </div>

                    <div>
                      <p className="font-semibold">{barber.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {barberAppointments.length} citas
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-4">
                  {barberAppointments.length > 0 ? (
                    barberAppointments.map(renderAppointment)
                  ) : (
                    <p className="py-8 text-center text-sm text-[var(--text-muted)]">
                      No hay citas programadas.
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </section>
      )}

      {/* Vista semanal */}
      {view === 'week' && (
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {weekDates.map((date) => {
            const dateString = dateToString(date)

            const dayAppointments = filteredAppointments.filter(
              (appointment) => appointment.date === dateString,
            )

            return (
              <div
                key={dateString}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              >
                <button
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`w-full border-b border-[var(--border)] p-4 text-left ${
                    dateString === dateToString(selectedDate)
                      ? 'bg-emerald-50 dark:bg-emerald-950/30'
                      : ''
                  }`}
                >
                  <p className="text-sm font-semibold capitalize">
                    {formatShortDate(date)}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {dayAppointments.length} citas
                  </p>
                </button>

                <div className="space-y-3 p-3">
                  {dayAppointments.length > 0 ? (
                    dayAppointments.map(renderAppointment)
                  ) : (
                    <p className="py-5 text-center text-xs text-[var(--text-muted)]">
                      Sin citas
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </section>
      )}

      {/* Vista de lista */}
      {view === 'list' && (
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] p-5">
            <h2 className="font-semibold">Citas del día</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {filteredAppointments.length} citas registradas
            </p>
          </div>

          <div className="space-y-3 p-4">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col gap-3 rounded-xl border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                      <Clock size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        {appointment.client}
                      </p>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {appointment.service} · {getBarberName(appointment.barberId)}
                      </p>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {appointment.start} - {appointment.end}
                      </p>
                    </div>
                  </div>

                  <select
                    value={appointment.status}
                    onChange={(event) =>
                      changeStatus(
                        appointment.id,
                        event.target.value as AppointmentStatus,
                      )
                    }
                    className={`w-fit rounded-full border px-3 py-1.5 text-xs font-medium outline-none ${statusStyles[appointment.status]}`}
                    aria-label={`Estado de la cita de ${appointment.client}`}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            ) : (
              <p className="py-10 text-center text-sm text-[var(--text-muted)]">
                No hay citas para esta fecha.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

export default Agenda
