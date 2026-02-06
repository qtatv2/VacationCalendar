import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import type { VacationRequest } from '../components/Requests';

export const useCalendarData = () => {
    const [userRequests, setUserRequests] = useState<VacationRequest[]>([]);
    const { token } = useAuth();

    const fetchRequests = useCallback(async () => {
        if (!token) return;
        try {
            const response = await fetch('/api/requests', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setUserRequests(data);
            }
        } catch (err) {
            console.error(err);
        }
    }, [token]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const getUserRequestForDay = useCallback((day: number, currentMonth: number, currentYear: number) => {
        if (!day || userRequests.length === 0) return undefined;
        
        const checkDate = new Date(currentYear, currentMonth, day);
        checkDate.setHours(0, 0, 0, 0);

        return userRequests.find(req => {
            if (!req.startDate || !req.endDate) return false;
            const start = new Date(req.startDate);
            const end = new Date(req.endDate);
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);
            return checkDate >= start && checkDate <= end;
        });
    }, [userRequests]);

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'approved': return 'bg-green-600/50 border-green-500 text-white';
            case 'rejected': return 'bg-red-900/30 border-red-800 text-slate-500 line-through opacity-70';
            default: return 'bg-yellow-600/40 border-yellow-500 text-yellow-100';
        }
    };

    return { userRequests, getUserRequestForDay, getStatusColor, refreshRequests: fetchRequests };
};