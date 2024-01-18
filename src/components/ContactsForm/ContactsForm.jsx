import { Component } from "react";
import { nanoid } from "nanoid";
import css from './contacts-form.module.css'

const INITIAL_STATE = {
    name: '',
    number: '',
}

class ContactsForm extends Component {
  state = { ...INITIAL_STATE }

  contactNameId = nanoid();
  contactNumberId = nanoid();

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

reset() {
        this.setState({...INITIAL_STATE});
    }


  handleSubmit = (e)=> {
        e.preventDefault();
        this.props.onSubmit({...this.state});
    this.reset();   
    }
  
  
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <div className={css.wrap}>
          <label htmlFor={this.contactNameId}>Name</label>
          <input value={this.state.name} type="text" id={this.contactNameId} required name="name" onChange={this.handleChange}/>
        </div>
        <div className={css.wrap}>
        <label htmlFor={this.contactNumberId}>Number</label>
          <input value={this.state.number} type="tel" id={this.contactNumberId} required name="number" onChange={this.handleChange}/>
        </div>
        <button type="submit" className={css.btn}>Add contact</button>
      </form>
    )
  }
}

export default ContactsForm;