import {
	createContext, Dispatch, ReactNode, SetStateAction,
	useContext, useEffect, useRef, useState,
} from "react";
import DailyTracker from "../main";
import {DailyLog, Logs} from "../types";

interface TrackingContextType {
	plugin: DailyTracker,
	saveLogs: (newLogs : Logs) => void,
	todayLog: DailyLog | undefined,
	logs: Logs,
	setLogs: Dispatch<SetStateAction<Logs>>,
	saveTodayLog: (today: DailyLog) => void
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

interface Props {
	children: ReactNode,
	plugin: DailyTracker,
	saveLogs: (newLogs : Logs) => Promise<void>,
}

function TrackingProvider({children, plugin, saveLogs}: Props) {
	const [logs, setLogs] = useState<Logs>(plugin.settings.logs);
	const [todayDate] = useState(() => new Date().toISOString().split("T")[0]);
	const saveTimeoutRef = useRef<number | null>(null);

	let todayLog = undefined

	if(todayDate != undefined){
		todayLog = logs[todayDate]
	}

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
		todayLog,
		logs,
		setLogs,
		saveTodayLog
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
