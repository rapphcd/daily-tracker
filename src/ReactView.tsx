import {Logs} from "./types";
import {useEffect, useState} from "react";
import DailyRecap from "./components/DailyRecap";

interface Props {
	logs: Logs,
	onSave: (newLogs: Logs) => void,
}

export function ReactView({ logs, onSave } : Props){
	const [logChange, setLogChange] = useState(0)

	const getLog = (date: string | undefined) => {
		if(date == undefined) return {habits: {}, sleepTime: 0, summary: "", workTime: 0}
		if(logs[date] == undefined){
			logs[date] = {habits: {}, sleepTime: 0, summary: "", workTime: 0}
		}
		return logs[date]
	}

	const [todayDate, setTodayDate] = useState(new Date().toISOString().split("T")[0])
	const [todayLog, setTodayLog] = useState(getLog(todayDate));

	const [saveLogs, setSaveLogs] = useState(0);

	useEffect(() => {
		const save = () => {
			window.clearTimeout(saveLogs);
			setSaveLogs(window.setTimeout(() => {
				onSave(logs)
			}, 1000))
		}
		save();
	}, [logChange]);

	return (
		<div>
			<h1>Daily Tracking</h1>
			<div style={{
				backgroundColor: "var(--background-primary)",
				borderRadius: "var(--radius-l)",
				height: "50vh",
				padding: "0 1rem"
			}}>
				<DailyRecap today={todayLog} saveRecap={(today) => {
					if(todayDate != undefined) {
						logs[todayDate] = today
					}
					setLogChange((prev) => prev+1)
				}}></DailyRecap>
			</div>
		</div>
	);
}

export default ReactView;


