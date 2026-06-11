import {useTracking} from "../TrackingContext";
import {useEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import { RechartsDevtools } from '@recharts/devtools';

function Stats() {
	const { logs, selectedLog, setActiveLog } = useTracking();
	const [averageSleep, setAverageSleep] = useState(0);
	const [averageWork, setAverageWork] = useState(0);

	useEffect(() => {
		const retrieveAverages = () => {
			let sleepSum = 0;
			let sleepNum = 0;
			let workSum = 0;
			let workNum = 0;
			for(const key of Object.keys(logs).slice(-30)){
				const log = logs[key];
				if(log != undefined){
					sleepSum+=log.sleepTime;
					workSum+=log.workTime;
					sleepNum+=1;
					workNum+=1;
				}
			}
			setAverageSleep(Math.round((sleepSum/sleepNum)*100)/100);
			setAverageWork(Math.round((workSum/workNum)*100)/100);
		}
		retrieveAverages();
	}, [selectedLog?.workTime, selectedLog?.sleepTime]);

	return (
		<div style={{
			backgroundColor: "var(--background-primary)",
			borderRadius: "var(--radius-l)",
			height: "max-content",
			minHeight: "100px",
			width: "100%",
			padding: "0 1rem 1.5rem 1rem"
		}}>
			<h2 style={{
				textAlign: "center",
				padding: "1rem",
				margin: "0"
			}}>Statistics</h2>
			<div style={{
				display: "flex",
				justifyContent: "space-around"
			}}>
				<BarChart
					style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
					responsive
					data={Object.keys(logs).sort((a,b) => new Date(a) > new Date(b) ? 1 : -1).slice(-7).map((k) => {
						const log = logs[k];
						if(log != undefined){
							return {name: log.date, sleeptime: log.sleepTime, worktime: log.workTime}
						}
						return undefined
					})}
					margin={{
						top: 5,
						right: 0,
						left: 0,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis width="auto" />
					<Tooltip />
					<Legend />
					<Bar dataKey="sleeptime" fill="#8884d8" activeBar={{ fill: '#8884d8', stroke: 'black' }} onClick={(b) => {
						if(b.name != undefined) setActiveLog(b.name, false);
					}} radius={[5, 5, 0, 0]} />
					<Bar dataKey="worktime" fill="#82ca9d" activeBar={{ fill: '#82ca9d', stroke: 'black' }} onClick={(b) => {
						if(b.name != undefined) setActiveLog(b.name, false);
					}} radius={[5, 5, 0, 0]} />
					<RechartsDevtools />
				</BarChart>
			</div>
		</div>
	)
}

export default Stats;
