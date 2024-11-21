
const apiUrl = 'http://localhost:3000/api/items';

// Obtener los elementos de la lista
const obtenerItems = async () => {
  const response = await fetch(apiUrl);
  const items = await response.json();
  const lista = document.getElementById('items-lista');
  lista.innerHTML = '';

  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} - ${item.email} - ${item.phone}`;
    
    
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.classList.add('eliminar');
    btnEliminar.onclick = () => eliminarItem(item._id);
    li.appendChild(btnEliminar);
    
    
    const btnActualizar = document.createElement('button');
    btnActualizar.textContent = 'Actualizar';
    btnActualizar.classList.add('actualizar');
    btnActualizar.onclick = () => actualizarItem(item._id);
    li.appendChild(btnActualizar);
    
    lista.appendChild(li);
  });
};

// Crear un nuevo item
const crearItem = async (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  const nuevoItem = { nombre, email, phone };

  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoItem)
  });

  obtenerItems(); // Actualizar la lista
};

// Eliminar un item
const eliminarItem = async (id) => {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  obtenerItems(); // Actualizar la lista
};

// Actualizar un item
const actualizarItem = async (id) => {
  const nombre = prompt('Nuevo nombre:');
  const email = prompt('Nuevo email:');
  const phone = prompt('Nuevo numero:');
  
  const itemActualizado = { nombre, email, phone };

  await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemActualizado)
  });

  obtenerItems(); // Actualizar la lista
};

// Evento de formulario
document.getElementById('formulario').addEventListener('submit', crearItem);

// Obtener la lista inicial de items
obtenerItems();
