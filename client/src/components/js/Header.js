import React, { Component } from 'react'; 
import "../css/Header.css"; 

class Header extends Component {
    render() {
        return (
            <main className="Header">
                <h1 className='Header-title display-1'><span className="Header-span"> </span>logo</h1>
            </main>
        )
    }
}

export default Header;