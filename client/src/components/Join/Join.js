import React,{useState} from 'react';
import {TextField} from "@material-ui/core";
import {Link} from 'react-router-dom'
import "./join.css";

const Join = () => {
    const [name,setName] = useState('')
    const [room,setRoom] = useState('')
    return (
        <div className="roomOuterContainer">
            <div className="logo">
            </div>
            <div className="roomInnerContainer">
                <h1 className="heading">Welcome To TrashTalk</h1>
                <div>
                    <TextField className="joinInput" variant="filled" label="Enter your Name" color = "primary" margin = "dense" type ="search"onChange={e=>setName(e.target.value)}/>
                </div>
                <div>
                    <TextField className="joinInput mt-20" variant="filled" label="Enter Room Name" color = "primary" margin = "dense" type ="search"onChange={e=>setRoom(e.target.value)}/>
                </div>
                <Link onClick={e => (!name||!room)?e.preventDefault():null} to={`/chat?name=${name}&room=${room}`} >
                    <button className={'button mt-20'} type="submit">Join Room</button>
                </Link>
            </div>
        </div>
    );
};

export default Join;