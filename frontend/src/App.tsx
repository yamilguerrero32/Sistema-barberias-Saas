
import { useState } from 'react'

import Sidebar, { type Section } from './components/layout/Sidebar'
import Header from './components/layout/Header'
import Dashboard from './pages/dashboard/Dashboard'
import Agenda from './pages/agenda/Agenda'

const sectionDescriptions: Record<Exclude<Section, 'dashboard'>, string> = {
  agenda: 'Aquí podrás consultar y administrar las citas de tus clientes.',
  clients: 'Aquí podrás registrar, buscar y consultar el historial de tus clientes.',
  barbers: 'Aquí podrás administrar tu equipo de barberos y sus horarios.',
  services: 'Aquí podrás configurar los servicios, precios y duraciones.',
  settings: 'Aquí podrás configurar los datos y preferencias de tu barbería.',
}

const sectionTitles: Record<Exclude<Section, 'dashboard'>, string> = {
  agenda: 'Agenda de citas',
  clients: 'Gestión de clientes',
  barbers: 'Gestión de barberos',
  services: 'Catálogo de servicios',
  settings: 'Configuración del negocio',
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
              <Dashboard />
            ) : activeSection === 'agenda' ? (
              <Agenda />
            ) : (
              <div className="mx-auto max-w-7xl">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
                  <h1 className="text-xl font-bold">
                    {sectionTitles[activeSection]}
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
