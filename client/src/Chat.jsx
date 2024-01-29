import { useContext, useEffect, useState } from "react";
import {UserContext} from "./UserContext";
import Avatar from "./Avatar";
import Logo from "./Logo";

export default function Chat() {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({})
  const [selectedUserId, setSelectedUserId] = useState(null);
  const {username, id, setId, setUsername} = useContext(UserContext);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');
    setWs(ws);
    
    ws.addEventListener('message', handleMessage);
  }, []);

  function showOnlinePeople(peopleArray) {
    const people = {};
    peopleArray.forEach(({userId,username}) => {
      people[userId] = username;
    });
    console.log(people);
    setOnlinePeople(people);
  }

  function handleMessage(e) {
    const messageData = JSON.parse(e.data);
    console.log(messageData);
    
    if ('online' in messageData) {
      showOnlinePeople(messageData.online);
    }
  
  }

  const onlinePeopleExclOurUser = {...onlinePeople};
  delete onlinePeopleExclOurUser[id];

  return (
    <div className="flex h-screen">
      <div className="bg-white w-1/3">
        <Logo />
        
        {Object.keys(onlinePeopleExclOurUser).map(userId => (
          <div 
            onClick={() => setSelectedUserId(userId)}
            className={"border-b border-gray flex items-center gap-2 cursor-pointer ml-2 "+(userId === selectedUserId ? 'bg-indigo-200' : '')} 
            key={userId}
          >
            {userId === selectedUserId && (
            <div className="w-1 bg-indigo-500 h-12 rounded-r-md"></div>
            )}
          
            <div className="flex gap-2 py-2 pl-4 items-center">
              <Avatar username={onlinePeople[userId]} userId={userId} />
              <span className="text-gray-800">{onlinePeople[userId]}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col bg-indigo-200 w-2/3 p-2">
        <div className="flex-grow">
          {!selectedUserId && (
            <div className="flex h-full flex-grow items-center justify-center">
              <div>&larr; Select a person from the sidebar</div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Type your message here" 
            className="bg-white flex-grow outline-none border-2 border-gray-400 rounded-md p-2 focus:border-indigo-500 transition-all"
          />
          <button className="bg-indigo-500 p-2 text-white rounded-md hover:bg-indigo-600 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}