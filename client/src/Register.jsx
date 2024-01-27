import axios from "axios";
import { useContext, useState } from "react"

import Logo from '../images/chat-logo.png'
import { UserContext } from "./UserContext";

export default function RegisterAndLoginForm() {
  const [username, setUserName] = useState('');
  const [password, setUserPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('register');
  const {setLoggedUsername, setId} = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const url = isLoginOrRegister === 'register' ? 'register' : 'login';
    const {data} = await axios.post(url, {username, password});
    setLoggedUsername(username);
    setId(data.id)
  }

  return (
    <div className="bg-indigo-200 h-screen flex flex-col items-center pt-20">

      <img src={Logo} alt="Logo"/>

      <div className="mt-16">

        <form className="w-80 mx-auto" onSubmit={handleSubmit}>

          <input value={username} onChange={e => setUserName(e.target.value)} type="text" placeholder="username" className="block w-full rounded-sm p-2 mb-2 outline-none border-2 border-gray-400 focus:border-indigo-500 transition-all"/>

          <input value={password} onChange={e => setUserPassword(e.target.value)} type="password" placeholder="password" className="block w-full rounded-sm p-2 mb-2 outline-none border-2 border-gray-400 focus:border-indigo-500 transition-all"/>

          <button className="bg-indigo-400 text-white font-semibold text-lg tracking-wide block w-full rounded-sm p-2 transition-all hover:bg-indigo-500">
            {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
          </button>

        </form>
      </div>

      <div className="text-center mt-2">
        {isLoginOrRegister === 'register' && (
          <div className="flex gap-1">
            Already a member? 
            <button 
              onClick={() => setIsLoginOrRegister('login')}
              className="underline text-blue-950 font-semibold"
            >
              Login here
            </button>

          </div>
        )}

        {isLoginOrRegister === 'login' && (
          <div className="flex gap-1">
            Don't have an account? 
            <button 
              onClick={() => setIsLoginOrRegister('register')}
              className="underline text-blue-950 font-semibold"
            >
              Register
            </button>

          </div>
        )}

      </div>
    </div>
  )
}