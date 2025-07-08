"use client"

import { User } from "@/Domain/Models/user.model"
import axios from "axios"
import { createContext, useEffect, useMemo, useState } from "react"

type AuthContextProviderProps = {
    children: React.ReactNode
}

interface AuthContextType {
    user? : User,
    loading: boolean,
    error? : string,
}

// init auth context
export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthContextProvider = ({children} : AuthContextProviderProps) => {
    const [user,setUser] = useState<User>();
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [initLoading, setInitLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get("/session")
        .then((res) => res.data.data)
        .catch(() => {})
        .finally(() =>setInitLoading(false))
    },[])

    const memoValue = useMemo(
        () => ({
            user,
            loading,
            error
        }),
        [user,loading,error]
    );

    return (
        <AuthContext.Provider value={memoValue}>
            {
                initLoading ? (
                    <div>
                        Loading ...
                    </div>
                ) : (
                    children
                )
            }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;