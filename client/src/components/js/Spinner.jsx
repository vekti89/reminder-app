import spinner from '../assets/spinner_.gif';
import '../css/Spinner.css';

function Spinner() {
  return (
    <div className='Spinner'>
      <img src={spinner} alt='loading' />
    </div>
  );
}

export default Spinner;
