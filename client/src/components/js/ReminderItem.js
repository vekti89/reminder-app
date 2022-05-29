import { useState, useContext } from 'react';
import ReminderContext from '../../context/ReminderContext';
import '../css/ReminderItem.css';

function ReminderItem(props) {
  const { deleteReminder, updateReminder } = useContext(ReminderContext);

  const [formData, setFormData] = useState({
    isEditing: false,
    day: props.day,
    month: props.month,
    occasion: props.occasion,
    interval: props.interval,
  });

  const handleDelete = (id) => {
    deleteReminder(props.id);
  };

  const toggleEditForm = () => {
    setFormData({ ...formData, isEditing: true });
  };

  //take new data from EditForm and send it up to parent
  const handleUpdate = (e) => {
    e.preventDefault();
    updateReminder(
      props.id,
      formData.day,
      formData.month,
      formData.occasion,
      formData.interval
    );
    setFormData({ ...formData, isEditing: false });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
  if (formData.isEditing) {
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
                  value={formData.day}
                  onChange={handleChange}
                  name='day'
                />
                <input
                  id='datum'
                  type='number'
                  min='1'
                  max='12'
                  required
                  value={formData.month}
                  onChange={handleChange}
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
                value={formData.occasion}
                onChange={handleChange}
                name='occasion'
              />
            </div>

            <div className='ReminderForm-group'>
              <label htmlFor='errinerung'>Errinerung</label>
              <select
                id='errinerung'
                aria-label='errinerung'
                required
                value={formData.interval}
                onChange={handleChange}
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
