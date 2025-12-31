
interface DayProps{
    dayNumber: number
}

export default function Day({dayNumber}: DayProps){


    return <>
        <div className="bg-slate-700 p-4 text-white text-center rounded">{dayNumber}</div>
    </>
}