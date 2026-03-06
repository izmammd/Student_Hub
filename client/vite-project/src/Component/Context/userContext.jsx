
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserWrapper = ({ children }) => {

    const [userDetails, setUserDetails] = useState(
        {
            email: "",
            name: "",
            age: "",
            role: ""
        }
    )

    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Initialize auth state from localStorage on mount
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token) {
            setIsLogin(true);
        }

        if (storedUser) {
            setUser(storedUser);
        }

        setIsInitialized(true);
    }, []);


    return <UserContext.Provider value={{ userDetails, setUserDetails, isLogin, setIsLogin, user, setUser, isInitialized }}>
        {children}
    </UserContext.Provider>
}

export const useUser = () => {
    return useContext(UserContext);
}