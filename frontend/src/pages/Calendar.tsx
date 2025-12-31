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

  return <>
    <div className="p-10">
      <h1 className="text-3xl font-bold text-green-500">Kalendarz</h1>
      <div>
        <div className="grid grid-cols-7 gap-4">
          {days.map((day, index)=>(
          <Day dayNumber={index+1}></Day>
          ))}
        </div>
      </div>
    </div>
  </>
}