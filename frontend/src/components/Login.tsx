import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, type User } from "../context/AuthContext";

interface LoginPayload{
    email: string,
    password: string
}

export default function Login()
{
    const [loginData, setLoginData] = useState<LoginPayload>({
        email: "",
        password: ""
        });
    const [error, setError] = useState<string>("");
    
    const { login } = useAuth(); 
    const navigate = useNavigate(); 

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch('/api/login_check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (response.ok) {
                const token = data.token;
                console.log("Zalogowano! Twój token:", data.token);

                const userResponse = await fetch('/api/me', {
                headers: { 'Authorization': `Bearer ${token}` }
                });
                const userData = await userResponse.json() as User;
                
                
                login(token, userData);
                navigate("/");

                setLoginData({
                    email: "",
                    password: ""
                })

            } else {
                setError("Błędny email lub hasło");
            }

        } catch (err) {
            setError("Błąd połączenia z serwerem");
        }
    };

    return <>
    <div className="w-full h-[calc(100vh)] flex items-center justify-center bg-slate-900 p-4">
        <div className="-mt-80 w-full max-w-md bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700">
    
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Zaloguj</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input required type="email" name="email" value={loginData.email} onChange={handleChange} className="w-full px-4 py-2 bg-slate-900 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Hasło</label>
                <input required type="password" name="password" value={loginData.password} onChange={handleChange} className="w-full px-4 py-2 bg-slate-900 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-[1.02]">Login</button>
            
            </form>

        </div>
    </div>
    </>
}