# Logseq Completion Marker

![Plugin Logo](./logo.png)

Automatically adds completion markers to checked tasks in the format `[[Jul 7th, 2025]] #Done` and removes them when unchecked.

## Features
- Adds formatted completion date when task is checked
- Uses abbreviated month names (Jan, Feb, Mar, etc.)
- Adds `#Done` tag automatically
- Completely removes markers when task is unchecked
- Supports all checkbox formats:
  - `DONE Task`
  - `- [x] Task`
  - `TODO Task ✔`

## Installation
1. Download the plugin files
2. In Logseq: Settings → Plugins → "Load unpacked plugin"
3. Select the plugin folder

## Example
```markdown
- [x] Finish report → becomes:
- [x] Finish report [[Jul 7th, 2025]] #Done
```

## Building
```bash
npm install
npm run build
```
