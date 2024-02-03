import Avatar from "./Avatar.jsx";

export default function Contact({id, username, onClick, selected, online}) {
  return (
    <div 
      key={id} 
      onClick={() => onClick(id)}
      className={"border-b border-gray flex items-center gap-2 cursor-pointer ml-2 "+(selected ? 'bg-indigo-200' : '')} 
    >
    {selected && (
    <div className="w-1 bg-indigo-500 h-12 rounded-r-md"></div>
    )}
  
    <div className="flex gap-2 py-2 pl-4 items-center">
      <Avatar online = {online} username={username} userId={id} />
      <span className="text-gray-800">{username}</span>
    </div>
  </div>
  );
}