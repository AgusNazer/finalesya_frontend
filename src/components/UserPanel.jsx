import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { createExam } from '../services/examServices';
// Configuración de la API
const API_BASE_URL = 'http://localhost:8080/api';

function UserPanel() {
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();

  // Cargar materias al montar el componente
  useEffect(() => {
    fetchSubjects();
    fetchExams();
  }, []);

  // Obtener materias desde la API
  const fetchSubjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subject`);
      if (response.ok) {
        const data = await response.json();
        setSubjects(data);
      }
    } catch (error) {
      console.error('Error al cargar materias:', error);
    }
  };

  // Obtener exámenes desde la API
  const fetchExams = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/exams`);
      if (response.ok) {
        const data = await response.json();
        setExams(data);
      }
    } catch (error) {
      console.error('Error al cargar exámenes:', error);
    }
  };

  // Crear examen en la API
// Crear examen en la API
const handleAddExam = async () => {
  if (!type || !date || !subjectId) {
    setError("Completa tipo, fecha y materia");
    return;
  }

  setLoading(true);
  setError('');

  try {
    const examData = {
      type: type,
      date: new Date(date).toISOString(),
      location: location || null,
      passed: null,
      subjectId: parseInt(subjectId),
      userId: user.id // ← AGREGAR ESTA LÍNEA
    };

    // Usar tu función createExam en lugar de fetch directo
    const createdExam = await createExam(examData);
    
    // Actualizar la lista local
    setExams([...exams, createdExam]);
    
    // Limpiar formulario
    setType('');
    setDate('');
    setLocation('');
    setSubjectId('');
    
    setError('');
    
  } catch (error) {
    setError('Error al crear el examen: ' + error.message);
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
};
  // Eliminar examen
const handleDeleteExam = async (examId) => {
  if (!window.confirm('¿Estás seguro de que quieres eliminar este examen?')) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/exams/${examId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchExams(); // Recargar lista
      setError('');
    } else {
      setError('Error al eliminar el examen');
    }
  } catch (error) {
    setError('Error de conexión', error);
  }
};
//eliminar materias
const handleDeleteSubject = async (subjectId) => {
  if (!window.confirm('¿Estás seguro de que quieres eliminar esta materia?')) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/subject/${subjectId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchSubjects(); // Refrescar lista de materias
      setError('');
    } else {
      setError('Error al eliminar la materia');
    }
  } catch (error) {
    console.error('Error:', error);
    setError('Error de conexión al eliminar la materia');
  }
};


  return (
    <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 pb-3">
        📚 Panel del Usuario
      </h2>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* Formulario */}
      <div className="mb-8 space-y-4">
        {/* Tipo de examen */}
        <div>
          <label className="block text-sm font-medium mb-2">Tipo de examen</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
          >
            <option value="">Seleccionar tipo</option>
            <option value="Parcial">Parcial</option>
            <option value="Final">Final</option>
            <option value="Recuperatorio">Recuperatorio</option>
            <option value="Oral">Oral</option>
          </select>
        </div>

        {/* Materia */}
        <div>
          <label className="block text-sm font-medium mb-2">Materia</label>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
          >
            <option value="">Seleccionar materia</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name} - {subject.major}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha y ubicación */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Fecha del examen</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Ubicación (opcional)</label>
            <input
              type="text"
              placeholder="Ej: Aula 205, Laboratorio A"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
            />
          </div>
        </div>

        {/* Botón */}
        <button
          onClick={handleAddExam}
          disabled={loading}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Creando...' : '➕ Agregar Examen'}
        </button>
      </div>

      {/* lista de materias para eliminar */}
       {/* Lista de materias */}
<div className="mt-10">
  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
    📘 Materias Registradas
    <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-2 py-1 rounded-full">
      {subjects.length}
    </span>
  </h3>

  {subjects.length === 0 ? (
    <p className="text-gray-500 dark:text-gray-400">No hay materias registradas aún.</p>
  ) : (
    <ul className="space-y-2">
      {subjects.map((subject) => (
        <li
          key={subject.id}
          className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors"
        >
          <div>
            <span className="font-medium text-gray-900 dark:text-gray-100">{subject.name}</span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({subject.major})</span>
            <span className="ml-2 text-sm text-gray-400">📅 {subject.yearTaken}</span>
          </div>
          <button
            onClick={() => handleDeleteSubject(subject.id)}
            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 rounded-lg"
            title="Eliminar materia"
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  )}
</div>



      {/* Lista de exámenes */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
          📝 Exámenes Programados
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-2 py-1 rounded-full">
            {exams.length}
          </span>
        </h3>
        
        {exams.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">📭</div>
            <p className="text-gray-500 dark:text-gray-400">
              No hay exámenes programados todavía
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Agrega tu primer examen para comenzar
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {exams.map((exam) => (
              <li
                key={exam.id}
                className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 px-5 py-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                      📖 {exam.subjectName}
                    </span>
                    <span className="ml-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      {exam.type}
                    </span>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">📅</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {new Date(exam.date).toLocaleDateString('es-ES', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    {exam.location && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        📍 {exam.location}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Indicador de tiempo restante */}
                <div className="mt-2 text-xs">
                  {(() => {
                    const today = new Date();
                    const examDate = new Date(exam.date);
                    const diffTime = examDate - today;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    if (diffDays < 0) {
                      return (
                        <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full">
                          ⏰ Pasado ({Math.abs(diffDays)} días)
                        </span>
                      );
                    } else if (diffDays === 0) {
                      return (
                        <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full animate-pulse">
                          🚨 ¡Hoy!
                        </span>
                      );
                    } else if (diffDays <= 7) {
                      return (
                        <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full">
                          ⚡ En {diffDays} día{diffDays !== 1 ? 's' : ''}
                        </span>
                      );
                    } else {
                      return (
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                          ✅ En {diffDays} días
                        </span>
                      );
                    }
                  })()}
                </div>

<button
  onClick={() => handleDeleteExam(exam.id)}
  className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
  title="Eliminar examen"
>
  🗑️
</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserPanel;