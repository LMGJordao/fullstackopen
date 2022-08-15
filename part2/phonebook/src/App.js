import { useState } from 'react';
import Number from './components/Number';
import Form from './components/Form'
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setPhone] = useState('');
  const [filter, setFilter] = useState('');

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter setFilter={setFilter} />
      <Form props={{persons, setPersons, newName, setNewName, newPhone, setPhone}} />
      <h2>Numbers</h2>
      {persons
        .filter((person) => {
          return filter.length !== 0 
            ? person.name.toLowerCase().includes(filter.toLowerCase())
            : true;
        })
        .map((person) => {
          return <Number key={person.name} name={person.name} phone={person.phone} />
      })}
    </div>
  )
}

export default App