import { useState } from 'react';

const API_BASE_URL = 'http://localhost:10000/api';

function SubjectForm() {
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [yearTaken, setYearTaken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 5;

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    const year = parseInt(yearTaken);
    if (!name || !major || !yearTaken) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (isNaN(year) || year < minYear || year > currentYear) {
      setError(`El año debe estar entre ${minYear} y ${currentYear}`);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/subject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, major, yearTaken: year }),
      });

      if (response.ok) {
        setSuccess('Materia agregada correctamente');
        setName('');
        setMajor('');
        setYearTaken('');
      } else {
        const data = await response.json();
        setError(data.message || 'Error al crear la materia');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="p-6 mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">➕ Agregar Materia</h3>

      {error && <div className="text-red-600 dark:text-red-400">{error}</div>}
      {success && <div className="text-green-600 dark:text-green-400">{success}</div>}

      <div className="grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Nombre de la materia"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <input
          type="text"
          placeholder="Carrera / especialidad"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <input
          type="number"
          placeholder={`Año cursado (ej: ${currentYear})`}
          value={yearTaken}
          onChange={(e) => setYearTaken(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
      >
        Guardar Materia
      </button>
    </div>
  );
}

export default SubjectForm;
