import {Logs} from "./types";
import {App, PluginSettingTab, Setting} from "obsidian";
import DailyTracker from "./main";

export interface DailyTrackerSettings {
	habits: string[];
	logs: Logs
}

export const DEFAULT_SETTINGS: DailyTrackerSettings = {
	habits: ["Lire", "Sport"],
	logs: {}
};

export class SettingsTab extends PluginSettingTab {
	plugin: DailyTracker;

	constructor(app: App, plugin: DailyTracker) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		let newHab = ""

		const sett = new Setting(containerEl)
			.setName('New habit')
			.addText((text) =>
				text
					.setPlaceholder('')
					.setValue(newHab)
					.onChange(async (value) => {
						newHab = value;
					})
			)
			.addButton((button) =>
				button
					.setButtonText("Add habit")
					.setDisabled(this.plugin.settings.habits.length >= 5)
					.onClick(async () => {
						if(newHab == "" ) return;
						this.plugin.settings.habits.push(newHab);
						await this.plugin.saveSettings();
						this.display();
					}));

		for(const hab of this.plugin.settings.habits){
			sett.addButton((button) =>
				button
					.setButtonText(`Delete ${hab}`)
					.onClick(async () => {
						this.plugin.settings.habits = this.plugin.settings.habits.filter((h) => h != hab)
						await this.plugin.saveSettings();
						this.display();
					}));
		}
	}
}
