import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
//import { bindActionCreators } from 'redux';

import { addReminder, deleteReminder, clearReminders } from '../actions'; 
import '../../public/stylesheet/app.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '', 
            dueDate: ''
        }
    }

    addReminder() {
        console.log('deudate', this.state.dueDate);
        this.props.addReminder(this.state.text, this.state.dueDate);
    }

    deleteReminder(id) {
        this.props.deleteReminder(id);
    }
    
    renderReminders() {
        const { reminders } = this.props;
        return (
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        return (
                            <li key={reminder.id}
                                className="list-group-item">
                                
                                <div className="list-item">
                                    <div>{reminder.text}</div>
                                    <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                                </div>
                                
                                <div className="list-item delete-button"
                                     onClick={() => this.deleteReminder(reminder.id)}>&#x2715;</div>      
                            
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render() {

        return (

            <div className="App">

                <div className="title">Reminder</div>

                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input className="form-control" 
                               placeholder="I have to.." 
                               onChange={e => this.setState({text: e.target.value})} />
                    </div>

                    <input type="datetime-local"
                           className="form-control"
                           onChange={e => this.setState({dueDate: e.target.value})} />

                    <button type="button" 
                            className="btn btn-success"
                            onClick={() => this.addReminder()}>Add Reminder</button>
                
                </div>

                { this.renderReminders() }

                <div className="btn btn-danger"
                     onClick={() => this.props.clearReminders()}>Clear Reminders</div>

            </div>
        );
    }
}


// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({addReminder}, dispatch);
// }


function mapStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);