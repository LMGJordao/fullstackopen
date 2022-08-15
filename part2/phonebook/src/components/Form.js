const Form = ({props}) => {
  const {newName, newPhone, persons, setNewName, setPersons, setPhone} = props;
  const addNewName = (event) => {
    event.preventDefault();
    
    if (persons.findIndex((person) => person.name === newName || person.phone === newPhone) >= 0)
      alert(`${newName} is already added to phonebook, with the number ${newPhone}`);
    else {
      const nameObj = {
        name: newName,
        phone: newPhone
      };
      setPersons(persons.concat(nameObj));
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