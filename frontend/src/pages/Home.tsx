import { useEffect, useState } from 'react'

interface ApiResponse {
  message: string;
  date: string;
  items: string[];
}

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/hello')
      .then(response => {
        if (!response.ok) {
          throw new Error('Błąd sieci: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(err => setError(err.message));
  }, []);

  return <>
    <div className="flex flex-col items-center justify-center p-10">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl max-w-lg w-full border border-slate-700">
        
        <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">
          Symfony + React
        </h1>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-4 border border-red-500/50">
            🚨 Błąd: {error}
          </div>
        )}

        {!data && !error && (
          <p className="text-center animate-pulse text-gray-400">Ładowanie danych z API...</p>
        )}

        {data && (
          <div className="space-y-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm uppercase tracking-wider font-bold">Wiadomość:</p>
              <p className="text-2xl mt-1">{data.message}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700 p-4 rounded-lg">
                <p className="text-gray-400 text-sm font-bold">Czas serwera:</p>
                <p className="font-mono text-green-400">{data.date}</p>
              </div>
              <div className="bg-slate-700 p-4 rounded-lg">
                <p className="text-gray-400 text-sm font-bold">Stack:</p>
                <ul className="list-disc list-inside text-blue-300 text-sm mt-1">
                  {data.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
}