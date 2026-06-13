import {
	Plugin, WorkspaceLeaf,
} from 'obsidian';
import {
	DEFAULT_SETTINGS,
	DailyTrackerSettings, SettingsTab
} from './settings';
import TrackingView, {TRACKING_VIEW} from "./views/view";
import StatsModal from "./views/modal";

export default class DailyTracker extends Plugin {
	settings!: DailyTrackerSettings;

	async onload() {
		await this.loadSettings();

		this.registerView(
			TRACKING_VIEW,
			(leaf) => new TrackingView(leaf, this)
		);

		this.addRibbonIcon('calendar-1', 'Daily tracker', async (_evt: MouseEvent) => {
			await this.activateView();
		});

		this.addCommand({
			id: 'show-statistics',
			name: 'Show statistics',
			callback: () => {
				new StatsModal(this.app, this).open();
			},
		});

		this.addSettingTab(new SettingsTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<DailyTrackerSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async activateView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null;
		const leaves = workspace.getLeavesOfType(TRACKING_VIEW);

		if(leaves.length > 0 && leaves[0] != undefined) {
			leaf = leaves[0];
		} else {
			leaf = workspace.getRightLeaf(false);
			if(leaf != null){
				await leaf.setViewState({ type: TRACKING_VIEW, active: true });
			}
		}

		if(leaf != null){
			await workspace.revealLeaf(leaf);
		}
	}
}
