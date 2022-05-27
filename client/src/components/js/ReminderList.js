import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ReminderList.css';
import ReminderForm from './ReminderForm';
import ReminderItem from './ReminderItem';
import authHeader from '../../services/auth-header';

const APIURL = '/api/reminders/';

function ReminderList() {
  const [reminders, setReminders] = useState([]);

  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth', { headers: authHeader() });
      const user = res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const loadReminders = async () => {
    try {
      const res = await axios.get(APIURL);
      const reminders = res.data;
      setReminders([...reminders]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUser();
    loadReminders();
  }, []);

  const addReminder = async (val) => {
    try {
      const res = await axios.post(APIURL, val);
      const newReminder = res.data;
      setReminders([...reminders, newReminder]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReminder = async (id) => {
    try {
      const deleteURL = APIURL + id;
      await axios.delete(deleteURL);
      const remindersLeft = reminders.filter((r) => r._id !== id);
      setReminders([...remindersLeft]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateReminder = async (id, day, month, occasion, interval) => {
    try {
      const updateURL = APIURL + id;
      const res = await axios.put(updateURL, {
        day,
        month,
        occasion,
        interval,
      });
      const updatedRem = res.data;
      const updatedReminders = reminders.map((r) =>
        r._id === updatedRem._id ? { ...r, day, month, occasion, interval } : r
      );
      setReminders([...updatedReminders]);
    } catch (err) {
      console.log(err);
    }
  };

  const remindersToRender = reminders.map((r) => (
    <ReminderItem
      key={r._id}
      id={r._id}
      {...r}
      deleteReminder={deleteReminder}
      updateReminder={updateReminder}
    />
  ));

  return (
    <main className='ReminderList'>
      <ReminderForm addReminder={addReminder} />

      <section className='ReminderList-reminders'>
        {remindersToRender.length ? (
          <>
            <div className='ReminderList-Title d-none d-md-flex'>
              <p>Datum</p>
              <p>Bezeichnung</p>
              <p>Erinnerung</p>
              <p>Aktion</p>
            </div>
            {remindersToRender}
          </>
        ) : (
          <>
            <h4 className='text-md-center mt-5'>
              Hier ist im Moment nichts zu sehen.
            </h4>
            <small className='text-md-center d-block'>
              Bitte beachte, dass du angemeldet sein musst, um auf deine
              Erinnerungen zuzugreifen oder sie zu bearbeiten.
            </small>
          </>
        )}
      </section>
    </main>
  );
}

export default ReminderList;
