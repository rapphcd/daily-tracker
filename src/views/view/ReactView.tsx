import DailyRecap from "./DailyRecap";
import Stats from "./Stats";
import MonthRecap from "./MonthRecap";
import {setIcon} from "obsidian";
import {useEffect, useRef} from "react";

export function ReactView(){
	const reloadIconRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (reloadIconRef.current) {
			setIcon(reloadIconRef.current, "refresh-cw");
		}
	}, []);

	return (
		<div style={{
			display: "flex",
			flexDirection: "column",
			gap: "0.5rem",
			maxWidth: "100%",
			overflow: "hidden"
		}}>
			<div style={{
				display: "flex",
				justifyContent: "space-between"
			}}>
				<h1 style={{
					marginBottom: "0",
					marginTop: "0"
				}}>Daily Tracker</h1>
				<button ref={reloadIconRef} onClick={() => {
					window.location.reload();
				}}></button>
			</div>
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


