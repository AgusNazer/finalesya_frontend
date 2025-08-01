import { Link } from 'react-router-dom'
import UserPanel from '../components/UserPanel'

function HomePage() {
  return (
    <>
      {/* Card de bienvenida */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          ¡Bienvenido a tu organizador de exámenes! 🎯
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Gestiona tus materias, programa tus exámenes y mantén todo organizado en tu calendario personal.
        </p>
        
        {/* Enlaces de navegación */}
        <div className="flex flex-wrap gap-3">
          <Link 
            to="/mipanel"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            📚 Mi Panel
          </Link>
          <Link 
            to="/calendario"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            📅 Calendario
          </Link>
          <Link 
            to="/materias"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            📖 Materias
          </Link>
        </div>
      </div>

      {/* Panel de usuario */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <UserPanel />
      </div>
    </>
  )
}

export default HomePage