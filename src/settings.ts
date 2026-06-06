import {Logs} from "./types";

export interface DailyTrackerSettings {
	habits: string[];
	logs: Logs
}

export const DEFAULT_SETTINGS: DailyTrackerSettings = {
	habits: ["Lire", "Sport"],
	logs: {}
};
