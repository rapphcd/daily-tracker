import {
	Plugin, WorkspaceLeaf,
} from 'obsidian';
import {
	DEFAULT_SETTINGS,
	DailyTrackerSettings,
	SettingTab,
} from './settings';
import TrackingView, {TRACKING_VIEW} from "./view";


export default class DailyTracker extends Plugin {
	settings!: DailyTrackerSettings;

	async onload() {
		await this.loadSettings();

		this.registerView(
			TRACKING_VIEW,
			(leaf) => new TrackingView(leaf, this)
		);

		this.addRibbonIcon('dice', 'Sample', async (_evt: MouseEvent) => {
			await this.activateView();
		});

		this.addSettingTab(new SettingTab(this.app, this));
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

		let leaf: WorkspaceLeaf | null = null;
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
