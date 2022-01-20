import React, { useEffect, useState } from 'react';
import Chat from './chat'
import io from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
// const socket = io("http://localhost:3001");
const socket = io("https://chat.zunguze.com");

const Register: React.FC = () => {
    const [username, setUsername] = useState("user1")
    const [room, setRoom] = useState("x1")
    const [showChat, setshowChat] = useState(false)

    const navigate = useNavigate();
    
    const joinRoom = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (username !== "" && room !== "") {
        socket.emit("join_chat_room", room);
        setshowChat(true)
      }
    };
  
 
    
    return (
      showChat?
      <Chat username={username} socket={socket} room={room}/>:

      <div className="register">
        <Container>
            <Form action="">
              <h1>{username}</h1>
                <Input type="username"  placeholder="username" value={username} onChange={e=>{setUsername(e.target.value)}}/>
                <Input type="room"  placeholder="room" value={room} onChange={e=>{setRoom(e.target.value)}}/>
              <Button onClick={joinRoom}>Join</Button>
            </Form>
        </Container>
      </div>
    );
}

export default Register;

const Container = styled.div`
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const Form = styled.form`
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Input = styled.input`
    color: black;
    border:  1px solid black;
    margin: 5px;
    padding: 5px;
    border:  2px solid gray;
    border-radius: 5px;
`

const Button = styled.button`
    color: black;
    border:  2px solid gray;
    margin: 5px;
    padding: 5px;
    background-color: white;
    border-radius: 5px;
`