import { useState } from 'react';

function UserPanel() {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [exams, setExams] = useState([]);

  const handleAddExam = () => {
    if (!subject || !date) return alert("Completa todos los campos");

    const newExam = { subject, date };
    setExams([...exams, newExam]);

    setSubject('');
    setDate('');
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 pb-3">
        📚 Panel del Usuario
      </h2>

      {/* Formulario */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:flex-wrap md:gap-4">
        <input
          type="text"
          placeholder="Materia"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full md:flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full md:w-auto bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
        />
        <button
          onClick={handleAddExam}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        >
          ➕ Agregar Examen
        </button>
      </div>

      {/* Lista de exámenes */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
          📝 Exámenes Agregados
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-2 py-1 rounded-full">
            {exams.length}
          </span>
        </h3>
        
        {exams.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">📭</div>
            <p className="text-gray-500 dark:text-gray-400">
              No hay exámenes agregados todavía
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Agrega tu primera materia y fecha para comenzar
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {exams.map((exam, index) => (
              <li
                key={index}
                className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 px-5 py-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                    📖 {exam.subject}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">📅</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {new Date(exam.date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserPanel;