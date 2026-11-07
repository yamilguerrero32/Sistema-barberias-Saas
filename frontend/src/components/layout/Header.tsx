
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
} from 'lucide-react'

import type { Section } from './Sidebar'

interface HeaderProps {
  activeSection: Section
  onOpenMenu: () => void
}

const sectionTitles: Record<Section, { title: string; description: string }> = {
  dashboard: {
    title: 'Dashboard',
    description: 'Resumen general de tu barbería.',
  },
  agenda: {
    title: 'Agenda',
    description: 'Administra las citas y horarios.',
  },
  clients: {
    title: 'Clientes',
    description: 'Consulta y administra tus clientes.',
  },
  barbers: {
    title: 'Barberos',
    description: 'Gestiona tu equipo de trabajo.',
  },
  services: {
    title: 'Servicios',
    description: 'Administra los servicios de tu barbería.',
  },
  settings: {
    title: 'Configuración',
    description: 'Personaliza y administra tu negocio.',
  },
}

function Header({ activeSection, onOpenMenu }: HeaderProps) {
  const currentSection = sectionTitles[activeSection]

  return (
    <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-4 border-b border-[var(--border)] bg-[var(--surface)] px-4 sm:px-6 lg:px-8">
      {/* Título y menú móvil */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMenu}
          className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--background)] lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu size={21} />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold text-[var(--text)] sm:text-xl">
            {currentSection.title}
          </h2>
          <p className="hidden text-sm text-[var(--text-muted)] sm:block">
            {currentSection.description}
          </p>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Buscador */}
        <div className="hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 md:flex">
          <Search size={17} className="text-[var(--text-muted)]" />
          <input
            type="search"
            placeholder="Buscar..."
            className="w-36 bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] lg:w-48"
          />
          <kbd className="hidden rounded border border-[var(--border)] px-1.5 py-0.5 text-xs text-[var(--text-muted)] lg:block">
            /
          </kbd>
        </div>

        {/* Notificaciones */}
        <button
          type="button"
          aria-label="Notificaciones"
          className="relative rounded-xl p-2.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--background)]"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-[var(--surface)] bg-emerald-500" />
        </button>

        {/* Perfil */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-[var(--background)]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
            AD
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-[var(--text)]">
              Administrador
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Propietario
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-[var(--text-muted)] sm:block"
          />
        </button>
      </div>
    </header>
  )
}

export default Header
