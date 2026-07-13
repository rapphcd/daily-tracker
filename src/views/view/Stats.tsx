import {useTracking} from "../TrackingContext";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import StatsModal from "../modal";
import {setIcon} from "obsidian";
import {useEffect, useRef} from "react";

function Stats() {
	const {logs, setActiveLog, app, plugin} = useTracking();
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (buttonRef.current) {
			setIcon(buttonRef.current, "external-link");
		}
	}, []);

	return (
		<div style={{
			backgroundColor: "var(--background-primary)",
			borderRadius: "var(--radius-l)",
			height: "max-content",
			minHeight: "100px",
			width: "100%",
			padding: "0 1rem 1.5rem 1rem"
		}}>
			<style>{`
        		.stats-btn{
          			width: 20px;
          			height: 20px;
          			display: inline-flex;
          			align-items: center;
          			justify-content: center;
        		}

        		.stats-btn svg {
          			min-width: 10px;
          			height: 10px;
        		}
      		`}</style>
			<h2 style={{
				textAlign: "center",
				padding: "1rem",
				margin: "0"
			}}>Statistics <button ref={buttonRef} className={"stats-btn"} onClick={() => {
				new StatsModal(app, plugin).open();
			}}>O</button></h2>
			<div style={{
				display: "flex",
				justifyContent: "space-around"
			}}>
				<BarChart
					style={{width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618}}
					responsive
					data={Object.keys(logs).sort((a, b) => new Date(a) > new Date(b) ? 1 : -1).slice(-7).map((k) => {
						const log = logs[k];
						if(log != undefined && log.sleep != undefined){
							const [m,j] = log.date.split("-").slice(1);
							return {name: `${j}/${m}`, sleeptime: Math.round((log.sleep.time/60)*100)/100, worktime: log.workTime}
						}
						return undefined;
					})}
					margin={{
						top: 5,
						right: 0,
						left: 0,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3"/>
					<XAxis dataKey="name"/>
					<YAxis width="auto"/>
					<Tooltip labelStyle={{ color: 'var(--text-normal)' }} contentStyle={{backgroundColor: 'var(--background-primary)', borderColor: 'var(--background-modifier-border)'}}/>
					<Legend/>
					<Bar dataKey="sleeptime" fill="#8884d8" activeBar={{fill: '#8884d8', stroke: 'black'}}
					     onClick={(b) => {
							 if (b.name != undefined) setActiveLog(b.name, false);
						 }} radius={[5, 5, 0, 0]}/>
					<Bar dataKey="worktime" fill="#82ca9d" activeBar={{fill: '#82ca9d', stroke: 'black'}}
					     onClick={(b) => {
							 if (b.name != undefined) setActiveLog(b.name, false);
						 }} radius={[5, 5, 0, 0]}/>
				</BarChart>
			</div>
		</div>
	)
}

export default Stats;
