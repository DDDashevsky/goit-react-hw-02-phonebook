import React from 'react';
import { nanoid } from 'nanoid';

import Form from './Form';
import ContactsList from './ContactsList';
import ContactsFilter from './ContactsFilter';

import { Container } from './App.styled';

export class App extends React.Component {
  state = {
    contacts: [
      { name: 'Oleg Mongol', number: '123-45-67', id: nanoid(5) },
      { name: 'Hermione Kline', number: '443-89-12', id: nanoid(5) },
      { name: 'Eden Clements', number: '645-17-79', id: nanoid(5) },
      { name: 'Annie Copeland', number: '227-91-26', id: nanoid(5) },
    ],
    filter: '',
  };

  onSubmit = data => {
    if (
      this.state.contacts.find(
        contact =>
          contact.name.toLocaleLowerCase() === data.name.toLocaleLowerCase()
      )
    ) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { name: data.name, number: data.number, id: nanoid(5) },
      ],
    }));
  };

  onFilter = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filterContacts = this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(this.state.filter.toLocaleLowerCase().trim())
    );
    return (
      <Container>
        <Form onSubmit={this.onSubmit} />
        <h2>Contacts</h2>
        <ContactsFilter value={this.state.filter} onChange={this.onFilter} />
        <ContactsList contacts={filterContacts} onDelete={this.onDelete} />
      </Container>
    );
  }
}
