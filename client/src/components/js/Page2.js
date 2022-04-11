import React, { Component } from 'react'; 
import "../css/Page2.css"; 
import ReminderList from './ReminderList';


class Page2 extends Component {
   constructor(props){
       super(props);

   }
    render() {
        return (
            <main className="Page2">
                <ReminderList/>
                
                <div className="Page2-border left"></div>
                <div className="Page2-border right"></div>
            </main>
        )
    }
}

export default Page2; 