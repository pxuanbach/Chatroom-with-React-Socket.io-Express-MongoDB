import React from 'react';
import Message from '../message/Message';
import STB from 'react-scroll-to-bottom';
import './Messages.css';

const Messages = ({messages, user_id}) => {
    return (
        <STB className="messages">
            {/* {JSON.stringify(messages)} */}
            {messages.map((message, index) => (
                <Message key={message._id} message={message} current_user_id={user_id}/>
            ))}
        </STB>
    )
}

export default Messages
