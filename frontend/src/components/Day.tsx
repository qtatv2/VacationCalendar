
interface DayProps{
    dayNumber: number,
    date: Date,
    onClick: (date: Date) => void,
    isActive?: boolean;         
    isSelectedStart?: boolean;  
    isSelectedEnd?: boolean;    
    isInRange?: boolean;
}

export default function Day({dayNumber, date, onClick, isActive = true, isSelectedStart, isSelectedEnd, isInRange}: DayProps){

    const handleClick = () => {
        if (isActive) {
            onClick(date);
        }
    };
    const baseStyle = "p-6 relative flex justify-center items-center transition-all duration-200 border border-slate-700/50";
    
    const cursorStyle = isActive ? "cursor-pointer hover:brightness-110" : "cursor-not-allowed opacity-70 grayscale";

    let backgroundStyle = "bg-slate-800 text-slate-300"; 

    if (isSelectedStart || isSelectedEnd) {
        backgroundStyle = "bg-green-600 text-white z-10 shadow-lg scale-105"; 
    } else if (isInRange) {
        backgroundStyle = "bg-green-900/40 text-green-100";
    } else if (isActive) {
        backgroundStyle = "bg-slate-700 hover:bg-slate-800 text-slate-300";
    }

    let roundedStyle = "rounded-lg"; 

    if (isInRange) {
        if (isSelectedStart) {
            roundedStyle = "rounded-l-lg"; 
        } else if (isSelectedEnd) {
            roundedStyle = "rounded-r-lg"; 
        } else {
            roundedStyle = "rounded-none"; 
        }
    }

    return <>
        <div onClick={handleClick} className={`${baseStyle} ${cursorStyle} ${backgroundStyle} ${roundedStyle}`}>
            <span className="absolute top-1 left-2">{dayNumber}</span>
        </div>
    </>
}