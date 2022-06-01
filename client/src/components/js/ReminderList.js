import { useContext } from 'react';
import Spinner from './Spinner';
import ReminderContext from '../../context/ReminderContext';
import '../css/ReminderList.css';
import ReminderForm from './ReminderForm';
import ReminderItem from './ReminderItem';

function ReminderList() {
  const { reminders, loading } = useContext(ReminderContext);

  const remindersToRender = reminders.map((r) => (
    <ReminderItem key={r._id} id={r._id} {...r} />
  ));

  return (
    <main className='ReminderList'>
      {!loading ? (
        <>
          <ReminderForm />
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
                <p className='text-md-center d-block'>
                  Du hast keine Einnerungen.
                </p>
                {/* <small className='text-md-center d-block'>
                  Bitte beachte, dass du angemeldet sein musst, um auf deine
                  Erinnerungen zuzugreifen oder sie zu bearbeiten.
                </small> */}
              </>
            )}
          </section>
        </>
      ) : (
        <Spinner />
      )}
    </main>
  );
}

export default ReminderList;
