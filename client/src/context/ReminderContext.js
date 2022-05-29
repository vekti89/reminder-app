import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from '../services/auth-header';
const APIURL = '/api/reminders/';

const ReminderContext = createContext();

export function ReminderProvider({ children }) {
  const [reminders, setReminders] = useState([]);
  const [username, setUsername] = useState('');

  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth', {
        headers: authHeader(),
      });
      const user = res.data;
      console.log(user.name);
      setUsername(user.name);
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

  return (
    <ReminderContext.Provider
      value={{
        username,
        reminders,
        addReminder,
        deleteReminder,
        updateReminder,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
}

export default ReminderContext;
