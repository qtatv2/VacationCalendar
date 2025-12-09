export default function Register()
{
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
                <input type="password" name="password"
                className="w-full px-4 py-2 bg-slate-900 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Roles</label>
                <input type="roles" name="roles" className="w-full px-4 py-2 bg-slate-900 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-[1.02]">Register</button>
            
            </form>

        </div>
    </div>
    </>

}