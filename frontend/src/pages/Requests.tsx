import { useEffect, useState } from "react"

interface VacationRequest{
    id: number,
    employee: string,
    startDate: string | null,
    endDate: string | null,
    daysCount: number,
    type: string,
    status: string,
    createdAt: string | null 
}
export default function Requests()
{
    const [data,setData] = useState<Array<VacationRequest>>([]);
    const [error, setError] = useState<string | null>(null);
    
  useEffect(() => {
  fetch('/api/home') // <--- Upewnij się, że ten adres jest dobry! (czytaj dalej)
    .then(response => {
       console.log("1. Status odpowiedzi:", response.status); // Czy to 200?
       if (!response.ok) throw new Error('Błąd: ' + response.status);
       return response.json();
    })
    .then(data => {
       console.log("2. Dane z API:", data); // <--- TU PATRZ W KONSOLI (F12)
       setData(data);
    })
    .catch(err => {
       console.error("3. Błąd:", err); // Jeśli tu wejdzie, zobaczysz dlaczego
       setError(err.message);
    });
}, []);

    return <>
        {data.map((element) => {
            <div key={element.id}> 
            {element.createdAt}
      </div>
        })}
    </>
}