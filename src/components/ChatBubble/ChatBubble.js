import React, { useEffect, useState } from 'react';
// Style
import { StopOutlined } from '@ant-design/icons';
import './ChatBubble.css';

function ChatBubble(props) {
    const [Text, setText] = useState("");

    useEffect(() => {
        if (props) {
            if (props.chat) {
                const chat = props.chat.split('\n').map((str, index) => <p key={`bubble-chat-${props.index}-${index}`}>{str}</p>);
                setText(chat);
            }
        }
    }, [props]);

    // Reply
    if (props.reply) {
        return (
            <div className="bubble">
                <div className="bubble-reply"><p key={`bubble-reply-${props.index}`}>{props.reply}</p></div>
                {Text}
            </div>
        );
    }
    
    // Emoji
    if (props.emoji) {
        return (
            <p key={`bubble-emoji-${props.index}`} className="bubble-emoji">{props.emoji}</p>
        );
    }

    // Voice
    if (props.voice) {
        return (
            <div className="bubble voice">
                <StopOutlined />{Text}
            </div>
        );
    }

    // Notice
    if (props.notice) {
        return (
            <div className="bubble notice">
                <p key={`bubble-notice-${props.index}`}>{props.notice}</p>
            </div>
        );
    }

    return (
        <div className="bubble">
            {Text}
        </div>
    );
}

export default ChatBubble;