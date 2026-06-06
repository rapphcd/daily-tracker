import { ItemView, WorkspaceLeaf } from "obsidian";
import {createRoot, Root} from "react-dom/client";
import ReactView from './ReactView';
import {StrictMode} from "react";
import DailyTracker from "../main";
import {Logs} from "../types";
import TrackingContext from "./TrackingContext";

export const TRACKING_VIEW = "tracking-view";

export default class TrackingView extends ItemView {
	plugin: DailyTracker;
	root: Root | null = null;

	constructor(leaf: WorkspaceLeaf, plugin: DailyTracker) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType(): string {
		return TRACKING_VIEW;
	}

	getDisplayText(): string {
		return "Tracking view";
	}

	async handleSave(newLogs: Logs){
		this.plugin.settings.logs = newLogs;
		await this.plugin.saveSettings();
	}

	async onOpen() {
		this.root = createRoot(this.contentEl);
		this.root.render(
			<StrictMode>
				<TrackingContext plugin={this.plugin} saveLogs={(newLogs) => this.handleSave(newLogs)}>
					<ReactView />
				</TrackingContext>
			</StrictMode>
		);
	}

	async onClose() {
		this.root?.unmount();
	}
}
