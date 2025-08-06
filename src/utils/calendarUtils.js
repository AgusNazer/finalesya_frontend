// src/utils/calendarUtils.js

/**
 * Determina el cuatrimestre según una fecha
 */
export function getCuatrimestreByDate(fecha) {
  const date = new Date(fecha);
  const mes = date.getMonth() + 1; // getMonth() es 0-11, necesitamos 1-12
  const año = date.getFullYear();
  
  if (mes >= 3 && mes <= 7) {
    // Marzo a Julio = Primer Cuatrimestre
    return {
      nombre: `Primer Cuatrimestre ${año}`,
      codigo: `1C${año}`,
      inicio: new Date(año, 2, 1),    // 1 de marzo
      fin: new Date(año, 6, 31),      // 31 de julio
      tipo: 'primer'
    };
  } else if (mes >= 8 && mes <= 12) {
    // Agosto a Diciembre = Segundo Cuatrimestre
    return {
      nombre: `Segundo Cuatrimestre ${año}`,
      codigo: `2C${año}`,
      inicio: new Date(año, 7, 1),    // 1 de agosto
      fin: new Date(año, 11, 31),     // 31 de diciembre
      tipo: 'segundo'
    };
  } else {
    // Enero y Febrero = Verano
    return {
      nombre: `Verano ${año}`,
      codigo: `V${año}`,
      inicio: new Date(año, 0, 1),    // 1 de enero
      fin: new Date(año, 1, 28),      // 28 de febrero (simplificado)
      tipo: 'verano'
    };
  }
}

/**
 * Formatear fecha para mostrar en UI
 */
export function formatearFecha(fecha, formato = 'completo') {
  const date = new Date(fecha);
  const opciones = {
    completo: { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    },
    corto: { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    },
    dia: { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    }
  };
  
  return date.toLocaleDateString('es-AR', opciones[formato]);
}

/**
 * Calcular días restantes hasta una fecha
 */
export function calcularDiasRestantes(fechaExamen) {
  const hoy = new Date();
  const examen = new Date(fechaExamen);
  const diferencia = examen.getTime() - hoy.getTime();
  return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
}

/**
 * Determinar estado del examen según fecha
 */
export function getEstadoExamen(fechaExamen) {
  const diasRestantes = calcularDiasRestantes(fechaExamen);
  
  if (diasRestantes < 0) {
    return { tipo: 'vencido', texto: 'Vencido', color: 'red' };
  } else if (diasRestantes === 0) {
    return { tipo: 'hoy', texto: 'Hoy', color: 'orange' };
  } else if (diasRestantes <= 7) {
    return { tipo: 'esta-semana', texto: 'Esta semana', color: 'yellow' };
  } else if (diasRestantes <= 30) {
    return { tipo: 'este-mes', texto: 'Este mes', color: 'blue' };
  } else {
    return { tipo: 'futuro', texto: 'Próximamente', color: 'green' };
  }
}

/**
 * Obtener el calendario actual (cuatrimestre activo)
 */
export function getCalendarioActual() {
  return getCuatrimestreByDate(new Date());
}

/**
 * Generar lista de cuatrimestres para seleccionar
 */
export function getCuatrimestresDisponibles(añoInicio = 2024, añoFin = 2026) {
  const cuatrimestres = [];
  
  for (let año = añoInicio; año <= añoFin; año++) {
    cuatrimestres.push({
      nombre: `Verano ${año}`,
      codigo: `V${año}`,
      año,
      tipo: 'verano'
    });
    cuatrimestres.push({
      nombre: `Primer Cuatrimestre ${año}`,
      codigo: `1C${año}`,
      año,
      tipo: 'primer'
    });
    cuatrimestres.push({
      nombre: `Segundo Cuatrimestre ${año}`,
      codigo: `2C${año}`,
      año,
      tipo: 'segundo'
    });
  }
  
  return cuatrimestres;
}