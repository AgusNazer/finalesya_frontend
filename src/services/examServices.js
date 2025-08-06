import axios from 'axios';
import { calendarService } from './calendarServices';
import { getCuatrimestreByDate } from '../utils/calendarUtils';

const API_URL = import.meta.env.VITE_API_URL;

// GET /api/exam
export const getExams = async () => {
  const res = await axios.get(`${API_URL}/api/exams`);
  return res.data;
};

// POST /api/exam - CON calendario automtico
export const createExam = async (exam) => {
  try {
    console.log('🔍 Creando examen:', exam);
    
    // 1. Verificar que tenemos userId
    if (!exam.userId) {
      throw new Error('userId es requerido para crear examen');
    }
    
    // 2. Determinar cuatrimestre según fecha del examen
    const cuatrimestreInfo = getCuatrimestreByDate(exam.date);
    console.log('📅 Cuatrimestre detectado:', cuatrimestreInfo.nombre);
    
    // 3. Obtener o crear calendario automáticamente
    const calendarioResult = await calendarService.obtenerOCrearCalendario(
      exam.userId,
      cuatrimestreInfo
    );
    
    if (!calendarioResult.success) {
      throw new Error('Error al crear calendario: ' + calendarioResult.message);
    }
    
    console.log('✅ Calendario obtenido/creado:', calendarioResult.data.title);
    
    // 4. Crear examen asignado al calendario
    const examWithCalendar = {
      ...exam,
      calendarId: calendarioResult.data.id
    };
    
    console.log('📝 Enviando examen con calendario:', examWithCalendar);
    
    const res = await axios.post(`${API_URL}/api/exams`, examWithCalendar);
    return res.data;
    
  } catch (error) {
    console.error('❌ Error al crear examen:', error);
    throw error;
  }
};

// DELETE /api/exam/{id}
export const deleteExam = async (id) => {
  await axios.delete(`${API_URL}/api/exams/${id}`);
};
