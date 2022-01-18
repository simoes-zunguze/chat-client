import React, { useEffect, useState } from 'react';
import Chat from './chat'
import io from "socket.io-client";
import { useNavigate } from 'react-router-dom';

const socket = io("http://localhost:3001");
// import { Container } from './styles';

const Register: React.FC = () => {
    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")
    const [showChat, setshowChat] = useState(false)

    const navigate = useNavigate();
    
    const joinRoom = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (username !== "" && room !== "") {
        socket.emit("join_chat_room", room);
        setshowChat(true)
      }
    };
  
    useEffect(() => {
        socket.on('receive', data =>{
          console.log(data);
          
        })
    }, [socket])
    
    
    return (
      showChat?
      <Chat username={username} socket={socket} room={room}/>:

      <div className="register">
        <form action="">
          <h1>{username}</h1>
            <input type="username"  placeholder="username" value={username} onChange={e=>{setUsername(e.target.value)}}/>
            <input type="room"  placeholder="room" value={room} onChange={e=>{setRoom(e.target.value)}}/>
          <button onClick={joinRoom}>Join</button>
         
        </form>
      </div>
    );
}

export default Register;