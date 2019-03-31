import React, { Component } from 'react';
import MessageList from './components/message/MessageList'
import SendMessageForm from './components/message/SendMessageForm'
import openSocket from "socket.io-client";
import './App.css';

const SERVER_URL = 'http://localhost:8080';
const USER_ID = "2"; 
const socket = openSocket("http://localhost:8080/messages");

class App extends Component {
  constructor() {
    super()
    this.state = {
        messages: []
    }
    this.sendMessage = this.sendMessage.bind(this)

    socket.on("chat", message => {      
      console.log(message);
    });

  }
  
  async initMessages(){
    
    await fetch(SERVER_URL).then( res => res.json())
    .then( res => {      
      
      this.setState({
        messages: res
      });      
    })
    .catch(error => console.error('Error:', error));

  }

  componentDidMount() {      
      this.initMessages();
  }

  sendMessage(contents) {
    
    let chat = {
      person: {
        id: USER_ID
      },
      contents: contents
    }

    fetch(SERVER_URL, {
      method: 'POST',
      body: JSON.stringify(chat), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  
  }

  render() {
      return (
          <div className="app">
            <Title />
            <MessageList 
                roomId={this.state.roomId}
                messages={this.state.messages} />
            <SendMessageForm
                sendMessage={this.sendMessage} />
          </div>
      );
  }
    
}

function Title(){
  return <p className="title">Chat app for Doodle</p>
}

export default App;
