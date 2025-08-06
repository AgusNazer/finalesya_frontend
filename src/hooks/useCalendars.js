// src/hooks/useCalendars.js
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { calendarService } from '../services/calendarServices'
import { getCuatrimestreByDate, getCalendarioActual } from '../utils/calendarUtils'

export function useCalendars() {
  const { user } = useAuth()
  const userId = user?.id // ← CAMBIAR ESTO
  const [calendarios, setCalendarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Cargar calendarios del usuario
  const cargarCalendarios = async () => {
    if (!userId) return

    setLoading(true)
    setError(null)

    try {
      const result = await calendarService.getCalendarios(userId)
      if (result.success) {
        setCalendarios(result.data)
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError('Error al cargar calendarios', error)
    } finally {
      setLoading(false)
    }
  }

  // Crear calendario manualmente
  const crearCalendario = async (calendarioData) => {
    if (!user?.id) return { success: false, message: 'Usuario no autenticado' }

    setLoading(true)
    const data = { ...calendarioData, usuarioId: user.id }

    try {
      const result = await calendarService.crearCalendario(data)
      if (result.success) {
        await cargarCalendarios() // Recargar lista
      }
      return result
    } catch (error) {
      return { success: false, message: 'Error al crear calendario', error }
    } finally {
      setLoading(false)
    }
  }

  // Obtener o crear calendario automáticamente para una fecha
  const obtenerCalendarioParaFecha = async (fechaExamen) => {
    if (!user?.id) return { success: false, message: 'Usuario no autenticado' }

    try {
      const cuatrimestre = getCuatrimestreByDate(fechaExamen)
      const result = await calendarService.obtenerOCrearCalendario(user.id, cuatrimestre)
      
      if (result.success) {
        // Recargar calendarios si se creó uno nuevo
        await cargarCalendarios()
      }
      
      return result
    } catch (error) {
      return { success: false, message: 'Error al obtener calendario', error }
    }
  }

  // Obtener vista mensual
  const getVistaMensual = async (año, mes) => {
    if (!user?.id) return { success: false, message: 'Usuario no autenticado' }

    try {
      const result = await calendarService.getVistaMensual(user.id, año, mes)
      return result
    } catch (error) {
      return { success: false, message: 'Error al obtener vista mensual', error }
    }
  }

  // Obtener estadísticas
  const getEstadisticas = async () => {
    if (!user?.id) return { success: false, message: 'Usuario no autenticado' }

    try {
      const result = await calendarService.getEstadisticas(user.id)
      return result
    } catch (error) {
      return { success: false, message: 'Error al obtener estadísticas', error }
    }
  }

  // Eliminar calendario
  const eliminarCalendario = async (calendarId) => {
    setLoading(true)

    try {
      const result = await calendarService.eliminarCalendario(calendarId)
      if (result.success) {
        await cargarCalendarios() // Recargar lista
      }
      return result
    } catch (error) {
      return { success: false, message: 'Error al eliminar calendario', error }
    } finally {
      setLoading(false)
    }
  }

  // Buscar calendario por título
  const buscarCalendario = (titulo) => {
    return calendarios.find(cal => cal.title === titulo) || null
  }

  // Obtener calendario actual (cuatrimestre activo)
  const getCalendarioActualInfo = () => {
    const cuatrimestreActual = getCalendarioActual()
    const calendarioExistente = buscarCalendario(cuatrimestreActual.nombre)
    
    return {
      cuatrimestre: cuatrimestreActual,
      calendario: calendarioExistente,
      existe: !!calendarioExistente
    }
  }

  // Cargar automáticamente al montar el hook
  useEffect(() => {
    if (user?.id) {
      cargarCalendarios()
    }
  }, [user?.id])

  return {
    // Estado
    calendarios,
    loading,
    error,
    
    // Métodos
    cargarCalendarios,
    crearCalendario,
    obtenerCalendarioParaFecha,
    eliminarCalendario,
    buscarCalendario,
    getCalendarioActualInfo,
    getVistaMensual,
    getEstadisticas,
    
    // Utilidades
    calendarioActual: getCalendarioActualInfo()
  }
}