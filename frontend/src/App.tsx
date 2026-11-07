
import { useState } from 'react'
import {
  CalendarDays,
  Users,
  UserRound,
  Scissors,
  Clock,
  ArrowUpRight,
} from 'lucide-react'

import Sidebar, { type Section } from './components/layout/Sidebar'
import Header from './components/layout/Header'

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
    label: 'Servicios',
    value: '8',
    detail: 'Servicios disponibles',
    icon: Scissors,
  },
]

const sectionDescriptions: Record<Section, string> = {
  dashboard: 'Aquí tendrás una visión general del funcionamiento de tu barbería.',
  agenda: 'Aquí podrás consultar y administrar las citas de tus clientes.',
  clients: 'Aquí podrás registrar, buscar y consultar el historial de tus clientes.',
  barbers: 'Aquí podrás administrar tu equipo de barberos y sus horarios.',
  services: 'Aquí podrás configurar los servicios, precios y duraciones.',
  settings: 'Aquí podrás configurar los datos y preferencias de tu barbería.',
}

function App() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="flex min-h-screen bg-[var(--background)] text-[var(--text)]">
        <Sidebar
          activeSection={activeSection}
          onNavigate={setActiveSection}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isDark={isDark}
          onToggleTheme={() => setIsDark((current) => !current)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            activeSection={activeSection}
            onOpenMenu={() => setIsSidebarOpen(true)}
          />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {activeSection === 'dashboard' ? (
              <div className="mx-auto max-w-7xl space-y-8">
                {/* Bienvenida */}
                <section>
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    ¡Buenos días!
                  </h1>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    Este es el resumen de actividad de tu barbería.
                  </p>
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

                {/* Próximas citas */}
                <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] p-5">
                    <div>
                      <h2 className="font-semibold">Próximas citas</h2>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        Resumen de las citas de hoy.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveSection('agenda')}
                      className="flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
                    >
                      Ver agenda
                      <ArrowUpRight size={16} />
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
                    <div className="mb-4 rounded-2xl bg-[var(--background)] p-4 text-[var(--text-muted)]">
                      <Clock size={28} />
                    </div>

                    <h3 className="font-semibold">
                      Aquí aparecerán tus próximas citas
                    </h3>

                    <p className="mt-2 max-w-sm text-sm text-[var(--text-muted)]">
                      Cuando conectemos el sistema con la base de datos,
                      podrás consultar las reservaciones de tu barbería.
                    </p>
                  </div>
                </section>
              </div>
            ) : (
              <div className="mx-auto max-w-7xl">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
                  <h1 className="text-xl font-bold">
                    {activeSection === 'clients' && 'Gestión de clientes'}
                    {activeSection === 'agenda' && 'Agenda de citas'}
                    {activeSection === 'barbers' && 'Gestión de barberos'}
                    {activeSection === 'services' && 'Catálogo de servicios'}
                    {activeSection === 'settings' && 'Configuración del negocio'}
                  </h1>

                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    {sectionDescriptions[activeSection]}
                  </p>

                  <p className="mt-6 rounded-xl bg-[var(--background)] p-4 text-sm text-[var(--text-muted)]">
                    Esta sección se desarrollará en una siguiente etapa.
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
