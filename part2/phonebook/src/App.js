import { useState, useEffect } from 'react';
import axios from 'axios';
import Number from './components/Number';
import Form from './components/Form'
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setPhone] = useState('');
  const [filter, setFilter] = useState('');

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data);
      });
  };

  useEffect(hook, []);

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
          return <Number key={person.name} name={person.name} phone={person.number} />
      })}
    </div>
  )
}

export default App