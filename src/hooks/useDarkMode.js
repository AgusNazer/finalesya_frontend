import { useState, useEffect } from 'react'

export function useDarkMode() {
  // Verificar preferencia guardada o preferencia del sistema
  const [isDark, setIsDark] = useState(() => {
    // Intentar obtener preferencia guardada
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      return JSON.parse(saved)
    }
    
    // Si no hay preferencia guardada, usar preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Aplicar la clase al documentElement
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Guardar preferencia en localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDark))
  }, [isDark])

  // Función para alternar tema
  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }

  return { isDark, toggleDarkMode }
}