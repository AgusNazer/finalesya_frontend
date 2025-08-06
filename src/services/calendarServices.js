// src/services/calendarService.js
import axios from 'axios'

const API_BASE_URL = 'http://localhost:10000/api'

// Configurar axios para incluir cookies
axios.defaults.withCredentials = true

export const calendarService = {
  // Obtener todos los calendarios del usuario
  async getCalendarios(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/calendars/user/${userId}`)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al obtener calendarios' 
      }
    }
  },

  // Crear un nuevo calendario
  async crearCalendario(calendarioData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/calendars`, calendarioData)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al crear calendario' 
      }
    }
  },

  // Buscar calendario por título y usuario
  async buscarCalendarioPorTitulo(userId, titulo) {
    try {
      const result = await this.getCalendarios(userId)
      if (result.success) {
        const calendario = result.data.find(cal => cal.title === titulo)
        return { success: true, data: calendario || null }
      }
      return result
    } catch (error) {
      return { 
        success: false, 
        message: 'Error al buscar calendario' , error
      }
    }
  },

  // Obtener o crear calendario automáticamente según cuatrimestre
  async obtenerOCrearCalendario(userId, cuatrimestreInfo) {
    try {
      // Primero buscar si ya existe
      const busqueda = await this.buscarCalendarioPorTitulo(userId, cuatrimestreInfo.nombre)
      
      if (busqueda.success && busqueda.data) {
        // Ya existe, devolverlo
        return { success: true, data: busqueda.data }
      }

      // No existe, crearlo
      const nuevoCalendario = {
        title: cuatrimestreInfo.nombre,
        startDate: cuatrimestreInfo.inicio.toISOString(),
        endDate: cuatrimestreInfo.fin.toISOString(),
        description: `Calendario automático para ${cuatrimestreInfo.nombre}`,
        isActive: true,
        usuarioId: userId
      }

      return await this.crearCalendario(nuevoCalendario)
    } catch (error) {
      return { 
        success: false, 
        message: 'Error al obtener o crear calendario', error 
      }
    }
  },

  // Obtener vista mensual del calendario
  async getVistaMensual(userId, año, mes) {
    try {
      const response = await axios.get(`${API_BASE_URL}/calendars/user/${userId}/view/${año}/${mes}`)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al obtener vista mensual' 
      }
    }
  },

  // Obtener exámenes de un usuario en rango de fechas
  async getExamenesUsuario(userId, fechaInicio, fechaFin) {
    try {
      const response = await axios.get(`${API_BASE_URL}/calendars/user/${userId}/exams`, {
        params: {
          startDate: fechaInicio,
          endDate: fechaFin
        }
      })
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al obtener exámenes' 
      }
    }
  },

  // Obtener estadísticas del calendario
  async getEstadisticas(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/calendars/user/${userId}/statistics`)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al obtener estadísticas' 
      }
    }
  },

  // Obtener calendario específico por ID
  async getCalendario(calendarId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/calendars/${calendarId}`)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al obtener calendario' 
      }
    }
  },

  // Actualizar calendario
  async actualizarCalendario(calendarId, calendarioData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/calendars/${calendarId}`, calendarioData)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al actualizar calendario' 
      }
    }
  },

  // Eliminar calendario
  async eliminarCalendario(calendarId) {
    try {
      await axios.delete(`${API_BASE_URL}/calendars/${calendarId}`)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al eliminar calendario' 
      }
    }
  }
}