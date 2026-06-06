import DailyRecap from "./components/DailyRecap";

export function ReactView(){
	return (
		<div>
			<h1>Daily Tracking</h1>
			<div style={{
				backgroundColor: "var(--background-primary)",
				borderRadius: "var(--radius-l)",
				height: "fit-content",
				padding: "0 1rem 1rem 1rem"
			}}>
				<DailyRecap></DailyRecap>
			</div>
		</div>
	);
}

export default ReactView;


