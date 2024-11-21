const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/miapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Definir esquema y modelo
const ItemSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, match: /.+@.+\..+/ },
  phone: { type: String, required: true }
});

const Item = mongoose.model('Item', ItemSchema);

// Operaciones CRUD

// Crear
app.post('/api/items', async (req, res) => {
  const { nombre, email, phone } = req.body;
  const nuevoItem = new Item({ nombre, email, phone });
  await nuevoItem.save();
  res.status(201).json(nuevoItem);
});

// Leer
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Actualizar
app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, phone } = req.body;
  const itemActualizado = await Item.findByIdAndUpdate(id, { nombre, email, phone }, { new: true });
  res.json(itemActualizado);
});

// Eliminar
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.status(204).end();
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
