const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({ origin: ['http://localhost:4200', 'http://127.0.0.1:4200'] }));
app.use(express.json());
const pets = [
  { id: 1, name: 'Milo', type: 'Dog', breed: 'Golden Retriever', age: '2 years', emoji: '🐕', color: '#f5d4a5', description: 'A sunny, playful friend who loves long walks.' },
  { id: 2, name: 'Luna', type: 'Cat', breed: 'Tabby', age: '1 year', emoji: '🐈', color: '#e7d6f4', description: 'A gentle lap cat with a curious little soul.' },
  { id: 3, name: 'Biscuit', type: 'Dog', breed: 'Beagle mix', age: '3 years', emoji: '🐶', color: '#f6dfbe', description: 'Easygoing, affectionate, and always up for a treat.' },
  { id: 4, name: 'Clover', type: 'Rabbit', breed: 'Mini Lop', age: '8 months', emoji: '🐰', color: '#dcead5', description: 'A soft-hearted hopper who enjoys quiet company.' },
  { id: 5, name: 'Poppy', type: 'Cat', breed: 'Calico', age: '2 years', emoji: '🐱', color: '#f4d9d2', description: 'A confident sweetheart ready to brighten your home.' },
  { id: 6, name: 'Ollie', type: 'Dog', breed: 'Terrier mix', age: '1 year', emoji: '🐾', color: '#d8e8ee', description: 'A happy little explorer who makes friends everywhere.' }
];
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'CareConnect API' }));
app.get('/api/pets', (_req, res) => res.json(pets));
app.post('/api/adoptions', (req, res) => {
  const { petId, name, email } = req.body || {};
  const pet = pets.find((item) => item.id === Number(petId));
  if (!pet || !name || !email) return res.status(400).json({ message: 'Please provide a pet, your name, and email.' });
  return res.status(201).json({ message: `Thanks, ${name}! Your interest in ${pet.name} has been received.`, adoption: { petId: pet.id, name, email } });
});
const server = app.listen(port, '127.0.0.1', () => console.log(`CareConnect API listening at http://127.0.0.1:${port}`));


server.on('error', (error) => { console.error('CareConnect API failed to start:', error); process.exitCode = 1; });



