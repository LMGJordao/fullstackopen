import { useState, useEffect } from 'react';

import personsService from "./services/persons";

import Number from './components/Number';
import Form from './components/Form'
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('');

  const hook = () => {
    personsService
      .getAll()
      .then(savedPersons => {
        setPersons(savedPersons);
      });
  };
  useEffect(hook, []);

  const handleDelete = (id, name) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .deleteOne(id)
        .then(_ => setPersons(persons.filter(person => person.id !== id)))
        .catch(reason => {
          if (reason.response.status === 404) {
            setNotificationMessage(`${name} was already deleted from the server`);
            setNotificationType('failure');
            setTimeout(() => setNotificationMessage(null), 5000);
          }
        });
    }    
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter setFilter={setFilter} />
      <Form props={{persons, setPersons, newName, setNewName, newPhone, setPhone, setNotificationMessage, setNotificationType}} />
      <h2>Numbers</h2>
      {persons
        .filter((person) => {
          return filter.length !== 0 
            ? person.name.toLowerCase().includes(filter.toLowerCase())
            : true;
        })
        .map((person) => {
          return <Number key={person.name} name={person.name} phone={person.number} handleDelete={handleDelete(person.id, person.name)} />
      })}
    </div>
  )
}

export default App