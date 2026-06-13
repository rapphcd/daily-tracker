import {
	createContext, Dispatch, ReactNode, SetStateAction,
	useContext, useEffect, useRef, useState,
} from "react";
import DailyTracker from "../main";
import {DailyLog, Logs} from "../types";
import {App} from "obsidian";

interface TrackingContextType {
	plugin: DailyTracker,
	saveLogs: (newLogs : Logs) => void,
	selectedLog: DailyLog | undefined,
	selectedDate: string,
	logs: Logs,
	setLogs: Dispatch<SetStateAction<Logs>>,
	saveTodayLog: (today: DailyLog) => void,
	setActiveLog: (date: string, creat: boolean) => void,
	app: App
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

interface Props {
	children: ReactNode,
	plugin: DailyTracker,
	saveLogs: (newLogs : Logs) => Promise<void>,
	app: App
}

function TrackingProvider({children, plugin, saveLogs, app}: Props) {
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
		const handleHabitsChange = () => {
			setLogs(prev => {
				const newLogs = { ...prev };
				const today = new Date().toLocaleDateString("fr-CA");
				if (newLogs[today]) {
					const habits = newLogs[today].habits;
					const newHabits: Record<string, boolean> = {};
					for (const h of plugin.settings.habits) {
						newHabits[h] = habits[h] ?? false;
					}
					newLogs[today] = { ...newLogs[today], habits: newHabits };
				}
				return newLogs;
			});
		};

		const eventRef = app.workspace.on("daily-tracker:habits-updated", handleHabitsChange);
		return () => {
			app.workspace.offref(eventRef);
		};
	}, [app.workspace, plugin.settings.habits]);

	useEffect(() => {
		if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current);
		
		saveTimeoutRef.current = window.setTimeout(() => {
			saveLogs(logs).catch(() => {});
		}, 1000);

		return () => {
			if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current);
		};
	}, [logs, saveLogs]);

	useEffect(() => {
		let dayChangeTimeout : number;
		const setupDayChange = () => {
			const now = new Date();
			const midnight = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate() +1,
				0,
				0,
				0,
				0
			);

			const msToSwitch = midnight.getTime() - now.getTime();

			dayChangeTimeout = window.setTimeout(() => {
				handleDayChange();
				setupDayChange();
			}, msToSwitch);
		};
		const handleDayChange = () => {
			const today = new Date().toLocaleDateString("fr-CA");
			setSelectedDate(today);
		};

		setupDayChange();

		return () => {
			window.clearTimeout(dayChangeTimeout);
		};
	}, []);

	const value = {
		plugin,
		saveLogs,
		selectedLog,
		selectedDate,
		logs,
		setLogs,
		saveTodayLog,
		setActiveLog,
		app
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
