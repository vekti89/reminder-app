import React, { Component } from 'react'; 
import "../css/Content.css"; 
import { Routes, Route, Link} from "react-router-dom";
import Navbar from './Navbar';
import Page1 from './Page1';
import Page2 from './Page2';
import Aside from './Aside';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

class Content extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {currentUser: null};
      }

      componentDidMount() {
        const user = localStorage.getItem('user');
        if (user) {
          this.setState({
            currentUser: user
            });
        }
      }
      logOut() {
        localStorage.removeItem("user");
        this.setState({
            currentUser: null
            });   
}

    render() {
        
        return (
            <main className="Content">
                <section>
                    {this.state.currentUser ? (
                        <div className="UserOptions">
                            <Link to="/" className="nav-link" onClick={this.logOut}>
                                Ausloggen
                            </Link>
                        </div>
                    ) : (
                        <div className="UserOptions">
                            <Link to={"/login"} className="nav-link">
                                Einloggen
                            </Link>
                            <Link to={"/register"} className="nav-link">
                                Registrieren
                            </Link>
                        </div>
                    )}
                </section>

                <section className="components">

                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Page1 />} />
                        <Route path={"/page2"} element={<Page2 />} />
                        <Route path={"/register"} element={<RegisterForm />} />
                        <Route path={"/login"} element={<LoginForm />} />
                    </Routes>

                    <Aside />
                </section>
            </main>
        )
    }
}

export default Content;