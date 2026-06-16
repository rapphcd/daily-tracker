import {useTracking} from "../TrackingContext";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	PolarAngleAxis,
	PolarGrid, PolarRadiusAxis, Radar,
	RadarChart,
	Tooltip,
	XAxis,
	YAxis
} from "recharts";
import {RechartsDevtools} from "@recharts/devtools";
import {useEffect, useState} from "react";

function ModalStats() {
	const { selectedLog, logs, setActiveLog} = useTracking();
	const [avgSleep, setAvgSleep] = useState(0);
	const [avgWork, setAvgWork] = useState(0);
	const [data, setData] = useState<{habit: string, A: number, B: number}[]>([]);

	useEffect(() => {
		const retrieveStats = () => {
			const prov : Record<string, {times: number, completed: number}> = {};
			const sleep : { nb: number, hr: number} = { nb: 0, hr: 0};
			const work : { nb: number, hr: number} = { nb: 0, hr: 0};
			for(const key of Object.keys(logs).slice(-30)){
				const log = logs[key];
				if(log == undefined) continue;

				sleep.nb += 1;
				sleep.hr += log.sleepTime;

				work.nb += 1;
				work.hr += log.workTime;

				for(const k of Object.keys(log.habits)){
					const habit = log.habits[k];
					if(habit == undefined) continue;
					let regist = prov[k]
					if(regist == undefined){
						regist = {times: 0, completed: 0}
					}
					regist.times+=1;
					if(habit){
						regist.completed+=1;
					}
					prov[k] = regist;
				}
			}
			setAvgSleep(Math.round(1000*(sleep.hr/sleep.nb))/1000)
			setAvgWork(Math.round(1000*(work.hr/work.nb))/1000);
			return prov;
		}
		const getFormattedStats = () => {
			const stats = retrieveStats();
			const formatted : {habit: string, A: number, B: number}[] = []
			for(const k of Object.keys(stats)){
				const stat = stats[k];
				if(stat == undefined) continue;
				formatted.push({
					habit: k,
					A: stat.times,
					B: stat.completed
				});
			}
			return formatted;
		}

		setData(getFormattedStats());
	}, [logs]);

	return (
		<div>
			{
				selectedLog != undefined && (
					<div style={{
						height: "100%",
						width: '100%',
						display: "flex",
						flexDirection: "column",
						gap: "10px"
					}}>
						<h2 style={{
							textAlign: "center",
							padding: "0 1rem 0.5rem 1rem",
							margin: "0"
						}}>Statistics</h2>
						<div style={{
							display: "flex",
							flexWrap: "nowrap",
							gap: "10px"
						}} >
							<div style={{
								backgroundColor: "var(--background-secondary)",
								borderRadius: "var(--radius-l)",
								padding: "1rem",
								width: '100%',
								flex: "1"
							}}>
								<BarChart
									style={{ width: '100%', height: "100%", maxHeight: '90vh', aspectRatio: 1.618 }}
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
							<div style={{
								backgroundColor: "var(--background-secondary)",
								borderRadius: "var(--radius-l)",
								padding: "0.2rem",
								width: '100%',
								flex: "1"
							}}>
								{
									data.length >= 3 ? (
										<RadarChart
											style={{ width: '100%', height: "100%", aspectRatio: 1.618 }}
											responsive
											outerRadius="80%"
											data={data}
											margin={{
												top: 20,
												left: 20,
												right: 20,
												bottom: 20,
											}}
										>
											<PolarGrid />
											<PolarAngleAxis dataKey="habit" />
											<PolarRadiusAxis />
											<Radar name="Mike" dataKey="B" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
											<RechartsDevtools />
										</RadarChart>
									) : (
										<div style={{ width: '100%', height: '100%', display: "flex", justifyContent: "center", alignItems: "center" }}>
											<h3>Habits graph unavailable.</h3>
										</div>
									)
								}
							</div>
						</div>
						<div style={{
							display: "flex",
							flexWrap: "nowrap",
							gap: "10px"
						}} >

							<div  style={{
								backgroundColor: "var(--background-secondary)",
								borderRadius: "var(--radius-l)",
								height: "fit-content",
								padding: "1rem",
								width: "100%"
							}}>
								<h3  style={{
									textAlign: "center",
									padding: "0 1rem 0 1rem",
									margin: "0"
								}}>Averages</h3>
								<div style={{
									display: "flex"
								}}>
									<div>
										<h4 style={{
											margin: "0.5rem 0 0.5rem 0"
										}}>Sleep</h4>
										<p style={{
											fontSize: "10px"
										}}>Daily Average</p>
										<p>{avgSleep}hr</p>
									</div>
									<div>
										<h4 style={{
											margin: "0.5rem 0 0.5rem 0"
										}}>Work</h4>
										<p style={{
											fontSize: "10px"
										}}>Daily Average</p>
										<p>{avgWork}hr</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			}
		</div>
	)
}

export default ModalStats;
