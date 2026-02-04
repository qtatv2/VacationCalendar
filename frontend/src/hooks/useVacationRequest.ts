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

    const handleRequestClick = () =>{
        setIsSelecting(true);
        setVacationRequestData(prev => ({
            ...prev,
            startDate: null,
            endDate: null,
            daysCount: 0
        }));
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

    useEffect(() => {
    console.log("Stan zaktualizowany:", vacationRequestData);
    }, [vacationRequestData]);

    return {
        handleRequestClick, handleDayClick, vacationRequestData, isSelecting
    };

}