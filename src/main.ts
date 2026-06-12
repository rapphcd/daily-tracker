import {
	MarkdownView,
	Plugin, WorkspaceLeaf,
} from 'obsidian';
import {
	DEFAULT_SETTINGS,
	DailyTrackerSettings, SettingsTab
} from './settings';
import TrackingView, {TRACKING_VIEW} from "./views/view";
import CheckModal from "./views/modal";

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
			id: 'complete-habit',
			name: 'Complete habit',
			checkCallback: (checking: boolean) => {
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					if (!checking) {
						new CheckModal(this.app, this).open();
					}
					return true;
				}
				return false;
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
