import { useState, useContext } from 'react';
import ReminderContext from '../../context/ReminderContext';
import '../css/ReminderItem.css';

function ReminderItem(props) {
  const { deleteReminder, updateReminder } = useContext(ReminderContext);
  const [dayE, setDayE] = useState(props.day);
  const [monthE, setMonthE] = useState(props.month);
  const [occasionE, setOccasionE] = useState(props.occasion);
  const [intervalE, setIntervalE] = useState(props.interval);
  const [isEditing, setIsEditing] = useState(false);
  const [msg, setMsg] = useState('');

  const handleDelete = (id) => {
    deleteReminder(props.id);
  };

  const toggleEditForm = () => {
    setIsEditing(true);
  };

  //take new data from EditForm and send it up to parent
  const handleUpdate = (e) => {
    e.preventDefault();
    if (
      (monthE == 2 && dayE > 28) ||
      (monthE == 4 && dayE > 30) ||
      (monthE == 6 && dayE > 30) ||
      (monthE == 9 && dayE > 30) ||
      (monthE == 11 && dayE > 30)
    ) {
      setMsg('Bitte ein gültiges Datum auswählen.');
    } else if (
      dayE &&
      monthE &&
      occasionE &&
      intervalE &&
      intervalE !== '--bitte auswählen--'
    ) {
      updateReminder(props.id, dayE, monthE, occasionE, intervalE);
      setMsg('');
      setIsEditing(false);
    } else {
      setMsg('Bitte stell dich sicher, dass alle Felder ausgefüllt sind...');
    }
  };

  const { day, month, occasion, interval } = props;
  const intervalDays =
    interval === 7
      ? '1 Woche'
      : interval === 14
      ? '2 Wochen'
      : interval === 1
      ? '1 Tag'
      : `${interval} Tage`;

  function padTo2(num) {
    return (num < 10 ? '0' : '') + num;
  }
  const dayPad = padTo2(day);
  const monthPad = padTo2(month);

  let result;
  if (isEditing) {
    result = (
      <main className='ReminderForm'>
        <form className='ReminderForm-form'>
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
                  value={dayE}
                  onChange={(e) => {
                    setDayE(e.target.value);
                    if (monthE && occasionE && intervalE) {
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
                  value={monthE}
                  onChange={(e) => {
                    setMonthE(e.target.value);
                    if (dayE && occasionE && intervalE) {
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
                value={occasionE}
                onChange={(e) => {
                  setOccasionE(e.target.value);
                  if (dayE && monthE && intervalE) {
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
                value={intervalE}
                onChange={(e) => {
                  setIntervalE(e.target.value);
                  if (dayE && monthE && occasionE) {
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
          <button className='ReminderForm-button' onClick={handleUpdate}>
            SPEICHERN
          </button>
          {msg && (
            <div className=' message mt-md-3 p-1 p-md-0 text-danger'>{msg}</div>
          )}
        </form>
      </main>
    );
  } else {
    result = (
      <main className='ReminderItem'>
        <p>
          <span className='d-md-none'>Datum:</span> {dayPad}.{monthPad}.
        </p>
        <p>
          <span className='d-md-none'>Bezeichnung:</span> {occasion}
        </p>
        <p>
          <span className='d-md-none'>Erinnerung:</span> {intervalDays}
        </p>
        <p>
          <span className='d-md-none'>Aktion:</span>{' '}
          <button onClick={toggleEditForm}>bearbeiten</button> |{' '}
          <button onClick={handleDelete}>löschen</button>
        </p>
      </main>
    );
  }

  return <>{result}</>;
}

export default ReminderItem;
