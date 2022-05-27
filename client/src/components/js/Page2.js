import '../css/Page2.css';
import ReminderList from './ReminderList';

const Page2 = () => {
  return (
    <main className='Page2'>
      <ReminderList />

      <div className='Page2-border left'></div>
      <div className='Page2-border right'></div>
    </main>
  );
};

export default Page2;
