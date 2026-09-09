export type DailyLog = {
	date: string;
	summary: string;
	habits: Record<string, boolean>;
	workTime: number;
	sleep: {
		time: number,
		start: string,
		end: string
	} | undefined;
	mood: 1 | 2 | 3 | 4 | 5 | undefined;
}

export type Logs = Record<string, DailyLog>

declare module "obsidian" {
	interface Workspace {
		on(name: "daily-tracker:habits-updated", callback: () => void, ctx?: null): import("obsidian").EventRef;
		trigger(name: "daily-tracker:habits-updated"): void;
	}
}
