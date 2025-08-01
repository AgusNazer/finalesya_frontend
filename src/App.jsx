import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import ThemeToggle from './components/ThemeToggle'
import HomePage from './pages/HomePage'
import MyPanelPage from './pages/MyPanelPage'
import { CalendarPage } from './pages/CalendarPage'

// Componente para el header con navegación
function AppHeader() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', name: 'Inicio', icon: '🏠' },
    { path: '/mipanel', name: 'Mi Panel', icon: '📚' },
    { path: '/calendario', name: 'Calendario', icon: '📅' },
    { path: '/materias', name: 'Materias', icon: '📖' },
  ]

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            Finales Ya! 📚
          </Link>
          
          {/* Navegación (oculta en móvil) */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <ThemeToggle />
        </div>
        
        {/* Navegación móvil */}
        <nav className="md:hidden mt-4 flex space-x-2 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/* Tu header existente con navegación agregada */}
        <AppHeader />

        {/* Contenido principal */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mipanel" element={<MyPanelPage />} />
            <Route path="/calendario" element={<CalendarPage />} />
            {/* <Route path="/materias" element={<MateriasPage />} /> */}
            <Route path="*" element={
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Página no encontrada
                </h1>
                <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                  ← Volver al inicio
                </Link>
              </div>
            } />
          </Routes>
        </main>

        {/* Tu footer existente */}
        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            Desarrollado con por AGUS NAZER, usando React y .NET
          </p>
        </footer>
      </div>
    </Router>
  )
}

export default App