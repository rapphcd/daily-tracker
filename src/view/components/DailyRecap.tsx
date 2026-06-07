import {ChangeEvent} from "react";
import {useTracking} from "../TrackingContext";

function DailyRecap() {
	const {saveTodayLog, todayLog} = useTracking();

	const handleChange = (e: ChangeEvent<HTMLInputElement>, type: "workTime" | "sleepTime") => {
		if (todayLog == undefined) return;
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
			...todayLog,
			[type]: num
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
				todayLog != undefined && (
					<div>
						<h2 style={{
							textAlign: "center",
							padding: "1rem",
							margin: "0"
						}}>{new Date().toDateString()}</h2>
						<div>
							<h3 style={{
								marginBottom: "8px"
							}}>Summary</h3>
							<textarea name="summary" id="summary" rows={4} maxLength={400} defaultValue={todayLog.summary}
							          style={{
										  width: "100%",
										  height: "fit-content",
										  resize: "none",
										  borderColor: "lightgrey",
										  backgroundColor: "var(--background-primary)",
										  boxShadow: "none"
									  }} onChange={(e) => {
								saveTodayLog({
									...todayLog,
									summary: e.target.value
								});
							}}></textarea>
						</div>
						<div>
							<h3 style={{
								marginBottom: "8px"
							}}>Habits</h3>
							{
								Object.keys(todayLog.habits).length > 0 && (
									<div style={{
										display: "inline-grid",
										gridAutoFlow: "column",
										gap: "1rem",
										columnCount: Object.keys(todayLog.habits).length
									}}>
										{
											Object.keys(todayLog.habits).map((habit) => (
												<div key={habit} style={{
													display: "flex",
													alignItems: "center"
												}}>
													<input id={habit} name={habit} type={"checkbox"}
													       defaultChecked={todayLog.habits[habit]} onChange={(e) => {
														saveTodayLog({
															...todayLog,
															habits: {
																...todayLog.habits,
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
								)
							}
						</div>
						<div style={{
							display: "flex",
							justifyContent: "space-between"
						}}>
							<div style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center"
							}}>
								<h3 style={{
									marginBottom: "0"
								}}>Work time</h3>
								<div style={{
									display: "flex",
									justifyContent: "space-around",
									alignItems: "center"
								}}>
									<div onClick={() => {
										if (todayLog == undefined) return;

										if (todayLog.workTime == 0) return;

										saveTodayLog({
											...todayLog,
											workTime: todayLog.workTime-1
										});
									}}>-</div>
									<input style={{
										width: "min-content",
										border: "none",
										padding: 0,
										boxShadow: "none",
										backgroundColor: "var(--background-primary)",
										textAlign: "center"
									}} type="number" name="worktime" id="worktime" min={0} step={0.5} max={24}
									       value={todayLog.workTime} onChange={(e) => handleChange(e, "workTime")}/>
									<div onClick={() => {
										if (todayLog == undefined) return;

										if (todayLog.workTime == 24) return;

										saveTodayLog({
											...todayLog,
											workTime: todayLog.workTime+1
										});
									}}>+</div>
								</div>
							</div>
							<div style={{
								width: "50%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center"
							}}>
								<h3 style={{
									marginBottom: "0"
								}}>Sleep time</h3>
								<div style={{
									display: "flex",
									justifyContent: "space-around",
									alignItems: "center"
								}}>
									<div onClick={() => {
										if (todayLog == undefined) return;

										if (todayLog.sleepTime == 0) return;

										saveTodayLog({
											...todayLog,
											sleepTime: todayLog.sleepTime-1
										});
									}}>-</div>
									<input style={{
										width: "min-content",
										border: "none",
										padding: 0,
										boxShadow: "none",
										backgroundColor: "var(--background-primary)",
										textAlign: "center"
									}} type="number" name="sleeptime" id="sleeptime" min={0} step={0.5} max={24}
									       value={todayLog.sleepTime} onChange={(e) => handleChange(e, "sleepTime")}/>
									<div onClick={() => {
										if (todayLog == undefined) return;

										if (todayLog.sleepTime == 24) return;

										saveTodayLog({
											...todayLog,
											sleepTime: todayLog.sleepTime+1
										});
									}}>+</div>
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
