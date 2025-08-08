import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://finalesyabackend-production.up.railway.app/api';

function SubjectForm() {
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [yearTaken, setYearTaken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { user } = useAuth(); // ✅ Obtener usuario logueado

  // const navigate = useNavigate();

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

    // ✅ Verificar que el usuario esté logueado
    if (!user?.id) {
      setError('Debes estar logueado para crear materias');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/subject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          major, 
          yearTaken: year,
          usuarioId: user.id 
        }),
      });

      if (response.ok) {
        setSuccess('Materia agregada correctamente(actualizando la lista)');
        setName('');
        setMajor('');
        setYearTaken('');
        //Redirect directo a la URL completa
        window.location.href = 'https://finalesyafrontend.netlify.app/mipanel';
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
      {success && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg">
          <p>{success}</p>
          {/* <button
            onClick={() => navigate(0)} //para refrescar l; pagina
            className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            🔄 Refrescar página
          </button> */}
        </div>
      )}

      {error && <div className="text-red-600 dark:text-red-400">{error}</div>}

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