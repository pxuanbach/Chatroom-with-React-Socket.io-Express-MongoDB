import React, {useContext, useEffect} from 'react';
import {UserContext} from '../../UserContext'
import { Link, useParams } from 'react-router-dom';
import io from "socket.io-client";

let socket;

const Chat = () => {
    const ENDPOINT = 'http://localhost:8082';
    const {user, setUser} = useContext(UserContext)
    let {room_id, room_name} = useParams();
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('join', {name: user.name, room_id, user_id: user.id})
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT]);
    return (
        <div>
            <div>{room_id} {room_name}</div>
            <h1>Chat {JSON.stringify(user)}</h1>
            <Link to={'/'}>
                <button>Go to Home</button>
            </Link>
        </div>
    );
}

export default Chat;