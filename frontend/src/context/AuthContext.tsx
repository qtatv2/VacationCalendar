import { createContext, useContext, useState, type ReactNode } from "react";

export interface User{
    email: string,
    firstName: string,
    lastName: string,
    role: string
}

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextType {
    user: User | null;
    token: string | null;  
    login: (token: string, userData: User) => void; 
    logout: () => void;  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const login = (newToken: string, newUserData: User) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUserData));
        
        setToken(newToken);
        setUser(newUserData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("UseAuth error");
    }
    
    return context;
};