// src/pages/CalendarPage.jsx
import { useState, useEffect } from 'react'
import { useCalendars } from '../hooks/useCalendars'
import { formatearFecha, getEstadoExamen } from '../utils/calendarUtils'
import { useAuth } from '../context/AuthContext'

export function CalendarPage() {
  const [fechaActual, setFechaActual] = useState(new Date())
  const [vistaCalendario, setVistaCalendario] = useState(null)
  const { getVistaMensual, calendarios, loading } = useCalendars()
  

  //debug user auth
   // ← AGREGAR ESTO PARA DEBUG
  const { user } = useAuth()
  console.log('👤 Usuario actual:', user)

  const año = fechaActual.getFullYear()
  const mes = fechaActual.getMonth() + 1

  // Cargar vista mensual
  const cargarVistaMensual = async () => {
    console.log('🔍 Cargando vista mensual para:', año, mes)
    const result = await getVistaMensual(año, mes)
    console.log('📊 Resultado de vista mensual:', result)
    
    if (result.success) {
      console.log('✅ Datos del calendario:', result.data)
      // console.log('📊 Estadísticas específicas:', result.data.statistics)
      // El backend ya devuelve la estructura correcta, usarla directamente
      setVistaCalendario(result.data)
    } else {
      console.log('❌ Error:', result.message)
    }
  }
  useEffect(() => {
    cargarVistaMensual()
  }, [año, mes])

  const navegarMes = (direccion) => {
    const nuevaFecha = new Date(fechaActual)
    nuevaFecha.setMonth(nuevaFecha.getMonth() + direccion)
    setFechaActual(nuevaFecha)
  }

  const nombreMes = fechaActual.toLocaleDateString('es-AR', { 
    month: 'long', 
    year: 'numeric' 
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 dark:text-gray-400">
        <span>Inicio</span> / <span className="text-blue-600 dark:text-blue-400">Calendario</span>
      </nav>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            📅 Calendario de Exámenes
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Organiza y visualiza todos tus exámenes
          </p>
        </div>
      </div>

      {/* Navegación de mes */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navegarMes(-1)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            ← Anterior
          </button>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 capitalize">
            {nombreMes}
          </h2>
          
          <button
            onClick={() => navegarMes(1)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Siguiente →
          </button>
        </div>

        {/* Contenido del calendario */}
        {vistaCalendario ? (
          <div className="space-y-4">
            {/* Estadísticas rápidas */}
            {vistaCalendario.statistics && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {vistaCalendario.statistics.totalExams}
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">Total</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {vistaCalendario.statistics.upcomingExams}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">Próximos</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {vistaCalendario.statistics.examsThisWeek}
                  </div>
                  <div className="text-sm text-yellow-600 dark:text-yellow-400">Esta semana</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {vistaCalendario.statistics.pendingExams}
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-400">Pendientes</div>
                </div>
              </div>
            )}

            {/* Lista de exámenes por fecha */}
            {Object.keys(vistaCalendario.examsByDate || {}).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(vistaCalendario.examsByDate).map(([fecha, examenes]) => (
                  <div key={fecha} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      {formatearFecha(fecha, 'dia')}
                    </h3>
                    <div className="space-y-2">
                      {examenes.map((examen) => {
                        const estado = getEstadoExamen(examen.date)
                        return (
                          <div key={examen.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-gray-100">
                                {examen.subjectName}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {examen.type} • {examen.location || 'Sin ubicación'}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`inline-block px-2 py-1 rounded text-xs font-medium bg-${estado.color}-100 text-${estado.color}-700 dark:bg-${estado.color}-900/20 dark:text-${estado.color}-400`}>
                                {estado.texto}
                              </span>
                              {examen.daysRemaining > 0 && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {examen.daysRemaining} días
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  No hay exámenes en {nombreMes}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  ¡Perfecto momento para relajarse o adelantar estudios!
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📅</div>
            <p className="text-gray-600 dark:text-gray-400">
              Cargando calendario...
            </p>
          </div>
        )}
      </div>

      {/* Info de cuatrimestres */}
      {calendarios.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            📚 Tus Cuatrimestres
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {calendarios.map((calendario) => (
              <div key={calendario.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  {calendario.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {formatearFecha(calendario.startDate, 'corto')} - {formatearFecha(calendario.endDate, 'corto')}
                </p>
                {calendario.isActive && (
                  <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-xs rounded">
                    Activo
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}