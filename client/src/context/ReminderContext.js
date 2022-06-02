import { createContext, useReducer } from 'react';
import reminderReducer from '../reducers/ReminderReducer';
import axios from 'axios';
import authHeader from '../services/auth-header';
const APIURL = '/api/reminders/';

const ReminderContext = createContext();

export function ReminderProvider({ children }) {
  const initialState = {
    reminders: [],
    loading: false,
    username: null,
  };

  const [state, dispatch] = useReducer(reminderReducer, initialState);

  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth', {
        headers: authHeader(),
      });
      const user = res.data;
      dispatch({ type: 'GET_USERNAME', payload: user.name });
    } catch (err) {
      console.log(err);
    }
  };

  const loadReminders = async () => {
    try {
      const res = await axios.get(APIURL);
      const reminders = res.data;
      dispatch({ type: 'GET_REMINDERS', payload: reminders });
      // setReminders([...reminders]);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const addReminder = async (val) => {
    try {
      const res = await axios.post(APIURL, val);
      const newReminder = res.data;
      dispatch({
        type: 'ADD_REMINDER',
        payload: newReminder,
      });
      //setReminders([...reminders, newReminder]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReminder = async (id) => {
    try {
      const deleteURL = APIURL + id;
      await axios.delete(deleteURL);
      //const remindersLeft = state.reminders.filter((r) => r._id !== id);
      dispatch({ type: 'DELETE_REMINDER', payload: id });
      //setReminders([...remindersLeft]);
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
      // const updatedRem = res.data;
      // const updatedReminders = state.reminders.map((r) =>
      //   r._id === updatedRem._id ? { ...r, day, month, occasion, interval } : r
      // );
      dispatch({
        type: 'UPDATE_REMINDER',
        payload: { id, day, month, occasion, interval },
      });
      //setReminders([...updatedReminders]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ReminderContext.Provider
      value={{
        username: state.username,
        reminders: state.reminders,
        loading: state.loading,
        loadUser,
        loadReminders,
        dispatch,
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
