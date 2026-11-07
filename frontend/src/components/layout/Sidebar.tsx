
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Scissors,
  UserRound,
  Settings,
  HelpCircle,
  ChevronLeft,
  Moon,
  Sun,
  X,
} from 'lucide-react'

export type Section =
  | 'dashboard'
  | 'agenda'
  | 'clients'
  | 'barbers'
  | 'services'
  | 'settings'

interface SidebarProps {
  activeSection: Section
  onNavigate: (section: Section) => void
  isOpen: boolean
  onClose: () => void
  isDark: boolean
  onToggleTheme: () => void
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'agenda', label: 'Agenda', icon: CalendarDays },
  { id: 'clients', label: 'Clientes', icon: Users },
  { id: 'barbers', label: 'Barberos', icon: UserRound },
  { id: 'services', label: 'Servicios', icon: Scissors },
] as const

function Sidebar({
  activeSection,
  onNavigate,
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
}: SidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[var(--border)] bg-[var(--surface)] transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-[var(--border)] px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-xl text-white">
              ✂
            </div>

            <div>
              <h1 className="text-lg font-bold text-[var(--text)]">
                BarberSaaS
              </h1>
              <p className="text-xs text-[var(--text-muted)]">
                Panel de administración
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--background)] lg:hidden"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Menú principal
          </p>

          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id)
                  onClose()
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                    : 'text-[var(--text-muted)] hover:bg-[var(--background)] hover:text-[var(--text)]'
                }`}
              >
                <Icon size={19} strokeWidth={1.9} />
                {item.label}
              </button>
            )
          })}

          <div className="!mt-8 border-t border-[var(--border)] pt-6">
            <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Administración
            </p>

            <button
              type="button"
              onClick={() => {
                onNavigate('settings')
                onClose()
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                activeSection === 'settings'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                  : 'text-[var(--text-muted)] hover:bg-[var(--background)] hover:text-[var(--text)]'
              }`}
            >
              <Settings size={19} strokeWidth={1.9} />
              Configuración
            </button>
          </div>
        </nav>

        {/* Parte inferior */}
        <div className="space-y-2 border-t border-[var(--border)] p-4">
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-[var(--text-muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--text)]"
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
            {isDark ? 'Modo claro' : 'Modo oscuro'}
          </button>

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-[var(--text-muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--text)]"
          >
            <HelpCircle size={19} />
            Ayuda y soporte
          </button>

          <div className="flex items-center justify-between rounded-xl bg-[var(--background)] p-3">
            <div>
              <p className="text-sm font-semibold text-[var(--text)]">
                Mi barbería
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Plan inicial
              </p>
            </div>
            <ChevronLeft size={17} className="rotate-180 text-[var(--text-muted)]" />
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
