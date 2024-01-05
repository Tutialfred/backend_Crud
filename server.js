const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const axios = require("axios");
const cors = require('cors');

app.listen(port);
app.use(express.json());
// app.use(cors({ origin: 'http://localhost:5173' })); // Configurar CORS para permitir solicitudes desde el puerto de tu aplicación de React

const characters = [];
let idCounter = 1; // Inicialización del contador de IDs




//! READ

app.get("/", (req, res) => {
  res.send("Home here")
})
app.get("/characters", (req, res) => {
  res.json(characters)
})


app.get("/characters/:id", (req, res) => {

  // Comprobar si el producto existe
  const characterFound = characters.find( e => e.id === parseInt(req.params.id));

  if(!characterFound){ // Si hay un error ↓ el producto no se encuentra, no existe
      res.status(404).send("Error, no se encontro el Personaje")
  } else{
      res.json(characterFound);    
  }
});








//! Crear un nuevo personaje
app.post('/characters', (req, res) => {
  const { name, status, species } = req.body; // Obtener datos del cuerpo de la solicitud

  if (!name || !status || !species) {
    return res.status(400).json({ error: 'Por favor, proporcione todos los campos: name, status, species' });
  }

  // Verificar si el nombre ya existe
  const existingCharacter = characters.find(char => char.name.toLowerCase() === name.toLowerCase());
  if (existingCharacter) {
    return res.status(400).json({ error: 'El nombre del personaje ya existe' });
  }

  const newCharacter = { id: idCounter++, name, status, species }; // Incrementar el contador de IDs
  characters.push(newCharacter);

  console.log(characters)
  res.status(200).json(newCharacter);
});



// 


app.get("/characterown", async (req, res) => {
  res.json(characters)
  // res.json(characters)
})






//! Actualizar un personaje por ID
app.put('/characters/:id', (req, res) => {
  const { id } = req.params;
  const { name, status, species } = req.body;

  // Aquí deberías tener lógica para actualizar los datos en tu base de datos o almacenamiento
  // En este ejemplo, asumiremos que characters es una matriz que contiene los personajes

  const characterToUpdate = characters.find(char => char.id === parseInt(id));

  if (!characterToUpdate) {
    return res.status(404).json({ error: 'Personaje no encontrado' });
  }

  if (name) {
    const existingCharacter = characters.find(char => char.name.toLowerCase() === name.toLowerCase() && char.id !== parseInt(id));
    if (existingCharacter) {
      return res.status(400).json({ error: 'El nombre del personaje ya existe' });
    }
    characterToUpdate.name = name;
  }

  if (status) {
    characterToUpdate.status = status;
  }

  if (species) {
    characterToUpdate.species = species;
  }


  res.json(characterToUpdate);
});
















//! Eliminar un personaje por ID
app.delete('/characters/:id', (req, res) => {
  const { id } = req.params;

  const index = characters.findIndex(char => char.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Personaje no encontrado' });
  }

  characters.splice(index, 1);
  res.sendStatus(204); // No Content
});



console.log("App working on portal 3000");