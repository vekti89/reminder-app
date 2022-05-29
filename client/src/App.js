import './App.css';
import Header from './components/js/Header';
import Content from './components/js/Content';
import { ReminderProvider } from './context/ReminderContext';

function App() {
  return (
    <div className='App'>
      <ReminderProvider>
        <Header />
        <Content />
      </ReminderProvider>
    </div>
  );
}

export default App;
