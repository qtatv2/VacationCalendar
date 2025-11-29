export default function Calendar() {

  const days: number[] = Array.from({ length: 30 }, (_, i) => i + 1);

  return <>
    <div className="p-10">
      <h1 className="text-3xl font-bold text-green-500">Kalendarz</h1>
      <div>
        <div className="grid grid-cols-7 gap-4">
          {days.map((day)=>(
          <div className="bg-slate-700 p-4 text-white text-center rounded">{day}</div>
))}
        </div>
      </div>
    </div>
  </>
}