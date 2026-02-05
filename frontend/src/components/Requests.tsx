import { useEffect, useState } from "react"

interface EmployeeDto {
    firstName: string;
    lastName: string;
}

interface VacationRequest{
    id: number,
    employee: EmployeeDto,
    startDate: string | null,
    endDate: string | null,
    daysCount: number,
    type: string,
    status: string,
}
export default function Requests()
{
    const [data,setData] = useState<VacationRequest[]>([]);
    const [error, setError] = useState<string | null>(null);
    
  useEffect(() => {
  fetch('/api/requests') 
    .then(response => {
       if (!response.ok) throw new Error('Błąd: ' + response.status);
       return response.json();
    })
    .then(data => {
       setData(data);
    })
    .catch(err => {
       setError(err.message);
    });
   }, []);

    return <>
        {data.map((element) => (
            <div key={element.id}>
                <div className="p-4 bg-slate-400 text-green-200 rounded border-red-500 w-1/5">
                    <p>Pracownik: {element.employee.firstName} {element.employee.lastName}</p>
                    <p>Początek: {element.startDate ? new Date(element.startDate).toLocaleDateString('pl-PL') : '-'}</p>
                    <p>Koniec: {element.endDate ? new Date(element.endDate).toLocaleDateString('pl-PL') : '-'}</p>
                    <p>Dni: {element.daysCount}</p>
                    <p>Typ: {element.type}</p>
                    <p>Status: {element.status}</p>
                </div>
                <br></br>
            </div>
        ))}
    </>
}