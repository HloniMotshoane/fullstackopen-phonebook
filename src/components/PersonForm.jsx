const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, addPerson }) => {
    return (
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <button type="submit">Add</button>
      </form>
    );
  };
  
  export default PersonForm;
  