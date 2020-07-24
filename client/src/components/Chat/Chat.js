import React,{useState,useEffect} from 'react';
import queryString from 'query-string'
import io from 'socket.io-client';
import "./Chat.css";
import InfoBar from '../InfoBar/InfoBar';
import InputBox from '../InputBox/InputBox';
import Messages from '../Messages/Messages'

let socket;

const Chat = ({location}) => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState('')
    const endpoint = 'localhost:5000';
    
    useEffect(()=>{
        const {name,room} = queryString.parse(location.search);
        // console.log(name,room);
        socket = io(endpoint);
        setRoom(room);
        setName(name);
        console.log(socket);
        socket.emit('onJoin',{name,room});
        // return()=>{
        //     socket.emit('disconnect');
        //     socket.off();
        // }
    },[endpoint,location.search]);

    useEffect(()=>{
        console.log("useEffect called")
        socket.on('message',(message)=>{
            setMessages(messages => [...messages,message]);
            setMessage('');
            console.log("message set")
        });
    },[])

    //function for sending messages
    const sendMessage = (e) => {
        e.preventDefault();
        // setMessage(e.target.value);
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
      }
      //console.log(messages,message);
    return (
        <div>
           <div className="outerContainer">
               <div className="container">
                    <InfoBar room={room}/>
                   <Messages messages={messages} name={name}/>
                    <InputBox message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
           </div>
        </div>
    );
};

export default Chat;