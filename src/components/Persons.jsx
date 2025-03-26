const Persons = ({ persons, searchTerm, deletePerson }) => {
    const filteredPersons = searchTerm
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : persons;
  
    return (
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default Persons;
  