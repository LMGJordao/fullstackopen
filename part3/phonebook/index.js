const express = require('express');
const morgan = require('morgan');

const app = express();
morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '');
const logger = morgan(':method :url :status :res[content-length] - :response-time ms :body');

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

const generateId = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

app.use(express.json());
app.use((req, res, next) => {
  logger(req, res, () => next());
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} ${persons.length === 1 ? 'person' : 'people'}</p><p>${new Date()}</p>`);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  }
  else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = persons.findIndex(p => p.id === id);

  if (idx >= 0) {
    persons.splice(idx, 1);
    res.status(204).end();
  }
  else {
    res.status(404).end();
  }
});

app.post('/api/persons', (req, res) => {
  const newPerson = req.body;

  if (newPerson === undefined || !newPerson.hasOwnProperty('name') || !newPerson.hasOwnProperty('number'))
  {
    return res
      .status(400)
      .json({
        'error': `${!newPerson.hasOwnProperty('name')
          ? 'name missing'
          : ''}${!newPerson.hasOwnProperty('name') && !newPerson.hasOwnProperty('number')
          ? ' and '
          : ''}${!newPerson.hasOwnProperty('number')
          ? 'number missing'
          : ''}`
      });
  }

  if (persons.find(p => p.name === newPerson.name))
  {
    return res
      .status(400)
      .json({
        "error": "name must be unique"
      });
  }
  
  newPerson["id"] = generateId();
  persons.push(newPerson);

  res
    .status(201)
    .json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));