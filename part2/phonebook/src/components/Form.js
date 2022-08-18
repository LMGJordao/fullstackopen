import personsService from "../services/persons";

const Form = ({props}) => {
  const {newName, newPhone, persons, setNewName, setPersons, setPhone, setNotificationMessage, setNotificationType} = props;

  const addNewName = (event) => {
    event.preventDefault();
    let p;
    if ((p = persons.findIndex((person) => person.name === newName || person.number === newPhone)) >= 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(persons[p].id, {...persons[p], number: newPhone})
          .then(updated => {
            setPersons(persons.map(p => updated.name===p.name ? updated : p));
            setNotificationMessage(`${persons[p].name} number was changed to ${newPhone}`);
            setNotificationType('success');
            setTimeout(() => setNotificationMessage(null), 5000);
          });
      }
    }
    else {
      const nameObj = {
        name: newName,
        number: newPhone
      };
      personsService
        .create(nameObj)
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
          setNotificationMessage(`${newPerson.name} was added`);
          setNotificationType('success');
          setTimeout(() => setNotificationMessage(null), 5000);
        });
    }

    event.target.reset();
    setNewName('');
    setPhone('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  }

  return (
    <>
      <h3>Add new</h3>
      <form onSubmit={addNewName}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>number: <input onChange={handlePhoneChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Form;