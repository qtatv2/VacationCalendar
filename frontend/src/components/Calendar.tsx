import Day from './Day.tsx'
import { useCalendar } from '../hooks/useCalendar.ts';
import { useVacationRequest } from '../hooks/useVacationRequest.ts';
import VacationRequestCard from './VacationRequestCard.tsx';
import { useCalendarData } from '../hooks/useCalendarData.ts';

export default function Calendar() {

  const {monthsOfYear, dayOfWeek, currentMonth, currentYear,  startDay, days, currentDate, changeMonth} = useCalendar();
  const {handleRequestClick, handleDayClick, vacationRequestData, isSelecting, isCardOpen, handleTypeChange, submitRequest, closeCard, isLoading} = useVacationRequest();
  const { getUserRequestForDay, getStatusColor, refreshRequests } = useCalendarData();

  const handleSafeSubmit = async () => {
      await submitRequest();
      await refreshRequests();
      closeCard();
  };

  return (
    <>
    <VacationRequestCard isOpen={isCardOpen} data={vacationRequestData} onClose={closeCard} onSubmit={handleSafeSubmit} onTypeChange={handleTypeChange} isLoading={isLoading}/>

    <div className="p-5">
      <div className="flex flex-col items-center mb-6 gap-4">
        <div className="flex items-center gap-6">
          <button onClick={() => changeMonth(-1)} className="w-12 h-12 flex items-center justify-center bg-slate-800 rounded-lg hover:bg-slate-700 text-white font-bold transition-colors shadow-md border border-slate-700">&lsaquo;</button>

          <h1 className="text-4xl font-bold text-white text-center min-w-[250px]">
              {monthsOfYear[currentMonth]} <span className="text-blue-400">{currentYear}</span>
          </h1>

          <button onClick={() => changeMonth(1)} className="w-12 h-12 flex items-center justify-center bg-slate-800 rounded-lg hover:bg-slate-700 text-white font-bold transition-colors shadow-md border border-slate-700">&rsaquo;</button>
        </div>
        <div className="flex items-center justify-center gap-4 mb-4">
            <button onClick={handleRequestClick} className={` rounded px-4 py-2 text-white font-bold transition-all duration-300 shadow-lg ${isSelecting 
                        ? 'bg-green-600 ring-2 ring-offset-2 ring-offset-slate-900 ring-green-500 scale-105' 
                        : 'bg-blue-600 hover:bg-blue-500' }`}>
                {
                !isSelecting ? "Nowy wniosek" : (vacationRequestData.startDate ? "Reset" : "Anuluj")
                }
            </button>

            {isSelecting && (
                <span className="text-green-400 font-semibold animate-pulse">{!vacationRequestData.startDate 
                        ? "Kliknij w dzień rozpoczęcia"
                        : "Kliknij w dzień zakończenia"
                    }
                </span>
            )}
        </div>

        
      </div>
      
      <div>
        <div className={`transition-all duration-500 rounded-xl p-4 -m-4 border-2 ${isSelecting 
                ? 'border-green-500/50 bg-green-900/10 shadow-[0_0_30px_rgba(34,197,94,0.15)]' 
                : 'border-transparent'
            }`}>
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

              const isToday = day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear();
              const isActive: boolean = dateForTile.getDay() !== 0 && dateForTile.getDay() !== 6;
              const isStart: boolean = vacationRequestData.startDate?.getTime() === dateForTile.getTime();
              const isEnd: boolean = vacationRequestData.endDate?.getTime() === dateForTile.getTime();
              const inRange: boolean = vacationRequestData.startDate !== null && vacationRequestData.endDate !== null && dateForTile.getTime() > vacationRequestData.startDate.getTime() && dateForTile.getTime() < vacationRequestData.endDate.getTime();

              const existingRequest = getUserRequestForDay(day, currentMonth, currentYear);
                    
              const statusClass = existingRequest ? getStatusColor(existingRequest.status) : '';
                
                return (
                <Day 
                    key={index} 
                    dayNumber={day} 
                    date={dateForTile} 
                    onClick={handleDayClick} 
                    isActive={isActive} 
                    isSelectedStart={isStart} 
                    isSelectedEnd={isEnd} 
                    isInRange={inRange}
                    isToday={isToday}
                    statusClass={statusClass}
                />
                )
            })}
            </div>
        </div>
      </div>
    </div>
  </>
  ) 
}