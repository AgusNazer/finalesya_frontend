import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

// Configurar axios con la URL base
// axios.defaults.baseURL = 'http://localhost:10000'//devvelopment
//production
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true // Para enviar cookies

//enviar token en cada request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Verificar si el usuario está logueado al cargar la app
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/Auth/me')
      console.log('✅ Datos completos del usuario:', response.data)//debug
      setUser(response.data)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('api/Auth/login', { email, password })
      //guardar jwt
      localStorage.setItem('token', response.data.token)
      await checkAuth() // Recargar datos del usuario
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al iniciar sesión' 
      }
    }
  }

  const logout = async () => {
    try {
      localStorage.removeItem('token')
      await axios.post('/api/Auth/logout')
      setUser(null)
      return { success: true }
    } catch (error) {
      setUser(null) // Logout local aunque falle el server
      return { success: true }
    }
  }

  const value = {
    user,
    login,
    logout,
    register,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

// En AuthContext.jsx, agregar este método:
const register = async (userData) => {
  try {
    const response = await axios.post('/api/Auth/register', userData)
    return { success: true, data: response.data }
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Error al registrar usuario' 
    }
  }
}
