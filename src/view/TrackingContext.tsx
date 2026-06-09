import {
	createContext, Dispatch, ReactNode, SetStateAction,
	useContext, useEffect, useRef, useState,
} from "react";
import DailyTracker from "../main";
import {DailyLog, Logs} from "../types";

interface TrackingContextType {
	plugin: DailyTracker,
	saveLogs: (newLogs : Logs) => void,
	selectedLog: DailyLog | undefined,
	selectedDate: string,
	logs: Logs,
	setLogs: Dispatch<SetStateAction<Logs>>,
	saveTodayLog: (today: DailyLog) => void,
	setActiveLog: (date: string, creat: boolean) => void
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

interface Props {
	children: ReactNode,
	plugin: DailyTracker,
	saveLogs: (newLogs : Logs) => Promise<void>,
}

function TrackingProvider({children, plugin, saveLogs}: Props) {
	const [logs, setLogs] = useState<Logs>(plugin.settings.logs);
	const [todayDate] = useState(new Date().toLocaleDateString("fr-CA"));
	const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString("fr-CA"));
	const saveTimeoutRef = useRef<number | null>(null);

	const selectedLog = logs[selectedDate];

	useEffect(() => {
		if(todayDate == undefined) return;
		if (!logs[todayDate]) {
			const hab : Record<string, boolean> = {};
			for(const h of plugin.settings.habits){
				hab[h] = false;
			}
			
			setLogs(prev => {
				return {...prev, [todayDate]: {habits: hab, sleepTime: 0, summary: "", workTime: 0, date: todayDate}}
			});
		}
	}, [todayDate, logs, plugin.settings.habits]);

	const saveTodayLog = (today: DailyLog) => {
		setLogs((prev) => ({...prev, [today.date]: { ...today }}));
	};

	const setActiveLog = (date: string, create: boolean) => {
		if (!logs[date]) {
			if(!create) return;
			if(new Date(date) > new Date(todayDate)) return;
			const hab : Record<string, boolean> = {};
			for(const h of plugin.settings.habits){
				hab[h] = false;
			}
			const newLog = {habits: hab, sleepTime: 0, summary: "", workTime: 0, date: date};
			setLogs(prev => ({...prev, [date]: newLog}));
		}
		setSelectedDate(date);
	}

	useEffect(() => {
		if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current);
		
		saveTimeoutRef.current = window.setTimeout(() => {
			saveLogs(logs).catch(() => {});
		}, 1000);

		return () => {
			if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current);
		};
	}, [logs, saveLogs]);

	const value = {
		plugin,
		saveLogs,
		selectedLog,
		selectedDate,
		logs,
		setLogs,
		saveTodayLog,
		setActiveLog
	};

	return (
		<TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>
	);
}

export function useTracking() {
	const context = useContext(TrackingContext);
	if (!context) {
		throw new Error("No TrackingContext");
	}
	return context;
}

export default TrackingProvider;
