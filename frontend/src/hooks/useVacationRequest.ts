import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export interface VacationRequestPayload{
    startDate: Date | null,
    endDate: Date | null,
    daysCount: number,
    type: string,
}

export const useVacationRequest =() =>{

    const [vacationRequestData, setVacationRequestData] = useState<VacationRequestPayload>({
        startDate: null,
        endDate: null,
        daysCount: 0,
        type: ""
    });

    const [isSelecting, setIsSelecting] = useState<boolean>(false);
    const [isCardOpen, setIsCardOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { token } = useAuth();

    const handleRequestClick = () =>{
        if (!isSelecting) 
            {
        setIsSelecting(true);
        setVacationRequestData(prev => ({
            ...prev,
            startDate: null,
            endDate: null,
            daysCount: 0
        }));
    }else {
            if (vacationRequestData.startDate !== null) {
                setVacationRequestData(prev => ({
                    ...prev,
                    startDate: null,
                    endDate: null,
                    daysCount: 0
                }));
            } 
            else {
                setIsSelecting(false);
            }
        }
    }

    const handleDayClick = (clickedDate: Date) =>{
        if (!isSelecting) return;

        setVacationRequestData((prev) => {
            if (!prev.startDate || (prev.startDate && prev.endDate)) {

                return {
                    ...prev,
                    startDate: clickedDate,
                    endDate: null,
                    daysCount: 1 
                };
            }else {
                let newStart = prev.startDate;
                let newEnd = clickedDate;

                if (newEnd.getTime() < newStart.getTime()) {
                    newEnd = newStart;      
                    newStart = clickedDate; 
                }

                const workingDays = countWorkingDays(newStart, newEnd);

                return {
                    ...prev,
                    startDate: newStart,
                    endDate: newEnd,
                    daysCount: workingDays
                };
            }
        });
    }

    const countWorkingDays = (start: Date, end: Date): number => {
    let count = 0;
    let currentDate = new Date(start);
    
    while (currentDate <= end) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            count++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return count;
    };

    const handleTypeChange = (newType: string) => {
            setVacationRequestData(prev => ({ ...prev, type: newType }));
        };

    const closeCard = () => {
        setVacationRequestData(prev => ({ ...prev, endDate: null, daysCount: 0 })); 
    };

    useEffect(() => {
            if (vacationRequestData.startDate && vacationRequestData.endDate) {
                setIsCardOpen(true);
                if (vacationRequestData.daysCount > 4 && vacationRequestData.type === "Urlop na żądanie") {
                setVacationRequestData(prev => ({
                    ...prev,
                    type: "Urlop wypoczynkowy"
                }));
            }
            } else {
                setIsCardOpen(false);
            }
        }, [vacationRequestData.startDate, vacationRequestData.endDate]);


    const formatDateForBackend = (date: Date): string => {
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - (offset * 60 * 1000));
        return localDate.toISOString().split('T')[0];
    };
    
   const submitRequest = async () => {
        if (!vacationRequestData.startDate || !vacationRequestData.endDate) return;

        setIsLoading(true);
        setError(null);

        const payloadToSend = {
            startDate: formatDateForBackend(vacationRequestData.startDate), 
            endDate: formatDateForBackend(vacationRequestData.endDate),  
            daysCount: vacationRequestData.daysCount,
            type: vacationRequestData.type
        };

        try {
            const response = await fetch('/api/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payloadToSend)
            });

            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas wysyłania wniosku');
            }

            const result = await response.json(); 

            setIsSelecting(false);
            setVacationRequestData({ startDate: null, endDate: null, daysCount: 0, type: "" });

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Błąd połączenia");
        } finally {
            setIsLoading(false);
        }
    };

        return {
            handleRequestClick, handleDayClick, vacationRequestData, isSelecting, isCardOpen, handleTypeChange, submitRequest, closeCard, isLoading, error
        };

}