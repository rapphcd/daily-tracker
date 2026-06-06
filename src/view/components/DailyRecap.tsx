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
		<div>
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
										  borderColor: "var(--divider-color",
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
									marginBottom: "8px"
								}}>Work time</h3>
								<input style={{
									width: "min-content",
									border: "none",
									padding: 0,
									boxShadow: "none",
									backgroundColor: "var(--background-primary)"
								}} type="number" name="worktime" id="worktime" min={0} step={0.5} max={24}
								       value={todayLog.workTime} onChange={(e) => handleChange(e, "workTime")}/>
							</div>
							<div style={{
								width: "50%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center"
							}}>
								<h3 style={{
									marginBottom: "8px"
								}}>Sleep time</h3>
								<input style={{
									width: "min-content",
									border: "none",
									padding: 0,
									boxShadow: "none",
									backgroundColor: "var(--background-primary)"
								}} type="number" name="sleeptime" id="sleeptime" min={0} step={0.5} max={24}
								       value={todayLog.sleepTime} onChange={(e) => handleChange(e, "sleepTime")}/>
							</div>
						</div>
					</div>
				)
			}
		</div>
	)
}

export default DailyRecap;
