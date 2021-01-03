import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import { environment } from "../App";
import Axios, { AxiosResponse } from "axios";
import { IUserData } from "../providers/AuthProvider";

interface IChatRoom {
    id: number;
    private?: boolean;
    name: string;
}

interface IMessageType {
    type: string;
    content: string | null;
    sender: string;
}

function Chats(props: IUserData) {

    const [chatrooms, setChatrooms] = useState([]);
    const [client, setClient]: any = useState(null);
    const [message, setMessage]: [string, Dispatch<SetStateAction<string>>] = useState('');
    const [room, setRoom]: [IChatRoom, Dispatch<SetStateAction<IChatRoom>>] = useState({ id: 0, name: '' });
    const [chatMessages, setChatMessages]: [IMessageType[] | any, Dispatch<SetStateAction<IMessageType[] | any>>] = useState([]);

    const connectToRoom = (roomId: number, roomName: string): void => {
        setRoom({ id: roomId, name: roomName });
        //@ts-ignore
        let socket = new SockJS(`http://${environment}:8080/ws`);
        //@ts-ignore
        const stompClient = Stomp.over(socket);

        stompClient.connect({
            Bearer: props.token,
            room: roomId
        }, async function (): Promise<void> {

            stompClient.subscribe('/topic/public', onMessageReceived, { Bearer: props.token, room: roomId });
            stompClient.subscribe('/topic/' + roomId, onMessageReceived, { Bearer: props.token, room: roomId });

            const chatMessages: AxiosResponse<IMessageType[]> = await Axios.get(`http://${environment}:8080/chatroom/getAllMessages/${roomId}`, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            });
            
            setChatMessages((prev: any) => prev.concat(chatMessages.data));

            if (props.token) {
                stompClient.send("/app/chat.addUser", {
                    Bearer: props.token,
                    room: 1
                },
                    JSON.stringify({ sender: props.username, type: 'JOIN' })
                )
            }

        }, function (error: string): void {
            console.log(error, "error");
            disconnectFromRoom();
        });
        setClient(stompClient);
    }

    const disconnectFromRoom = (): void => {
        if (client) {
            client.disconnect();
            client.unsubscribe('/topic/public');
            client.unsubscribe('/topic/' + room.id);
        }
        setRoom({ id: 0, name: '' });
        setChatMessages([]);
    }

    const onMessageReceived = (payload: any): void => {
        const message: IMessageType = JSON.parse(payload.body);
        let obj = {};

        switch (message.type) {
            case "JOIN":
                if (message.sender === props.username) {
                    return;
                }
                obj = {
                    content: `has joined the chat!`,
                    sender: message.sender,
                    type: message.type
                };
                break;
            case "CHAT":
                obj = {
                    content: message.content,
                    sender: message.sender,
                    type: message.type
                };
                break;
            case "LEAVE":
                obj = {
                    content: `has left the chat!`,
                    sender: message.sender,
                    type: message.type
                };
                break;
        }
        
        setChatMessages((prev: any) => [...prev, obj]);
    }

    const sendMessage = (event: any): void => {
        if (message !== '' && client && room.id !== 0) {
            let chatMessage = {
                sender: props.username,
                content: message,
                type: 'CHAT'
            };
            client.send("/app/chat.sendMessage/" + room.id, {
                Bearer: props.token,
                room: room.id
            }, JSON.stringify(chatMessage));
            setMessage('');
        }
        event.preventDefault();
    }

    const getChatRooms = async (): Promise<void> => {
        const chatrooms: AxiosResponse = await Axios.get(`http://${environment}:8080/chatroom/getAll/`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        });
        setChatrooms(chatrooms.data);
    }

    useEffect(() => {
        getChatRooms();
    }, []);

    const chatWindow = (): JSX.Element => {
        return <div>
            <strong>Chat room: {room.name}</strong> <button style={{ padding: '10px', float: 'right', background: '#eb4914', border: 'none', color: 'white' }} onClick={disconnectFromRoom}>Leave chatroom</button>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
            {chatMessages.map((chatMessage: IMessageType, index: number) => {
                return ChatBubble(chatMessage)
            })}
            </div>
            <input style={{ padding: '10px' }} placeholder="type something" value={message} onChange={(event: any) => { setMessage(event.target.value) }} />
            <button style={{ padding: '10px', float: 'right', background: '#eb4914', border: 'none', color: 'white' }} onClick={sendMessage}>Send message</button>
        </div>
    }

    const ChatBubble = (chatMessage: IMessageType): JSX.Element => {
        const message = `${chatMessage.sender}: ${chatMessage.content}`
        return (
            <div 
                style={{
                    padding: '15px',
                    width: '40%',
                    marginBottom: '10px',
                    marginTop: '10px',
                    marginLeft: chatMessage.sender === props.username ? '55%' : '',
                    float: chatMessage.sender === props.username ? 'right' : 'left',
                    background: chatMessage.sender === props.username ? '#eb4914' : 'white',
                    color: chatMessage.sender === props.username ? 'white' : 'black'
                }}
            >
                {message}
            </div>
        )
    }

    return (
        <React.Fragment>
            {room.id !== 0 ? (chatWindow()) :
                <React.Fragment>
                    <h4>Welcome, {props.username}</h4>
                    <h2>Active chats</h2>
                    {chatrooms.map((chatroom: IChatRoom) => {
                        if (!chatroom.private) {
                            return <table style={{ width: '100%', background: 'white', border: '1px solid #484848', borderRadius: '3px', padding: '2px 5px' }}><tbody><tr key={chatroom.id}>
                                <td
                                    onClick={() => { connectToRoom(chatroom.id, chatroom.name) }}
                                ><span style={{ fontSize: '20px' }}>{chatroom.name}</span></td>
                            </tr></tbody> </table>
                        }
                    })}


                </React.Fragment>}
        </React.Fragment>
    );
}

export default Chats;