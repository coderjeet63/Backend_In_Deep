import React from 'react'
import { createContext ,  useState} from 'react'


export const CreateContext = createContext();

// ✅ 2. CREATE A PROVIDER COMPONENT
export const CreateContextProvider = ({children}) =>
{
 
    const [user, setUser] = useState(null); // Initially no user logged in

  const login = (name) => {
    setUser({ name: name, role: "Developer" });
  };

  const logout = () => {
    setUser(null);
  };


  return(
    <CreateContext.Provider value={{user, login, logout}}>
        {children}
    </CreateContext.Provider>
  )


}