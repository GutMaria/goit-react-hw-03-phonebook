import { Component } from "react";
import css from './list.module.css'

class ContactsList extends Component {

  render() {
    const { items, deleteContact } = this.props; 
    const elements = items.map(({id, name, number }) => <li key={id}>{name}: {number}.  <button onClick={()=> deleteContact(id)} type="button" className={css.deleteBtn}>Delete</button></li>)
    
    return <ul className={css.list}>{elements }</ul>
  }
}

export default ContactsList;