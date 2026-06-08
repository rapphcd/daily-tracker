import {useState} from "react";
import {useTracking} from "../TrackingContext";

const monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function MonthRecap(){
	const { logs, setActiveLog, selectedDate } = useTracking();

	const [actDate, setActDate] = useState(new Date());

	const year = actDate.getFullYear();
	const month = actDate.getMonth();

	const firstDay = new Date(year, month, 1).getDay();
	const startDiff = firstDay === 0 ? 6 : firstDay - 1;

	const numberOfDay = new Date(year, month + 1, 0).getDate();

	const days = [];

	for (let i = 0; i < startDiff; i++) {
		days.push(null);
	}

	for (let d = 1; d <= numberOfDay; d++) {
		days.push(d);
	}

	const changeMonth = (direction : number) => {
		setActDate(new Date(year, month + direction, 1));
	};

	const hasNote = (jour: number | null) => {
		if(jour == null) return false;
		const str = `${year}-${month+1 < 10 ? "0" : ""}${month+1}-${jour < 10 ? "0" : ""}${jour}`;
		return logs[str] != undefined ? logs[str] : false
	};

	const isToday = (jour: number | null) => {
		if(jour == null) return false;
		const str = `${year}-${month+1 < 10 ? "0" : ""}${month+1}-${jour < 10 ? "0" : ""}${jour}`;
		return str == new Date().toLocaleDateString("fr-CA");
	};

	const isSelected = (jour: number | null) => {
		if(jour == null) return false;
		const str = `${year}-${month+1 < 10 ? "0" : ""}${month+1}-${jour < 10 ? "0" : ""}${jour}`;
		return str == selectedDate;
	};

	return (
		<div style={{
			backgroundColor: "var(--background-primary)",
			borderRadius: "var(--radius-l)",
			height: "max-content",
			width: "100%",
			padding: "0 1rem 1.5rem 1rem"
		}}>
			<div style={{ width: '100%'}}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<button onClick={() => changeMonth(-1)}> {"<"} </button>
					<h5>{monthsNames[month]} {year}</h5>
					<button onClick={() => changeMonth(1)}> {">"} </button>
				</div>

				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontWeight: 'bold' }}>
					{daysNames.map((j) => (
						<div key={j} style={{ padding: '1.5px' }}>{j}</div>
					))}
				</div>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center' }}>
					{days.map((jour, index) => (
						<div
							key={index}
							style={{
								padding: '3px',
								borderRadius: "var(--radius-s)",
								backgroundColor: jour ? (isSelected(jour) ? "var(--interactive-accent)" : (isToday(jour) ? "red" : "var(--background-primary)")) : 'var(--background-primary)',
								color: `${hasNote(jour) != false ? (isSelected(jour) ? "white" : "var(text-normal)")  : "var(--text-muted)"}`,
								cursor: jour ? 'pointer' : 'default'
							}}
							onClick={() => {
								if(jour == null) return;
								const str = `${year}-${month+1 < 10 ? "0" : ""}${month+1}-${jour < 10 ? "0" : ""}${jour}`;
								setActiveLog(str);
							}}
						>
							{jour}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default MonthRecap;
