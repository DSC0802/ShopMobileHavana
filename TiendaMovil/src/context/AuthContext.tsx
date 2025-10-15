import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type User = {
    email: string;
    name?: string;
};

type AuthContextValue = {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (email: string, password: string, name?: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);


const STORAGE_KEY = 'tm_users_v1';

const DEMO_CREDENTIALS = { email: 'sueirodaniel04@gmail.com', password: '12345678', name: 'Daniel Sueiro' };

type StoredUser = { email: string; password: string; name?: string };

const readUsers = (): StoredUser[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [DEMO_CREDENTIALS];
        return JSON.parse(raw) as StoredUser[];
    } catch {
        return [DEMO_CREDENTIALS];
    }
};

const writeUsers = (users: StoredUser[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch {

    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string) => {
        await new Promise(r => setTimeout(r, 300));
        const users = readUsers();
        const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (found) {
            setUser({ email: found.email, name: found.name });
            return true;
        }
        return false;
    };

    const register = async (email: string, password: string, name?: string) => {
        await new Promise(r => setTimeout(r, 300));
        const users = readUsers();
        const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (exists) return false;
        const newUser: StoredUser = { email, password, name };
        const updated = [...users, newUser];
        writeUsers(updated);
        setUser({ email, name });
        return true;
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
