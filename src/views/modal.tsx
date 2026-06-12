import {createRoot, Root} from "react-dom/client";
import {StrictMode} from "react";
import TrackingContext from "./TrackingContext";
import {App, Modal} from "obsidian";
import DailyTracker from "../main";
import {Logs} from "../types";
import ModalHabits from "./modal/ModalHabits";

export default class CheckModal extends Modal {
	plugin: DailyTracker;
	root: Root | null = null;

	constructor(app: App, plugin: DailyTracker) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		const { contentEl } = this;
		this.root = createRoot(contentEl);
		this.root.render(
			<StrictMode>
				<TrackingContext plugin={this.plugin} app={this.app} saveLogs={(newLogs) => this.handleSave(newLogs)}>
					<ModalHabits />
				</TrackingContext>
			</StrictMode>
		);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}

	async handleSave(newLogs: Logs){
		this.plugin.settings.logs = newLogs;
		await this.plugin.saveSettings();
	}
}

