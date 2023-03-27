import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './Contacts/ContactForm';
import Contacts from './Contacts/Contacts';
import Filter from './Contacts/Filter';
import Wrapper from './Contacts/Wrapper';

class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = (name, number) => {
    const { contacts } = this.state;
    const newContact = { id: nanoid(), name, number };
    const isNameExists = contacts.find(contact => contact.name === name);
    if (isNameExists) {
      alert(`${name} is already in contacts!`);
      return;
    }
    this.setState({ contacts: [...contacts, newContact] });
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  }
  
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }

  handleDeleteContact = (id) => {
  this.setState({
    contacts: this.state.contacts.filter((contact) => contact.id !== id),
  });
}

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
      return (
        <div>
          <Wrapper>
            <h1>Phonebook</h1>
            <ContactForm onAddContact={this.handleAddContact} />
          </Wrapper>
          <Wrapper>
            <h2>Contacts</h2>
            <Filter filter={filter} onFilterChange={this.handleFilterChange} />
            <Contacts contacts={filteredContacts} onDeleteContact={this.handleDeleteContact}/>
          </Wrapper>
        </div>
         
      )
  }
}
      
export default App;