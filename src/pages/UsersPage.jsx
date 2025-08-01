import { useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser } from '../services/userService';

function UsersPage() {
  const [users, setUsers] = useState([]);

  // Estado inicial corregido: role es un número (1)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    university: '',
    role: 1
  });

  useEffect(() => {
    getUsers().then(setUsers).catch(console.error);
  }, []);

  const handleAddUser = async () => {
    // Debug: muestra el objeto que se está enviando
    console.log('Enviando usuario:', newUser);
    const created = await createUser(newUser);
    setUsers([...users, created]);
    // Se resetean todos los campos, incluyendo el password, y role se deja como número
    setNewUser({ name: '', email: '', password: '', university: '', role: 1 });
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <input
        value={newUser.name}
        onChange={e => setNewUser({ ...newUser, name: e.target.value })}
        placeholder="Nombre"
      />
      <input
        value={newUser.email}
        onChange={e => setNewUser({ ...newUser, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="password"
        value={newUser.password}
        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
        placeholder="Contraseña"
      />
      <input
        value={newUser.university}
        onChange={e => setNewUser({ ...newUser, university: e.target.value })}
        placeholder="Universidad"
      />
      <select
        value={newUser.role}
        onChange={e => setNewUser({ ...newUser, role: Number(e.target.value) })}
      >
        <option value={1}>Usuario</option>
        <option value={0}>Administrador</option>
      </select>

      <button onClick={handleAddUser}>Agregar</button>

      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} ({u.email})
            <button onClick={() => handleDeleteUser(u.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;
