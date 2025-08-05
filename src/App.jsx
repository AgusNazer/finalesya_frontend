import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext' // ← NUEVO
import ThemeToggle from './components/ThemeToggle'
import HomePage from './pages/HomePage'
import MyPanelPage from './pages/MyPanelPage'
import LoginPage from './pages/LoginPage' // ← NUEVO
import { CalendarPage } from './pages/CalendarPage'

// ← NUEVO: Componente para proteger rutas
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />
}

// Componente para el header con navegación
function AppHeader() {
  const location = useLocation()
  const { user, logout, isAuthenticated } = useAuth() // ← NUEVO
  
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

          {/* ← NUEVO: Botones de login/logout */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
                  👋 {user?.name}
                </span>
                <button
                  onClick={() => logout()}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                >
                  Salir
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
              >
                Login
              </Link>
            )}
            <ThemeToggle />
          </div>
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

// ← NUEVO: Separar contenido para usar AuthProvider
function AppContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <AppHeader />

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} /> {/* ← NUEVO */}
          
          {/* ← NUEVO: Rutas protegidas */}
          <Route path="/mipanel" element={
            <ProtectedRoute><MyPanelPage /></ProtectedRoute>
          } />
          <Route path="/calendario" element={
            <ProtectedRoute><CalendarPage /></ProtectedRoute>
          } />
          
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

      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
        <p className="text-sm">
          Desarrollado por AGUS NAZER con .NET
        </p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider> {/* ← NUEVO: Wrapper */}
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App