import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../UserContext'
import { Link } from 'react-router-dom';
import RoomList from './RoomList';
import io from "socket.io-client";

let socket;

const Home = () => {
    const ENDPOINT = 'http://localhost:8082';
    useEffect(() => {
        socket = io(ENDPOINT);
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT])
    const { user, setUser } = useContext(UserContext);
    const [room, setRoom] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        socket.emit('create-room', room)
        console.log(room);
        setRoom('');
    }
    const rooms = [
        {
            name: 'room 1',
            _id: '1',
        },
        {
            name: 'room 2',
            _id: '2',
        },
    ]

    const setAsJohn = () => {
        const john = {
            name: 'john',
            email: 'john@email.com',
            password: '123',
            id: '123',
        }
        setUser(john);
    }
    const setAsTom = () => {
        const john = {
            name: 'tom',
            email: 'tom@email.com',
            password: '1',
            id: '1',
        }
        setUser(john);
    }
    return (
        <div>
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Welcome {user ? user.name : ''}</span>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder="Enter a room name"
                                            id="room" type="text" className="validate" 
                                            value={room}
                                            onChange={e => setRoom(e.target.value)}/>
                                        <label htmlFor="room">Room</label>
                                    </div>
                                </div>
                                <button className="btn">Create Room</button>
                            </form>

                        </div>
                        <div className="card-action">
                            <a href="#" onClick={setAsJohn}>Set As John</a>
                            <a href="#" onClick={setAsTom}>Set As Tom</a>
                        </div>
                    </div>
                </div>
                <div className="div.col.s6.m5.offset-1">
                    <RoomList rooms={rooms}/>
                </div>

            </div>
            <Link to={'/chat'}>
                <button>Go to Chat</button>
            </Link>
        </div>
    );
};

export default Home;