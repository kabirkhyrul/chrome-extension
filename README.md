# Gmail Simplifier Chrome Extension

A simple Chrome extension that makes Gmail emails easier to read by cleaning up the email list view.

## What Does This Extension Do?

Imagine your Gmail inbox is like a messy room with too many things everywhere. This extension is like a cleaning robot that:

1. **Removes extra stuff**: Takes away unnecessary buttons and icons from each email row
2. **Makes text readable**: Fixes spacing so email content doesn't get cut off
3. **Simplifies the view**: Shows only the important information (email content)

## How It Works

### For Users

**Before the extension:**
- Gmail shows many columns with icons, checkboxes, and scattered text
- Email content might be hard to read or cut off

**After the extension:**
- Only shows the main email content in a clean, readable format
- Removes clutter from each email row
- Works automatically when you open Gmail

### For Developers

The extension has 3 main parts:

#### 1. Manifest (`public/manifest.json`)
```json
{
  "manifest_version": 3,
  "name": "Chrome Extension",
  "permissions": ["activeTab"],
  "content_scripts": [{
    "matches": ["https://mail.google.com/*"],
    "js": ["content/gmail.js"]
  }]
}
```
This tells Chrome:
- Run on Gmail pages only
- Use the gmail.js script to modify the page

#### 2. Content Script (`src/content/gmail.ts`)
This is the main worker that:
- Finds all email rows (`<tr>` elements)
- Removes extra cells (columns 0-4, keeps only column 5)
- Cleans up the remaining content
- Watches for changes when you navigate Gmail

#### 3. Background Script (`src/background.ts`)
Simple monitoring script that logs when the extension is active.

## Project Structure

```
chrome-extension/
├── public/
│   └── manifest.json          # Extension settings
├── src/
│   ├── background.ts          # Background service worker
│   └── content/
│       └── gmail.ts           # Main Gmail modification script
├── dist/                      # Built files (auto-generated)
├── package.json              # Dependencies and build scripts
└── vite.config.js            # Build configuration
```

## How to Build and Install

### For Kids/Beginners:

1. **Download the code** to your computer
2. **Open terminal** and go to the folder:
   ```bash
   cd chrome-extension
   ```
3. **Install tools** (first time only):
   ```bash
   npm install
   ```
4. **Build the extension**:
   ```bash
   npm run build
   ```
5. **Install in Chrome**:
   - Open Chrome
   - Go to `chrome://extensions/`
   - Turn on "Developer mode" (top right)
   - Click "Load unpacked"
   - Choose the `dist` folder

### For Development:

```bash
# Install dependencies
npm install

# Build once
npm run build

# Build and watch for changes
npm run dev
```

## How to Customize

### Change What Gets Removed

In `src/content/gmail.ts`, look for this line:
```typescript
if (tdIndex !== 5) {
    td.remove();
}
```
- Change `5` to keep a different column
- Remove this code completely to keep all columns

### Change Text Formatting

Find these lines:
```typescript
targetCell.style.setProperty('white-space', 'break-spaces', 'important');
```
- Change `break-spaces` to `normal` for different text wrapping
- Add more style properties to change colors, fonts, etc.

### Work on Other Websites

In `public/manifest.json`, change:
```json
"matches": ["https://mail.google.com/*"]
```
To:
```json
"matches": ["https://example.com/*"]
```

## Troubleshooting

### Extension Not Working?
1. Check if it's enabled in `chrome://extensions/`
2. Reload the Gmail page
3. Check the console (F12) for error messages

### Not Working in Spam Folder?
- The extension now handles Gmail's navigation automatically
- Make sure you rebuilt after the recent updates

### Want to See What's Happening?
Open Developer Tools (F12) and check the Console tab for debug messages.

## Technical Details

- **Framework**: Vanilla TypeScript
- **Build Tool**: Vite
- **Browser**: Chrome (Manifest V3)
- **Target**: Gmail web interface

## Safety Notes

This extension only:
- Runs on Gmail pages
- Modifies the visual appearance
- Does NOT access your emails
- Does NOT send data anywhere
- Works entirely in your browser

## Contributing

To add new features:
1. Modify the TypeScript files in `src/`
2. Test with `npm run dev`
3. Build with `npm run build`
4. Reload extension in Chrome

## License

This is a simple educational project. Feel free to modify and learn from it!