import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Contacts.module.css'


class ContactForm extends Component { 
  state = {
    name: '',
    number: '',
  };
  
  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }
  
  handleNumberChange = (event) => {
    this.setState({ number: event.target.value });
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.onAddContact(name, number);
    this.setState({ name: '', number: '' });
  }
  
    render() {
      const { name, number } = this.state;
      return (
          
              <form onSubmit={this.handleSubmit} className={css.Form}>
                <label htmlFor="name"></label>
                  <input
                    placeholder='Enter your name'
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value={name}
                      onChange={this.handleNameChange}
                      className={css.FormItem}
                />
                <label htmlFor="number"></label>
                  <input
                    placeholder='Enter phone number'
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={number}
                      onChange={this.handleNumberChange}
                      className={css.FormItem}
                />
                <button type="submit" className={css.FormBtn}>Add Contact</button>
              </form>
           
        );
    }
}

export default ContactForm

ContactForm.propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };