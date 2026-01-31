import Day from './Day.tsx'
import { useCalendar } from '../hooks/useCalendar.ts';

export default function Calendar() {

  const {monthsOfYear, dayOfWeek, currentMonth, currentYear,  startDay, days, changeMonth} = useCalendar();

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
          {days.map((day, index)=>(
          <Day key={index} dayNumber={index+1}></Day>
          ))}
        </div>
      </div>
    </div>
  </>
}