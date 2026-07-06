import {ChangeEvent, useEffect, useState} from "react";
import {useTracking} from "../TrackingContext";

function DailyRecap() {
	const {saveTodayLog, selectedLog} = useTracking();

	const [sleepStart, setSleepStart] = useState("");
	const [sleepEnd, setSleepEnd] = useState("");

	const handleWorkTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (selectedLog == undefined) return;
		let valeur = e.target.value;
		if (valeur === '') {
			e.target.value = "";
			return;
		}

		let num = parseFloat(valeur);

		if (num < 0) {
			e.target.value = "0";
			num = 0
		} else if (num > 24) {
			e.target.value = "24"
			num = 24
		}

		saveTodayLog({
			...selectedLog,
			workTime: num
		});
	}



	return (
		<div style={{
			backgroundColor: "var(--background-primary)",
			borderRadius: "var(--radius-l)",
			height: "fit-content",
			padding: "0 1rem 1.5rem 1rem"
		}}>
			{
				selectedLog != undefined && (
					<div key={selectedLog.date}>
						<h2 style={{
							textAlign: "center",
							padding: "1rem",
							margin: "0"
						}}>{new Date(selectedLog.date).toDateString()}</h2>
						<div>
							<h3 style={{
								marginBottom: "8px"
							}}>Summary</h3>
							<textarea name="summary" id="summary" rows={4} maxLength={400}
							          defaultValue={selectedLog.summary}
							          style={{
										  width: "100%",
										  height: "fit-content",
										  resize: "none",
										  border: "1px solid lightgrey",
										  backgroundColor: "var(--background-primary)",
										  boxShadow: "none",
										  WebkitAppearance: "none",
										  appearance: "none",
									  }} onChange={(e) => {
								saveTodayLog({
									...selectedLog,
									summary: e.target.value
								});
							}}></textarea>
						</div>
						{
							Object.keys(selectedLog.habits).length > 0 && (
								<div>
									<h3 style={{
										marginBottom: "8px"
									}}>Habits</h3>
									<div style={{
										display: "flex",
										gap: "1rem",
										flexWrap: "wrap"
									}}>
										{
											Object.keys(selectedLog.habits).map((habit) => (
												<div key={habit} style={{
													display: "flex",
													alignItems: "center"
												}}>
													<input id={habit} name={habit} type={"checkbox"}
													       defaultChecked={selectedLog.habits[habit]} onChange={(e) => {
														saveTodayLog({
															...selectedLog,
															habits: {
																...selectedLog.habits,
																[habit]: e.target.checked
															}
														});
													}}/>
													<label
														htmlFor={habit}>{habit.charAt(0).toUpperCase() + habit.slice(1)}</label>
												</div>
											))
										}
									</div>
								</div>
							)
						}
						<div style={{
							display: "flex",
							justifyContent: "space-between",
							flexWrap: "wrap"
						}}>
							<div style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center"
							}}>
								<h3 style={{
									marginBottom: "0",
									textWrap: "nowrap"
								}}>Work time</h3>
								<div style={{
									display: "flex",
									justifyContent: "space-around",
									alignItems: "center"
								}}>
									<button onClick={() => {
										if (selectedLog == undefined) return;

										if (selectedLog.workTime == 0) return;

										saveTodayLog({
											...selectedLog,
											workTime: selectedLog.workTime - 1
										});
									}}>-
									</button>
									<input style={{
										width: "min-content",
										border: "none",
										padding: 0,
										boxShadow: "none",
										backgroundColor: "var(--background-primary)",
										textAlign: "center"
									}} type="number" name="worktime" id="worktime" min={0} step={0.5} max={24}
									       value={selectedLog.workTime} onChange={(e) => handleWorkTimeChange(e)}/>
									<button onClick={() => {
										if (selectedLog == undefined) return;

										if (selectedLog.workTime == 24) return;

										saveTodayLog({
											...selectedLog,
											workTime: selectedLog.workTime + 1
										});
									}}>+
									</button>
								</div>
							</div>
							<div style={{
								width: "50%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "start",
								alignItems: "start"
							}}>
								<h3 style={{
									marginBottom: "0",
									textWrap: "nowrap"
								}}>Sleep </h3>
								<div style={{
									display: "flex",
									justifyContent: "space-around",
									alignItems: "center"
								}}>
									<input type={"time"} onChange={(e) => {
										setSleepStart(e.target.value)
									}}/>
									<input type={"time"} onChange={(e) => {
										setSleepEnd(e.target.value)
									}}/>
								</div>
							</div>
						</div>
					</div>
				)
			}
		</div>
	)
}

export default DailyRecap;
