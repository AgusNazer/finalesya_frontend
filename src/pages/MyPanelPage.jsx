import SubjectForm from '../components/SubjectForm'
import UserPanel from '../components/UserPanel'


function MyPanelPage() {


  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 dark:text-gray-400">
        <span>Inicio</span> / <span className="text-blue-600 dark:text-blue-400">Mi Panel</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          📚 Mi Panel de Exámenes
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Gestiona y organiza todos tus exámenes desde aquí
        </p>
      </div>

      {/* User Panel Component */}
      <SubjectForm/>
      <UserPanel />

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            📊 Estadísticas Rápidas
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Próximamente: visualiza tus estadísticas de exámenes
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            🔔 Recordatorios
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Próximamente: configura recordatorios automáticos
          </p>
        </div>
      </div>
    </div>
  )
}

export default MyPanelPage