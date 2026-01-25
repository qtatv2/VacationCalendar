import { useState } from 'react';
import Day from './Day.tsx'

export default function Calendar() {

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

  return <>
    <div className="p-5">
      <div className="flex flex-col">
        <h1 className="text-6xl font-bold text-green-500 mb-8">{currentYear}</h1>
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold text-red-400 mb-8">{monthsOfYear[currentMonth]}</h1>
          <div className="flex gap-2">
            <div className="bg-gray-500 rounded w-12 h-12">
              <button className="w-full h-full" onClick={()=>changeMonth(-1)}>◀️</button>
              </div>
            <div className="bg-gray-500 rounded w-12 h-12">
              <button className="w-full h-full" onClick={()=>changeMonth(1)}>▶️</button>
            </div>
          </div>
      </div>
      </div>
      <div>
        <div className="grid grid-cols-7 gap-4">
          {dayOfWeek.map((day, index)=>(
            <div key={index} className="text-2xl font-bold text-yellow-200">{day}</div>
            ))}
            {Array.from({ length: startDay }, (_, index) =>(
              <div key={index} className="p-6 invisible"></div>
          ))}
          {days.map((index)=>(
          <Day key={index} dayNumber={index+1}></Day>
          ))}
        </div>
      </div>
    </div>
  </>
}