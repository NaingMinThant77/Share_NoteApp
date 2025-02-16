import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        // const storedToken = localStorage.getItem("token")
        // return storedToken ? JSON.parse(storedToken) : null
        return localStorage.getItem("token") || null;
    });

    const updateToken = (JWTtoken) => {
        // const token = JSON.stringify(JWTtoken);
        // localStorage.setItem("token", token)
        localStorage.setItem("token", JWTtoken);
        setToken(JWTtoken)
    }

    return (
        <UserContext.Provider value={{ token, updateToken }}>
            {children}
        </UserContext.Provider >
    )
}