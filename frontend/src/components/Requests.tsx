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
    const [data,setData] = useState<VacationRequest[]>([]);
    const [error, setError] = useState<string | null>(null);
    
  useEffect(() => {
  fetch('/api/home') 
    .then(response => {
       if (!response.ok) throw new Error('Błąd: ' + response.status);
       return response.json();
    })
    .then(data => {
       setData(data);
       console.log(data);
    })
    .catch(err => {
       setError(err.message);
    });
}, []);

    return <>
        {data.map((element) => (
            <div key={element.id}>
                <div>
                    <p>Employee  {element.employee}</p>
                    <p>Start date: {element.startDate ? new Date(element.startDate).toLocaleDateString('pl-PL') : '-'}</p>
                    <p>Start date: {element.endDate ? new Date(element.endDate).toLocaleDateString('pl-PL') : '-'}</p>
                    <p>Days  {element.daysCount}</p>
                    <p>Type  {element.type}</p>
                    <p>Status  {element.status}</p>
                    <p>Requested {element.createdAt}</p>
                </div>
                <br></br>
            </div>
        ))}
    </>
}