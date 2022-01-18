import React, { useState } from 'react';
import './App.css';
import Chat from './pages/chat'
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")

  const joinRoom = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (username !== "" && room !== "") {
      socket.emit("join_chat_room", room);
      // setShowChat(true);
    }
  };
  
  return (
    <div className="App">
      <form action="">
        <h1>{username}</h1>
          <input type="username"  placeholder="username" value={username} onChange={e=>{setUsername(e.target.value)}}/>
          <input type="room"  placeholder="room" value={room} onChange={e=>{setRoom(e.target.value)}}/>
        <button onClick={joinRoom}>Join</button>
      </form>
      <Chat></Chat>
    </div>
  );
}

export default App;
