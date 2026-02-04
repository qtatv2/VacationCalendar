import Day from './Day.tsx'
import { useCalendar } from '../hooks/useCalendar.ts';
import { useVacationRequest } from '../hooks/useVacationRequest.ts';

export default function Calendar() {

  const {monthsOfYear, dayOfWeek, currentMonth, currentYear,  startDay, days, currentDate, changeMonth} = useCalendar();
  const {handleRequestClick, handleDayClick, vacationRequestData, isSelecting} = useVacationRequest();

  return <>
    <div className="p-5">
      <div className="flex flex-col">
        <h1 className="text-6xl font-bold text-green-500 mb-8">{currentYear}</h1>
        <button onClick={handleRequestClick} className="bg-blue-600 rounded p-2">New request</button>
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
          {days.map((day, index)=>{

            const dateForTile = new Date(currentYear, currentMonth, day);
            dateForTile.setHours(0, 0, 0, 0);

            const isActive: boolean = dateForTile.getDay() !== 0 && dateForTile.getDay() !== 6;
            const isStart: boolean = vacationRequestData.startDate?.toDateString() === dateForTile.toDateString();
            const isEnd: boolean = vacationRequestData.endDate?.toDateString() === dateForTile.toDateString();
            const inRange: boolean = vacationRequestData.startDate !== null && vacationRequestData.endDate !== null && dateForTile.getTime() > vacationRequestData.startDate.getTime() && dateForTile.getTime() < vacationRequestData.endDate.getTime();

            return (
            <Day key={index} dayNumber={index+1} date={dateForTile} onClick={handleDayClick} isActive={isActive} isSelectedStart={isStart} isSelectedEnd={isEnd} isInRange={inRange}></Day>
            )
          })}
        </div>
      </div>
    </div>
  </>
}