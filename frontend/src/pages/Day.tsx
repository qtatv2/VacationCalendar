
interface DayProps{
    dayNumber: number
}

export default function Day({dayNumber}: DayProps){


    return <>
        <div className="bg-slate-700 p-6 text-white relative flex justify-center items-center rounded">
            <span className="absolute top-1 left-2">{dayNumber}</span>
            <span>Soon to be added</span>
        </div>
    </>
}