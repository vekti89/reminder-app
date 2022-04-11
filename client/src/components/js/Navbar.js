import React, { Component } from 'react'; 
import "../css/Navbar.css"; 
import {NavLink} from "react-router-dom";


class Navbar extends Component {
   
    render() {
        return (
            <main className="Navbar">
                <NavLink to="#">Home</NavLink>
                <NavLink to="/">Menüpunkt 1</NavLink>
                <NavLink to="/page2">Menüpunkt 2</NavLink>
            </main>
        )
    }
}

export default Navbar;