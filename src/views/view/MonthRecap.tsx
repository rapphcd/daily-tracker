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
			borderRadius: "var(--radius-m)",
			height: "max-content",
			width: "100%",
			padding: "0 1rem 1.5rem 1rem"
		}}>
			<div style={{ width: '100%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
					<button onClick={() => changeMonth(-1)}> {"<"} </button>
					<h5>{monthsNames[month]} {year}</h5>
					<button onClick={() => changeMonth(1)}> {">"} </button>
				</div>


				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', gap: "2px" }}>
					{daysNames.map((j) => (
						<div key={j} style={{ padding: '0rem', textWrap: "nowrap", textOverflow: "ellipsis", fontWeight: "bold" }}>{j}</div>
					))}
					{days.map((jour, index) => (
						<div
							key={`${index}-${month}-${year}`}
							style={{
								padding: '0.4rem',
								width: "auto",
								borderRadius: "100%",
								backgroundColor: jour && isToday(jour) && !isSelected(jour) ? "var(--interactive-accent)" : "var(--background-primary)",
								color: `${hasNote(jour) != false ? (isSelected(jour) ? "" : "var(text-normal)") : "gray"}`,
								textDecoration: hasNote(jour) ? "underline" : "",
								cursor: jour ? 'pointer' : 'default',
								border: `2px solid ${isSelected(jour) ? "var(--interactive-accent)" : "transparent"}`
							}}
							onClick={() => {
								if(jour == null) return;
								const str = `${year}-${month+1 < 10 ? "0" : ""}${month+1}-${jour < 10 ? "0" : ""}${jour}`;
								setActiveLog(str, false);
							}}
							onDoubleClick={() => {
								if(jour == null) return;
								const str = `${year}-${month+1 < 10 ? "0" : ""}${month+1}-${jour < 10 ? "0" : ""}${jour}`;
								setActiveLog(str, true);
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
