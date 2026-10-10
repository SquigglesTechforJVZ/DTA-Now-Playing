# DTA Now Playing

A lightweight, local-first **Now Playing overlay for OBS Studio** with support for **YouTube Music** and **Suno**.

Built for streamers who want song metadata, cover art, playback progress, source identification, and an animated signal visualizer without Spotify or API keys.

## Features

- YouTube Music support (browser tab or installed Edge/Chrome web app/PWA)
- Suno support
- Track title and artist
- Cover artwork
- Playback progress and elapsed/total time
- Automatic source label
- Animated DTA signal visualizer
- Transparent OBS-friendly background
- Smooth show/hide behavior
- Local-only bridge bound to `127.0.0.1`
- No account credentials or API keys required

## Requirements

- Windows
- OBS Studio
- Microsoft Edge or Google Chrome
- Node.js
- YouTube Music and/or Suno

## Quick setup

### 1. Download

Download or clone this repository and extract it somewhere you can leave permanently.

### 2. Install the browser extension

In Edge:
1. Open `edge://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the repository's `extension` folder

In Chrome:
1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the repository's `extension` folder

If YouTube Music or Suno was already open, refresh the page. For an installed YouTube Music web app/PWA, fully close and reopen the app after loading or reloading the extension.

### 3. Start DTA Now Playing

Double-click:

`START-DTA-NOW-PLAYING.bat`

Leave the terminal window open while streaming.

You should see:

`DTA Now Playing: http://127.0.0.1:17777`

If Windows reports that `node` is not recognized, install Node.js and try again.

### 4. Add it to OBS

Add a **Browser Source** with:

- URL: `http://127.0.0.1:17777/`
- Width: `1920`
- Height: `1080`

The page background is transparent. The default card appears in the lower-right corner.

### 5. Play music

Start a track in YouTube Music or Suno. The overlay should automatically appear and update.

## Test the metadata bridge

While music is playing, open:

`http://127.0.0.1:17777/now-playing`

You should see JSON containing the current source, title, artist, artwork URL, playback state, position, and duration.

If that JSON is correct but OBS is not updating, refresh the OBS Browser Source cache.

## Supported sources

| Source | Status | Notes |
| --- | --- | --- |
| YouTube Music | Supported | Browser and tested installed web-app/PWA workflow |
| Suno | Supported | Reads metadata from the Suno playbar |

Because both services can change their websites, future site updates may require selector updates in the extension.

## How it works

`YouTube Music / Suno → browser extension → local bridge → OBS Browser Source`

The extension reads metadata from the active web player and sends it to the Node.js bridge. OBS loads the local overlay and polls that bridge for the current playback state.

## Privacy and networking

DTA Now Playing does not require login credentials, API keys, or a cloud service. The included bridge binds to `127.0.0.1:17777`, meaning it is intended to be reachable only from the computer running it.

Track metadata and artwork URLs are processed locally for the overlay. Normal use does not intentionally publish the bridge to your LAN or the public internet.

## Customizing the overlay

The presentation is intentionally plain web technology:

- `index.html` — overlay structure
- `style.css` — appearance, sizing, colors, placement and visualizer styling
- `overlay.js` — rendering, progress/time display and animation behavior
- `bridge.js` — local HTTP bridge
- `extension/content.js` — YouTube Music and Suno metadata detection

The included DTA theme is the default, but you are welcome to customize it for your stream.

## Troubleshooting

**Nothing appears in OBS:** Confirm the bridge terminal is still running, play a track, then check `/now-playing`. Refresh the OBS Browser Source if the JSON is correct.

**YouTube Music web app does not update:** Fully close and reopen the installed app after installing/reloading the extension.

**Suno shows incorrect metadata:** Refresh Suno after reloading the extension. Suno UI changes may require updated selectors.

**Port 17777 is already in use:** Close another copy of the bridge before starting it again.

## License

Released under the MIT License. See [LICENSE](LICENSE).

## Project

Created as part of the **DagmarTheAgile (DTA)** streaming setup and shared for other streamers to use, modify, and build on.
