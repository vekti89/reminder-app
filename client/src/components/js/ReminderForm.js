import { useState } from 'react';
import '../css/ReminderForm.css';

function ReminderForm(props) {
  const [formData, setFormData] = useState({
    day: '',
    month: '',
    occasion: '',
    interval: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.day === '' ||
      formData.month === '' ||
      formData.occasion === '' ||
      formData.interval === ''
    ) {
      setFormData({ day: '', month: '', occasion: '', interval: '' });
    } else {
      props.addReminder(formData);
      setFormData({ day: '', month: '', occasion: '', interval: '' });
    }
  };

  return (
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
        <button className='ReminderForm-button' onClick={handleSubmit}>
          SPEICHERN
        </button>
      </form>
    </main>
  );
}

export default ReminderForm;
