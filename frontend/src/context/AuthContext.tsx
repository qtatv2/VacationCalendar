import { createContext, useContext, useState, type ReactNode } from "react";

interface User{
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
}

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextType {
    user: User | null;              
    setUser: (user: User | null) => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    
    return context;
};