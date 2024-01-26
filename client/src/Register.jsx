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
    <div className="bg-blue-50 h-screen flex flex-col items-center pt-20">

      <img src={Logo} alt="Logo"/>

      <div className="mt-16">

        <form className="w-64 mx-auto" onSubmit={handleSubmit}>

          <input value={username} onChange={e => setUserName(e.target.value)} type="text" placeholder="username" className="block w-full rounded-sm p-2 mb-2 border"/>

          <input value={password} onChange={e => setUserPassword(e.target.value)} type="password" placeholder="password" className="block w-full rounded-sm p-2 mb-2 border"/>

          <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
            {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
          </button>

        </form>
      </div>

      <div className="text-center mt-2">
        {isLoginOrRegister === 'register' && (
          <div>
            Already a member? 
            <button onClick={() => setIsLoginOrRegister('login')}>
              Login here
            </button>

          </div>
        )}

        {isLoginOrRegister === 'login' && (
          <div>
            Don't have an account? 
            <button onClick={() => setIsLoginOrRegister('register')}>
              Register
            </button>

          </div>
        )}

      </div>
    </div>
  )
}