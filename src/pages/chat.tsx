import React, { FC, useEffect, useState, KeyboardEvent as KeyEvent } from 'react'
import { Socket } from 'socket.io-client';
import {v4 as uuidv4} from 'uuid';
import styled from "styled-components";

export interface Props{
    socket: Socket,
    username: string,
    room: string,
}

export interface Message{
    username: string,
    date?: Date,
    room: string,
    me?: boolean,
    text: string,
    id?: string
}

const Chat:FC<Props> =({socket, username, room}) => {

    const [text, setText] = useState("example")
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = async () => {
  
        if (text !== '') {
            let newMessage:Message = {username: username, room: room, text: text, date:new Date(), id: uuidv4(), me: true}
            setMessages([...messages, newMessage])

          socket.emit("send", {
              username: username,
              room: room,
              text: text,
          })
          console.log(messages);
          
        }
    }

    const receiveMessage = (message:Message) => {
        console.log('---');

        let newMessage:Message = {...message, date:new Date(), id: uuidv4(), me: false};
      
        setMessages(messages => [...messages, newMessage])
        console.log(newMessage);
        console.log(messages);

    }
    
   
    useEffect(() => {
        socket.on('receive', data =>{
            
            receiveMessage({...data})
        })    
    }, [])
    
    return (
        <Container>
            
            <ChatBox>
                {
                    messages.map(message =>{
                        return( 
                            message.me?
                            <MyMessage key={message.id}>
                               {message.text} <Name> :[{message.username}]</Name> 
                            </MyMessage>:
                            <TheirMessage key={message.id}>
                                <Name> [{message.username}]:</Name>{message.text}
                            </TheirMessage>
)
                    })
                }
            </ChatBox>
            <MessageBox>
                    <MessageInput type="text" placeholder="message"  value={text}
                         
                        onChange={ e =>{setText(e.target.value)}}
                        onKeyUp={e => {
                            e.preventDefault()
                            if(e.code === 'Enter')
                                sendMessage()
                        }}
                    />
                    <SendButton onClick={e => {
                        e.preventDefault()
                        sendMessage()
                    }} >send</SendButton>
            </MessageBox>
        </Container>
    )
}

export default Chat;

const Container = styled.div`
    height: 100vh;
    background-color:  #0C1518;
    width: 90%;
    max-width: 1200px;
`

const MessageBox = styled.div`
    position: relative;
    background-color:  black;
    padding: 5px;
`

const MyMessage = styled.div`
    position: relative;
    background-color:  black;
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`


const TheirMessage = styled.div`
    position: relative;
    background-color:  black;
    padding: 5px;
    display: flex;
    flex-direction: row;
  
`

const Name = styled.div`
    color: green;
`

const MessageInput = styled.input`
    background:  none;
    padding: 5px;
    width: calc(90% - 30px);
`


const SendButton = styled.button`
    background-color:  white;
    padding: 5px;
`

const ChatBox = styled.div`
    height: 90%;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`
