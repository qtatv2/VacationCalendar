import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";

export interface EmployeeDto {
    firstName: string;
    lastName: string;
}

export interface VacationRequest{
    id: number,
    employee: EmployeeDto,
    startDate: string | null,
    endDate: string | null,
    daysCount: number,
    type: string,
    status: string,
}

const translateStatus = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'approved': return 'Zatwierdzony';
        case 'rejected': return 'Odrzucony';
        case 'pending': return 'Oczekujący';
        default: return 'Oczekujący'; 
    }
};

export default function Requests()
{
    const [data,setData] = useState<VacationRequest[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { token } = useAuth();
    
  useEffect(() => {
    if(!token)
    {
        setIsLoading(false);
        return;
    }
    const fetchRequests = async () =>{
        setIsLoading(true);
        try{
            const response = await fetch('/api/requests',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        
         if (!response.ok)
         {
            throw new Error('Błąd: ' + response.status);
         } 
         const result = await response.json();
         setData(result);
    } catch (err: any)
    {
        setError(err.message);
    }finally
    {
        setIsLoading(false);
    }
    };

    if(token) {
        fetchRequests();
    }
  

}, [token]);

if (isLoading) return <p>Ładowanie wniosków...</p>;
if (error) return <p className="text-red-500">Błąd: {error}</p>;

    return <>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
    
    {data.map((element) => (
        <div key={element.id} className="h-full">
            <div className="p-5 bg-slate-800 text-slate-300 rounded-xl border border-slate-700 shadow-lg hover:border-slate-500 transition-colors h-full flex flex-col justify-between">
                
                <div className="mb-4 border-b border-slate-700 pb-2">
                    <p className="text-lg font-bold text-white mb-1">
                        {element.employee.firstName} {element.employee.lastName}
                    </p>
                    <p className="text-sm text-green-400 font-medium uppercase tracking-wide">
                        {element.type}
                    </p>
                </div>

                <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                        <span className="text-slate-500">Początek:</span>
                        <span className="font-semibold text-white">
                            {element.startDate ? new Date(element.startDate).toLocaleDateString('pl-PL') : '-'}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Koniec:</span>
                        <span className="font-semibold text-white">
                            {element.endDate ? new Date(element.endDate).toLocaleDateString('pl-PL') : '-'}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Liczba dni:</span>
                        <span className="font-bold text-white">{element.daysCount}</span>
                    </div>
                </div>

                <div className="mt-auto pt-2">
                    <span className={`
                    inline-block px-3 py-1 rounded-full text-xs font-bold uppercase
                        ${element.status === 'approved' ? 'bg-green-900 text-green-300 border border-green-700' : 
                          element.status === 'rejected' ? 'bg-red-900 text-red-300 border border-red-700' : 
                          'bg-yellow-900 text-yellow-300 border border-yellow-700'}`}>
                        Status: {translateStatus(element.status)}
                    </span>
                </div>

            </div>
        </div>
    ))}

</div>
    </>
}