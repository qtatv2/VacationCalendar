import { useState, type ChangeEvent, type FormEvent } from "react";

interface RegisterPayload{
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
}

export default function Register()
{

    const [formData, setFormData] = useState<RegisterPayload>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "ROLE_USER"
    });
    const [message, setMessage] = useState<string[]>([]);


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e: FormEvent) => {
    e.preventDefault(); 

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(['Sukces: ' + data.message]);

        setFormData({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            role: "ROLE_USER"
        });

      } else {
        setMessage((data.error || 'Coś poszło nie tak'));
      }

    } catch (error) {
      setMessage(['Błąd połączenia z serwerem']);
    }
  };

    return <>
    <div className="w-full h-[calc(100vh)] flex items-center justify-center bg-slate-900 p-4">
        <div className="-mt-80 w-full max-w-md bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700">
    
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Zarejestruj nowego pracownika</h2>

            {message.length > 0 && (
                <div className={`mb-6 p-4 rounded-md text-center font-bold ${
                    message.some(msg => msg.includes('Sukces'))
                    ? 'bg-green-600 text-white border border-green-500' 
                    : 'bg-red-600 text-white border border-red-500'
                }`}>
                    {message.map((m, index)=>(
                        <div key={index}>
                        {m}
                        </div>
                    ))}
                </div>
)}

            <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 bg-slate-900 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Hasło</label>
                <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 bg-slate-900 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Imię</label>
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2 bg-slate-900 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Nazwisko</label>
                <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2 bg-slate-900 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Rola</label>
                <select required name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 bg-slate-900 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200">
                    <option value="ROLE_USER">Pracownik</option>
                    <option value="ROLE_MANAGER">Kierownik</option>
                    <option value="ROLE_ADMIN">Administrator</option>
                </select>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-[1.02]">Register</button>
            
            </form>

        </div>
    </div>
    </>
}