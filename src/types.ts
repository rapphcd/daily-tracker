export type DailyLog = {
	date: string;
	summary: string;
	habits: Record<string, boolean>;
	workTime: number;
	sleepTime: number;
}

export type Logs = Record<string, DailyLog>
