import {  createContext, useState } from "react";

export const FireBaseContext = createContext(null)

export const userContext = createContext(null)

export function UserContextFunction({ children }) {
    const [user, setUser] = useState(null)
    return (
        <userContext.Provider value={{ user,setUser }}>
            {children}
        </userContext.Provider>
    )
}
