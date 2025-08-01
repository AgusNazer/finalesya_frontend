import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:10000/api';

function ExamList() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/exams`);
      if (res.ok) {
        const data = await res.json();
        setExams(data);
      }
    } catch (err) {
      console.error("Error cargando exámenes:", err);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
        📝 Exámenes Programados
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-2 py-1 rounded-full">
          {exams.length}
        </span>
      </h3>
      
      {exams.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No hay exámenes programados.</p>
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
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {new Date(exam.date).toLocaleString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  {exam.location && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      📍 {exam.location}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExamList;
