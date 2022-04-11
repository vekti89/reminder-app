import React, { Component } from 'react';
import "../css/ReminderItem.css";

class ReminderItem extends Component {
  constructor(props) {
    super(props);
    this.state={isEditing:false, day:this.props.day, month:this.props.month, occasion:this.props.occasion, interval:this.props.interval};
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleEditForm=this.toggleEditForm.bind(this);
    this.handleUpdate=this.handleUpdate.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  handleDelete(id) {
    this.props.deleteReminder(this.props.id);
  }

  toggleEditForm(){
    this.setState({isEditing:!this.state.isEditing})
  }

  //take new data from EditForm and send it up to parent
  handleUpdate(e){
    e.preventDefault();
    this.props.updateReminder(this.props.id, this.state.day, this.state.month, this.state.occasion, this.state.interval);
    this.setState({isEditing:false})
  }

  handleChange(e){
    this.setState({[e.target.name]:e.target.value})
}


  render() {
    const { day, month, occasion, interval} = this.props;
    const intervalDays = interval === 7 ? "1 Woche"
      : interval === 14 ? "2 Wochen"
        : interval === 1 ? "1 Tag"
          : `${interval} Tage`;

    function padTo2(num) {
      return (num < 10 ? '0' : '') + num
    }
    const dayPad = padTo2(day);
    const monthPad = padTo2(month);



    let result;
    if (this.state.isEditing) {
      result = (
        <main className="ReminderForm">
        <form className="ReminderForm-form">
                    <section className="ReminderForm-section">

                        <div className="ReminderForm-group">
                            <label htmlFor="datum">Datum (TT/MM)</label>
                            <div className="ReminderForm-inlineInputs">
                                <input
                                    id="datum"
                                    type="number"
                                    min="1"
                                    max="31"
                                    required
                                    value={this.state.day}
                                    onChange={this.handleChange}
                                    name="day"
                                />
                                <input
                                    id="datum"
                                    type="number"
                                    min="1"
                                    max="12"
                                    required
                                    value={this.state.month}
                                    onChange={this.handleChange}
                                    name="month"
                                />
                            </div>
                        </div>



                        <div className="ReminderForm-group">
                            <label htmlFor="bezeichnung">Bezeichnung</label>
                            <input
                                id="bezeichnung"
                                type="text"
                                required
                                value={this.state.occasion}
                                onChange={this.handleChange}
                                name="occasion"
                            />
                        </div>



                        <div className="ReminderForm-group">
                            <label htmlFor="errinerung">Errinerung</label>
                            <select
                                id="errinerung"
                                aria-label="errinerung"
                                required
                                value={this.state.interval}
                                onChange={this.handleChange}
                                name="interval"
                            >
                                <option>--bitte auswählen--</option>
                                <option value="1">1 Tag</option>
                                <option value="2">2 Tage</option>
                                <option value="4">4 Tage</option>
                                <option value="7">1 Woche</option>
                                <option value="14">2 Wochen</option>
                            </select>
                        </div>

                    </section>
                    <button className="ReminderForm-button" onClick={this.handleUpdate}>SPEICHERN</button>

                </form>
                </main>

      )
    } else {
      result = (
        <main className="ReminderItem">
          <p><span className="d-md-none">Datum:</span> {dayPad}.{monthPad}.</p>
          <p><span className="d-md-none">Bezeichnung:</span> {occasion}</p>
          <p><span className="d-md-none">Erinnerung:</span> {intervalDays}</p>
          <p><span className="d-md-none">Aktion:</span> <button onClick={this.toggleEditForm}>bearbeiten</button> | <button onClick={this.handleDelete}>löschen</button></p>
        </main>
      )
    }

 
    return (
      <>
        {result}
      </>
    )
  }
}



export default ReminderItem;