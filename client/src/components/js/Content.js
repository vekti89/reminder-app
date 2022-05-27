import { useState, useEffect } from 'react';
import '../css/Content.css';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Page1 from './Page1';
import Page2 from './Page2';
import Aside from './Aside';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

function Content(props) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  return (
    <main className='Content'>
      <section>
        {currentUser ? (
          <div className='UserOptions'>
            <Link to='/' className='nav-link' onClick={logOut}>
              Ausloggen
            </Link>
          </div>
        ) : (
          <div className='UserOptions'>
            <Link to={'/login'} className='nav-link'>
              Einloggen
            </Link>
            <Link to={'/register'} className='nav-link'>
              Registrieren
            </Link>
          </div>
        )}
      </section>

      <section className='components'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Page1 />} />
          <Route path={'/page2'} element={<Page2 />} />
          <Route path={'/register'} element={<RegisterForm />} />
          <Route path={'/login'} element={<LoginForm />} />
        </Routes>

        <Aside />
      </section>
    </main>
  );
}

export default Content;
