import React, { useContext } from 'react';
import { UserContext } from '../../UserContext'
import { Link } from 'react-router-dom';
import RoomList from './RoomList';

const Home = () => {
    const { user, setUser } = useContext(UserContext)
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
                            <form >
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder="Enter a room name"
                                            id="room" type="text" className="validate" />
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