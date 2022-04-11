import React, { Component } from 'react';
import axios from "axios";
import "../css/ReminderList.css";
import ReminderForm from './ReminderForm';
import ReminderItem from './ReminderItem';
import authHeader from "../../services/auth-header";

const APIURL = "/api/reminders/";

class ReminderList extends Component {
  constructor (props){
    super(props);
    this.state = {
      reminders: []
    }; 
    this.addReminder=this.addReminder.bind(this);
    this.deleteReminder=this.deleteReminder.bind(this);
    this.updateReminder=this.updateReminder.bind(this);
}

  loadUser = async () => {
		try {
			const res = await axios.get("/api/auth", { headers: authHeader() })
			const user = res.data;
		} catch (err) {
			console.log(err);
		}
	} 

  loadReminders = async () => {
		try {
			const res = await axios.get(APIURL);
			const reminders = res.data;
			this.setState({ reminders })
		} catch (err) {
			console.log(err);
		}
	} 
  

  async componentDidMount() {
    this.loadUser();
		this.loadReminders();
	}

  addReminder = async (val) => {
    try {
      const res = await axios.post(APIURL, val);
      const newReminder = res.data;
      this.setState({ reminders: [...this.state.reminders, newReminder] })
    } catch (err) {
      console.log(err);
    }
  }

  deleteReminder = async (id) => {
		try {
			const deleteURL = APIURL + id;
			await axios.delete(deleteURL);
			const reminders = this.state.reminders.filter(r => r._id !== id)
			this.setState({ reminders: reminders })
		} catch (err) {
			console.log(err);
		}
	}

  updateReminder = async (id, day, month, occasion, interval) => {
		try {
			const updateURL = APIURL + id;
			const res = await axios.put(updateURL, {day, month, occasion, interval});
			const updatedRem = res.data;
			const reminders = this.state.reminders.map(r =>
				(r._id === updatedRem._id)
					? { ...r, day, month, occasion, interval}
					: r
			);
			this.setState({ reminders: reminders })
		} catch (err) {
			console.log(err)
		}
	}


  render() {
    const reminders = this.state.reminders.map(r=><ReminderItem
    key={r._id}
    id={r._id}
    {...r}
    deleteReminder={this.deleteReminder}
    updateReminder={this.updateReminder}
    />)

    return (
      <main className="ReminderList">
        <ReminderForm addReminder={this.addReminder}/>

        <section className="ReminderList-reminders">
          {reminders.length ?
            <>
              <div className="ReminderList-Title d-none d-md-flex">
                <p>Datum</p>
                <p>Bezeichnung</p>
                <p>Erinnerung</p>
                <p>Aktion</p>
              </div>
              {reminders}
            </>
            :
            <>
            <h4 className="text-md-center mt-5">Hier ist im Moment nichts zu sehen.</h4>
            <small className="text-md-center d-block">Bitte beachte, dass du angemeldet sein musst, um auf deine Erinnerungen zuzugreifen oder sie zu bearbeiten.</small>
            </>
          }
        </section>
        

      </main>
    )
  }
}

export default ReminderList;