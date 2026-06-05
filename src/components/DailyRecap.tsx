import {DailyLog} from "../types";

interface Props {
	today: DailyLog,
	saveRecap: (today: DailyLog) => void
}

function DailyRecap({ today, saveRecap } : Props){
	return (
		<div>
			<h2 style={{
				textAlign: "center",
				padding: "1rem",
				margin: "0"
			}}>{new Date().toDateString()}</h2>
			<div>
				<h3>Summary</h3>
				<textarea name="summary" id="summary" cols={30} rows={7} maxLength={400} defaultValue={today.summary} style={{
					width: "100%",
					resize: "none"
				}}></textarea>
			</div>
			<div>
				<h3>Habits</h3>
				{
					JSON.parse(JSON.stringify(today.habits)) != JSON.parse(JSON.stringify({})) && (
						<div>
							{
								Object.keys(today.habits).map((habit) => (
									<div key={habit} style={{
										display: "flex",
										alignItems: "center"
									}}>
										<input id={habit} name={habit} type={"checkbox"} defaultChecked={today.habits[habit]} onChange={(e) => {
											today.habits[habit] = e.target.checked
											saveRecap(today)
										}}/>
										<label htmlFor={habit}>{habit.charAt(0).toUpperCase() + habit.slice(1)}</label>
									</div>
								))
							}
						</div>
					)
				}
			</div>
		</div>
	)
}

export default DailyRecap;
