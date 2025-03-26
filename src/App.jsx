import { useState, useEffect } from "react";
import phonebookService from "./services/Phonebook";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const Notification = ({ message, type }) => {
  if (!message) return null;

  const style = {
    padding: "10px",
    marginBottom: "10px",
    color: type === "success" ? "green" : "red",
    backgroundColor: "lightgrey",
    border: `2px solid ${type === "success" ? "green" : "red"}`,
  };

  return <div style={style}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({ message: null, type: "" });

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        setNotification({ message: "Failed to fetch contacts", type: "error" });
        setTimeout(() => setNotification({ message: null, type: "" }), 3000);
      });
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: "" }), 3000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already in the phonebook. Replace old number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        phonebookService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((p) => (p.id !== existingPerson.id ? p : returnedPerson)));
            showNotification(`Updated ${returnedPerson.name}`, "success");
          })
          .catch((error) => {
            showNotification(`Error: ${newName} has already been removed from the server`, "error");
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      phonebookService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          showNotification(`Added ${returnedPerson.name}`, "success");
        })
        .catch((error) => {
          showNotification("Error: Failed to add person", "error");
        });
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          showNotification(`Deleted ${name}`, "success");
        })
        .catch((error) => {
          showNotification(`Error: ${name} has already been removed from the server`, "error");
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} searchTerm={searchTerm} deletePerson={deletePerson} />
    </div>
  );
};

export default App;