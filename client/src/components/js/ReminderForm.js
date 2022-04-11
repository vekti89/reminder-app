import React, { Component } from 'react';
import "../css/ReminderForm.css";

class ReminderForm extends Component {
    constructor (props) {
        super(props);
        this.state={day:"", month:"", occasion:"", interval:""};
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.day === "" || this.state.month === "" || this.state.occasion === "" || this.state.interval === "") {
            this.setState({ day: "", month: "", occasion: "", interval: "" });
        } else {
            this.props.addReminder(this.state);
            this.setState({ day: "", month: "", occasion: "", interval: "" });
        }
    }

    render() {
        return (
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
                    <button className="ReminderForm-button" onClick={this.handleSubmit}>SPEICHERN</button>

                </form>
            </main>
        )
    }
}

export default ReminderForm;