import type { VacationRequestPayload } from "../hooks/useVacationRequest"


interface CardProps {
    isOpen: boolean,
    data: VacationRequestPayload,
    onClose: () => void,
    onSubmit: () => void,
    onTypeChange: (type: string) => void,
    isLoading: boolean
}

export default function VacationRequestCard({ isOpen, data, onClose, onSubmit, onTypeChange, isLoading }: CardProps) {
    if (!isOpen) return null; 

    const formatDate = (date: Date | null) => {
        return date ? date.toLocaleDateString('pl-PL') : '-';
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity animate-in fade-in duration-200">
            
            <div className="bg-slate-900 border border-slate-700 text-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-200">
                
                <div className="bg-slate-800 p-6 border-b border-slate-700">
                    <h2 className="text-2xl font-bold text-green-400">Podsumowanie wniosku</h2>
                    <p className="text-slate-400 text-sm mt-1">Sprawdź daty i wybierz typ urlopu</p>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                        <div className="text-center">
                            <p className="text-xs text-slate-500 uppercase font-bold">Od</p>
                            <p className="text-xl font-bold text-white">{formatDate(data.startDate)}</p>
                        </div>
                        <div className="text-slate-500">➜</div>
                        <div className="text-center">
                            <p className="text-xs text-slate-500 uppercase font-bold">Do</p>
                            <p className="text-xl font-bold text-white">{formatDate(data.endDate)}</p>
                        </div>
                        <div className="h-10 w-px bg-slate-600 mx-2"></div>
                        <div className="text-center">
                            <p className="text-xs text-slate-500 uppercase font-bold">Dni</p>
                            <p className="text-2xl font-bold text-green-400">{data.daysCount}</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Typ wniosku</label>
                        <select value={data.type} onChange={(e) => onTypeChange(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all">
                            <option value="Urlop wypoczynkowy">Urlop wypoczynkowy</option>
                            <option value="Urlop na żądanie" disabled={data.daysCount > 4}>Urlop na żądanie</option>
                            <option value="Okolicznościowy">Urlop okolicznościowy</option>
                            <option value="Zwolnienie lekarskie">Zwolnienie lekarskie</option>
                            <option value="Opieka nad dzieckiem">Opieka nad dzieckiem</option>
                        </select>
                    </div>
                </div>

                <div className="p-6 bg-slate-800/50 border-t border-slate-700 flex gap-3 justify-end">
                    <button onClick={onClose} disabled={isLoading} className="px-5 py-2.5 rounded-lg text-slate-300 font-medium hover:bg-slate-700 hover:text-white transition-colors">
                        Wróć
                    </button>
                    <button onClick={onSubmit} disabled={isLoading} className="px-5 py-2.5 rounded-lg bg-green-600 text-white font-bold hover:bg-green-500 shadow-lg shadow-green-900/20 transition-all transform hover:scale-105">
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Wysyłanie...
                            </>
                        ) : (
                            "Zatwierdź wniosek"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );

}