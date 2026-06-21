# Daily Tracker

Habit tracking and daily statistics directly in Obsidian.
## Overview
Daily Tracker is an Obsidian plugin designed to help users monitor their daily habits and productivity. It features an interactive sidebar view for log management, custom habit checkboxes, sleep and work time logging, and a dedicated analytics modal with detailed visual statistics (including bar, radar, and pie charts).

## Features
- **Right Sidebar View:** An integrated React-based sidebar pane for quick, convenient daily logging.
- **Habit Tracking:** Monitor up to 5 custom habits.
- **Time Logging:** Log work and sleep duration (0-24 hours range with 30-minute intervals).
- **Daily Summaries:** Enter a text summary/recap of the day (up to 400 characters).
- **Interactive Calendar:** A monthly calendar showing days with notes. Click to load past logs, or double-click to create new ones.
- **Advanced Visual Analytics:**
	- 7-day bar charts of sleep versus work time.
	- Interactive statistics modal displaying monthly averages, a radar chart of habit consistency (for 3+ habits), and pie charts breaking down the last 4 days' time allocation.
- **Auto-midnight Resets:** Automatically switches views and initializes a new log entry at midnight.

## Installation
1. Clone this repository into your Obsidian vault's plugin directory: `<VaultFolder>/.obsidian/plugins/daily-tracker`.
2. Open a terminal in the cloned folder.
3. Install the dependencies using:
   ```bash
   npm install
   ```
4. Build the plugin:
   ```bash
   npm run build
   ```
5. Open Obsidian, go to **Settings → Community plugins**, refresh the list, and toggle on **Daily Tracker**.

## How to use ?
- **Open Tracking View:** Click the calendar ribbon icon in the left sidebar to open the Daily Tracker view in the right sidebar.
- **Log Daily Data:** Write a brief recap of your day under the **Summary** section, check off completed habits, and adjust your work and sleep hours using the counter buttons (`-` / `+`) or number input fields.
- **Switch Dates:** Click on any date on the monthly calendar. Dates underlined have existing logs. Click to load, or double-click to initialize a log entry for a past day.
- **View Statistics Modal:** Click the external link button next to "Statistics" in the sidebar, or run the command `Daily Tracker: Show statistics` from the Obsidian command palette (`Ctrl/Cmd + P`).
- **Manage Habits:** Go to Obsidian's **Settings → Daily Tracker** to configure default habits.

## Settings
- **New habit:** Input text and click **Add habit** to configure a new habit (maximum of 5).
- **Habits List:** List of currently configured habits with a button to delete them.

## Tech Stack
- **TypeScript:** Typed safety and syntax checking.
- **React (v19.x) / React-DOM:** Modern UI component library.
- **Recharts (v3.x):** Responsive data visualization.
- **esbuild:** Fast bundler and development server script.

## Dependencies
- `react` (^19.2.7)
- `react-dom` (^19.2.7)
- `recharts` (^3.8.1)
- `@recharts/devtools` (^0.0.14)
- `obsidian` (latest, devDependency)
- `esbuild` (0.25.5, devDependency)
- `typescript` (^5.8.3, devDependency)

---
[@rapphcd](https://github.com/rapphcd)
