import { useEffect, useState } from "react";

interface VacationRequestPayload{
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
            } else {
                setIsCardOpen(false);
            }
        }, [vacationRequestData.startDate, vacationRequestData.endDate]);

   const submitRequest = () => {
        console.log("WYSYŁAM DO BAZY:", vacationRequestData);
        alert(`Wniosek złożony! \nOd: ${vacationRequestData.startDate?.toLocaleDateString()} \nDo: ${vacationRequestData.endDate?.toLocaleDateString()} \nTyp: ${vacationRequestData.type}`);
        
        setIsSelecting(false);
        setVacationRequestData({ startDate: null, endDate: null, daysCount: 0, type: "Urlop wypoczynkowy" });
    };

        return {
            handleRequestClick, handleDayClick, vacationRequestData, isSelecting, isCardOpen, handleTypeChange, submitRequest, closeCard
        };

}