import { useState, useContext } from 'react';
import ReminderContext from '../../context/ReminderContext';
import '../css/ReminderForm.css';

function ReminderForm() {
  const { addReminder } = useContext(ReminderContext);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [occasion, setOccasion] = useState('');
  const [interval, setInterval] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (month == 2 && day > 28) ||
      (month == 4 && day > 30) ||
      (month == 6 && day > 30) ||
      (month == 9 && day > 30) ||
      (month == 11 && day > 30)
    ) {
      setMsg('Bitte ein gültiges Datum auswählen.');
    } else if (
      day &&
      month &&
      occasion &&
      interval &&
      interval !== '--bitte auswählen--'
    ) {
      addReminder({ day, month, occasion, interval });
      setDay('');
      setMonth('');
      setOccasion('');
      setInterval('');
      setMsg('');
    } else {
      setMsg('Bitte stell dich sicher, dass alle Felder ausgefüllt sind...');
    }
  };
  return (
    <main className='ReminderForm'>
      <form className='ReminderForm-form'>
        <p>{msg.text}</p>
        <section className='ReminderForm-section'>
          <div className='ReminderForm-group'>
            <label htmlFor='datum'>Datum (TT/MM)</label>
            <div className='ReminderForm-inlineInputs'>
              <input
                id='datum'
                type='number'
                min='1'
                max='31'
                required
                value={day}
                onChange={(e) => {
                  setDay(e.target.value);
                  if (month && occasion && interval) {
                    setMsg('');
                  }
                }}
                name='day'
              />
              <input
                id='datum'
                type='number'
                min='1'
                max='12'
                required
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  if (day && occasion && interval) {
                    setMsg('');
                  }
                }}
                name='month'
              />
            </div>
          </div>

          <div className='ReminderForm-group'>
            <label htmlFor='bezeichnung'>Bezeichnung</label>
            <input
              id='bezeichnung'
              type='text'
              required
              value={occasion}
              onChange={(e) => {
                setOccasion(e.target.value);
                if (day && month && interval) {
                  setMsg('');
                }
              }}
              name='occasion'
            />
          </div>

          <div className='ReminderForm-group'>
            <label htmlFor='errinerung'>Errinerung</label>
            <select
              id='errinerung'
              aria-label='errinerung'
              required
              value={interval}
              onChange={(e) => {
                setInterval(e.target.value);
                if (day && month && occasion) {
                  setMsg('');
                }
              }}
              name='interval'
            >
              <option>--bitte auswählen--</option>
              <option value='1'>1 Tag</option>
              <option value='2'>2 Tage</option>
              <option value='4'>4 Tage</option>
              <option value='7'>1 Woche</option>
              <option value='14'>2 Wochen</option>
            </select>
          </div>
        </section>
        <button className='ReminderForm-button' onClick={handleSubmit}>
          SPEICHERN
        </button>
        {msg && (
          <div className=' message mt-md-3 p-1 p-md-0 text-danger'>{msg}</div>
        )}
      </form>
    </main>
  );
}

export default ReminderForm;
