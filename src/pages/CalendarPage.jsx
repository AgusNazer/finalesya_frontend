// src/pages/CalendarioPage.jsx
export function CalendarPage() {
  return (
    <div className="space-y-6">
      <nav className="text-sm text-gray-500 dark:text-gray-400">
        <span>Inicio</span> / <span className="text-blue-600 dark:text-blue-400">Calendario</span>
      </nav>

      <div className="text-center py-16">
        <div className="text-6xl mb-4">📅</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Calendario de Exámenes
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Aquí aparecerá tu calendario interactivo con todos los exámenes
        </p>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            🚧 Próximamente: Vista de calendario con filtros por materia, 
            recordatorios y sincronización con tu calendario personal.
          </p>
        </div>
      </div>
    </div>
  )
}

// src/pages/MateriasPage.jsx
export function MateriasPage() {
  return (
    <div className="space-y-6">
      <nav className="text-sm text-gray-500 dark:text-gray-400">
        <span>Inicio</span> / <span className="text-blue-600 dark:text-blue-400">Materias</span>
      </nav>

      <div className="text-center py-16">
        <div className="text-6xl mb-4">📖</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Gestión de Materias
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Administra todas tus materias universitarias
        </p>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            🚧 Próximamente: CRUD completo de materias, profesores, 
            horarios y conexión con la API backend.
          </p>
        </div>
      </div>
    </div>
  )
}