import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [username, setLoggedUsername] = useState(null)
  const [id, setId] = useState(null);

  useEffect(() => {
    axios.get('/profile').then(response => {
      setId(response.data.userId);
      setLoggedUsername(response.data.username);
    })
  }, [])

  return (
    <UserContext.Provider value={{username, setLoggedUsername, id, setId}}>
      {children}
    </UserContext.Provider>
  )
}