import { Component } from "react";
import ContactsForm from './ContactsForm/ContactsForm';
import ContactsList from './ContactsList/ContactsList'
import { nanoid } from "nanoid";

class App extends Component {

state = {
  contacts: [],
    filter: "",
};
  
  componentDidMount() {
    // якщо в localStorage є збережені данні підгружаємо їх на сторінку
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts?.length) { this.setState({contacts}) }
  }

  componentDidUpdate(_, prevState) {
    // При оновлені компонента - оновлюємо данні в localStorage, дадавання та видалення 
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }
  
  addContact = (data) => {
    // Якщо контакт вже існує:
    const isExist = this.state.contacts.some(
    (contact) => contact.name.toLowerCase() === data.name.toLowerCase()
  );
    if (isExist) {
  alert(`${data.name} is already in contacts.`);
  return
}
    // Якщо контакта не існує додаємо його в state
    this.setState((prevState) => {
      const newContact = {
        id: nanoid(),
        ...data,
      };

      return { contacts: [...prevState.contacts, newContact] };
    });
  };

  deleteContact = (id) => {
    this.setState((prevState) => {
      // Треба повертати об'єкт для оновлення стану а не відфільтрований масив
      const newList = prevState.contacts.filter(contact => contact.id !== id)
      return {contacts: newList}
    })
  }

  // Лише зміна значення filter в state
  changeFitler = ({ target }) => {
    this.setState({
            filter: target.value
        })
  }
  
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
        return filteredContacts;
  }

  render() {
    const {addContact, deleteContact, changeFitler} = this;
        const contacts = this.getFilteredContacts();

    return (
    <div className="container"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontSize: 28,
        color: '#010101'
      }}
    >
        <h1>Phonebook</h1>
        <ContactsForm onSubmit={addContact} />
        {/* якщо є список контактів рендеримо розмітку, якщо пусто - то ні */}
        {Boolean(this.state.contacts.length) && <>
          <h2>Contacts</h2>
        <div>
          <h3>Find contacts by name:</h3>
          <input name="filter" onChange={changeFitler} className="filter-input"/>
        </div>
          <ContactsList items={contacts} deleteContact={deleteContact} />
        </>
        }
    </div>
  );
    
  }
};

export default App;

