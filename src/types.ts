export type DailyLog = {
	date: string;
	summary: string;
	habits: Record<string, boolean>;
	workTime: number;
	sleepTime: number;
}

export type Logs = Record<string, DailyLog>

declare module "obsidian" {
	interface Workspace {
		on(name: "daily-tracker:habits-updated", callback: () => void, ctx?: null): import("obsidian").EventRef;
		trigger(name: "daily-tracker:habits-updated"): void;
	}
}
