
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

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsLogin(true);
        }
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    return <UserContext.Provider value={{ userDetails, setUserDetails, isLogin, setIsLogin, user, setUser }}>
        {children}
    </UserContext.Provider>
}

export const useUser = () => {
    return useContext(UserContext);
}