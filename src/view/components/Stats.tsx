import {useTracking} from "../TrackingContext";
import {useEffect, useState} from "react";

function Stats() {
	const { logs, selectedLog } = useTracking();
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
			width: "100%",
			padding: "0 1rem 1.5rem 1rem"
		}}>
			<h2 style={{
				textAlign: "center",
				padding: "1rem",
				margin: "0"
			}}>Statistics <span style={{ fontSize: "10px" }}>30j</span></h2>
			<div style={{
				display: "flex",
				justifyContent: "space-around"
			}}>
				<div>
					<p style={{
						margin: "0"
					}}>{averageWork}<span style={{ fontSize: "10px" }}>h avg</span></p>
					<p style={{
						fontSize: "11.5px",
						margin: "0"
					}}>Work time</p>
				</div>
				<div>
					<p style={{
						margin: "0"
					}}>{averageSleep}<span style={{ fontSize: "10px" }}>h avg</span></p>
					<p style={{
						fontSize: "11.5px",
						margin: "0"
					}}>Sleep time</p>
				</div>
			</div>
		</div>
	)
}

export default Stats;
