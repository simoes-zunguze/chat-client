import React, { FC, useState } from 'react'
import { Socket } from 'socket.io-client';

export interface Props{
    socket: Socket,
    username: string,
    room: string
}

const Chat:FC<Props> =({socket, username, room}) => {

    const [message, setMessage] = useState("")
    const sendMessage = async ( e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (message !== '') {
  
          socket.emit("send", {
              username: username,
              room: room,
              message: message
          })
        }
    }
    return (
        <div>
            <input type="text" placeholder="message"  value={message} onChange={e=>{setMessage(e.target.value)}}/>
            <button onClick={sendMessage}>send</button>
        </div>
    )
}

export default Chat;