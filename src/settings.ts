import { App, PluginSettingTab, Setting } from 'obsidian';
import DailyTracker from './main';
import {Logs} from "./types";

export interface DailyTrackerSettings {
	mySetting: string;
	logs: Logs
}

export const DEFAULT_SETTINGS: DailyTrackerSettings = {
	mySetting: 'default',
	logs: {}
};

export class SettingTab extends PluginSettingTab {
	plugin: DailyTracker;

	constructor(app: App, plugin: DailyTracker) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Settings #1')
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder('Enter your secret')
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
