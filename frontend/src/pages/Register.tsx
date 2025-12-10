import { useState, type EventHandler } from "react";

interface User{
    id: number,
    email: string,
    role: string
}

interface RegisterPayload{
    email: string,
    password: string,
    role: string
}

export default function Register()
{

    const [formData, setFormData] = useState<User>();
    const [message, setMessage] = useState<string>("");


//     const handleChange = (e) =>{
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     }

//     const handleSubmit = async(e) => {
//     e.preventDefault(); // Zatrzymaj przeładowanie strony

//     try {
//       const response = await fetch('http://localhost/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json', // Ważne: mówimy Symfony, że to JSON
//         },
//         body: JSON.stringify(formData), // Pakujemy dane w JSON
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage('Sukces: ' + data.message);
//         // Tu możesz zrobić przekierowanie na logowanie
//       } else {
//         setMessage('Błąd: ' + (data.error || 'Coś poszło nie tak'));
//       }

//     } catch (error) {
//       setMessage('Błąd połączenia z serwerem');
//     }
//   };

    return <>
    <div className="w-full h-[calc(100vh)] flex items-center justify-center bg-slate-900 p-4">
        <div className="-mt-80 w-full max-w-md bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700">
    
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Register new user</h2>

            <form className="space-y-6">
            
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input type="email" name="email" className="w-full px-4 py-2 bg-slate-900 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                <input type="password" name="password" className="w-full px-4 py-2 bg-slate-900 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Roles</label>
                <select name="roles" className="w-full px-4 py-2 bg-slate-900 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200">
                    <option value="e">Employee</option>
                    <option value="m">Manager</option>
                    <option value="a">Admin</option>
                </select>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-[1.02]">Register</button>
            
            </form>

        </div>
    </div>
    </>

}