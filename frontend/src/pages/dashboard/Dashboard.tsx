
import {
  CalendarDays,
  Users,
  UserRound,
  DollarSign,
  Clock,
  ArrowUpRight,
  MoreHorizontal,
} from 'lucide-react'

const stats = [
  {
    label: 'Citas de hoy',
    value: '12',
    detail: 'Citas programadas',
    icon: CalendarDays,
  },
  {
    label: 'Clientes',
    value: '248',
    detail: 'Clientes registrados',
    icon: Users,
  },
  {
    label: 'Barberos',
    value: '3',
    detail: 'Miembros del equipo',
    icon: UserRound,
  },
  {
    label: 'Ingresos de hoy',
    value: '$2,450',
    detail: 'Ingresos de ejemplo',
    icon: DollarSign,
  },
]

const appointments = [
  {
    time: '09:00 AM',
    client: 'Carlos Ramírez',
    service: 'Corte clásico',
    barber: 'Miguel',
    status: 'Confirmada',
  },
  {
    time: '10:00 AM',
    client: 'José Hernández',
    service: 'Corte + barba',
    barber: 'Alejandro',
    status: 'Pendiente',
  },
  {
    time: '11:30 AM',
    client: 'Luis García',
    service: 'Degradado',
    barber: 'Miguel',
    status: 'Confirmada',
  },
  {
    time: '12:30 PM',
    client: 'Fernando López',
    service: 'Corte clásico',
    barber: 'Daniel',
    status: 'Completada',
  },
]

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Bienvenida */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              ¡Buenos días!
            </h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Aquí tienes el resumen de actividad de tu barbería.
            </p>
          </div>

          <span className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text-muted)]">
            Resumen de hoy
          </span>
        </div>
      </section>

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <article
              key={stat.label}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[var(--text-muted)]">
                  {stat.label}
                </p>

                <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-5 text-3xl font-bold tracking-tight">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                {stat.detail}
              </p>
            </article>
          )
        })}
      </section>

      {/* Citas y actividad */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]">

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] p-5">
          <div>
            <h2 className="font-semibold">Próximas citas</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Consulta las reservaciones programadas.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
          >
            Ver agenda
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Tabla de citas */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-muted)]">
                <th className="px-5 py-4 font-medium">Horario</th>
                <th className="px-5 py-4 font-medium">Cliente</th>
                <th className="px-5 py-4 font-medium">Servicio</th>
                <th className="px-5 py-4 font-medium">Barbero</th>
                <th className="px-5 py-4 font-medium">Estado</th>
                <th className="px-5 py-4"></th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={`${appointment.time}-${appointment.client}`}
                  className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--background)]"
                >
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <Clock size={15} />
                      {appointment.time}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-medium">
                    {appointment.client}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-[var(--text-muted)]">
                    {appointment.service}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-[var(--text-muted)]">
                    {appointment.barber}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        appointment.status === 'Confirmada'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                          : appointment.status === 'Pendiente'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      aria-label="Más opciones"
                      className="rounded-lg p-1 text-[var(--text-muted)] hover:bg-[var(--background)]"
                    >
                      <MoreHorizontal size={19} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}

export default Dashboard
