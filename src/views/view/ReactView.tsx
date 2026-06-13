import DailyRecap from "./DailyRecap";
import Stats from "./Stats";
import MonthRecap from "./MonthRecap";

export function ReactView(){
	return (
		<div style={{
			display: "flex",
			flexDirection: "column",
			gap: "0.5rem",
			maxWidth: "100%",
			overflow: "hidden"
		}}>
			<h1 style={{
				marginBottom: "0",
				marginTop: "0"
			}}>Daily Tracking</h1>
			<DailyRecap></DailyRecap>
			<div style={{
				display: "flex",
				flexDirection: "column",
				gap: "0.5rem"
			}}>
				<Stats></Stats>
				<MonthRecap></MonthRecap>
			</div>
		</div>
	);
}

export default ReactView;


