import { createContext, useState } from "react"

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem("token")
        return storedToken ? JSON.parse(storedToken) : null
    });

    const updateToken = (JWTtoken) => {
        const token = JSON.stringify(JWTtoken);
        localStorage.setItem("token", token)
        setToken(JWTtoken)
    }

    return (
        <UserContext.Provider value={{ token, updateToken }}>
            {children}
        </UserContext.Provider >
    )
}