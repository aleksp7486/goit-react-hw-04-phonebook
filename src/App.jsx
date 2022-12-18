import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Box } from './components/Box';
import Section from './components/Section';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import { useMemo } from 'react';

const LS_CONTACTS = 'pb_contacts';

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(LS_CONTACTS)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsJSON = JSON.stringify(contacts);
    localStorage.setItem(LS_CONTACTS, contactsJSON);
  }, [contacts]);

  const onFormSubmit = ({ name, number }, { resetForm }) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    if (contacts.find(contact => contact.number === number)) {
      alert(`Number ${number} already exists`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts([...contacts, newContact]);
    resetForm();
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const deleteContact = e => {
    const id = e.currentTarget.closest('li').getAttribute('id');
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = useMemo(
    () =>
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [contacts, filter]
  );

  return (
    <Box pt="120px">
      <Box m="auto" p={4} maxWidth="350px" bg="#cfe5e7" ko>
        <Section title="Phone-book">
          <ContactForm onFormSubmit={onFormSubmit} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} changeFilter={changeFilter} />
          <ContactList
            deleteContact={deleteContact}
            contacts={filteredContacts}
          />
        </Section>
      </Box>
    </Box>
  );
}
