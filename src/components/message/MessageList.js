import React, { Component } from 'react';
import Moment from 'react-moment';

export default class MessageList extends Component {
    render() {
        return (
            <ul className="message-list">
                {this.props.messages.map((message, index) => {
                    
                    return (
                      <li  key={message.id} className="message">
                        <div>{message.person.name}</div>
                        <div>{message.contents}</div>
                        <div>
                            <Moment format="DD MMM YYYY HH:mm">
                                {message.date}
                            </Moment>
                        </div>                        
                      </li>
                    )
                })}
            </ul>
        )
    }
}