import { useState } from "react";

export const useCalendar = () =>{
     const monthsOfYear: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const dayOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
      const currentDate: Date = new Date();
      const [currentDay, setCurrentDay] = useState<Date>();
      const [currentMonth, setCurrentMonth] = useState<number>(currentDate.getMonth());
      const [currentYear, setCurrentYear] = useState<number>(currentDate.getFullYear());
    
      const daysInMonth: number = new Date(currentYear, currentMonth + 1, 0).getDate();
      const startDay: number = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
    
    
      const days: number[] = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    
    const changeMonth = (offset: number) =>{
        const newDate = new Date(currentYear, currentMonth + offset, 1);
        setCurrentMonth(newDate.getMonth());
        setCurrentYear(newDate.getFullYear());
    }

    return {
        monthsOfYear, dayOfWeek, currentMonth, currentYear, startDay, days, changeMonth
    }
    
}