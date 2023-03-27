import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './Contacts/ContactForm';
import Contacts from './Contacts/Contacts';
import Filter from './Contacts/Filter';
import Wrapper from './Contacts/Wrapper';

export default function App() {

  const [contacts, setContacts] = useState([

    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts !== null) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const newContact = { id: nanoid(), name, number };
    const isNameExists = contacts.find(contact => contact.name === name);
    if (isNameExists) {
      alert(`${name} is already in contacts!`);
      return;
    }
    setContacts( [...contacts, newContact] );
  }

  const handleFilterChange = (evt) => {
    setFilter(evt.target.value);
  }

  const getFilteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  const handleDeleteContact = (id) => {
    setContacts(prevContacts => prevContacts.filter((contact) => contact.id !== id)
    );
  }

  return (
    <div>
      <Wrapper>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={handleAddContact} />
      </Wrapper>
      <Wrapper>
        <h2>Contacts</h2>
        <Filter filter={filter} onFilterChange={handleFilterChange} />
        <Contacts contacts={getFilteredContacts} onDeleteContact={handleDeleteContact}/>
      </Wrapper>
    </div>
         
  )
}  