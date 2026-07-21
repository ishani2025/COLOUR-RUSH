# Color Lava - Ember Isle

A fast reaction survival game set on a 3D volcanic island. The volcano calls out
a color and floods the island with lava. You have a few seconds to run your
character to something of that color before the eruption reaches you. Survive as
many trials as you can while the rules get harder each round.

Built for the CodeChef VIT Chennai Chapter.

## Game Description

You wash ashore on Ember Isle and spawn in a random region each run - the forest,
the farmland, the river, the cherry garden, the ruins, the mountain pass, or the
central village. The village at the island's heart contains every color and acts
as a safe hub; the outer lands are single-color regions and are a gamble.

Each round the volcano announces a command. You must reach a matching object
before the timer ends and the lava floods in. A minimap in the corner marks the
glowing safe zones for the current command.

Commands include:

- FIND a color: reach any object of that color.
- NOT a color: touching that color is instant death; reach any other color.
- ANY HOUSE / WOOD / WATER: reach any object of that category.
- Two colors (A OR B): either color is safe.
- LAST SAFE COLOR: reach the color that saved you last round (from memory).
- TOUCH TWICE: touch the color, step away, touch it again.
- DO NOT TOUCH ANYTHING: freeze in the open; any object you touch kills you.

Rounds and difficulty:

- Round 1 - Color Rush (3 trials, 10 seconds): learn the island; any match counts.
- Round 2 - Chaos (5 trials, 8 seconds): new command types; the nearest matching
  object is locked, so you must go a little further.
- Round 3 - Panic (6 trials, 6 seconds): the two nearest matches are locked, so
  you go further; the island starts breaking apart (objects collapse or catch
  fire between trials).
- Endless (from trial 15): a new command every few seconds; the three nearest
  matches are locked and the lava never fully recedes.

Extra features: a day and night cycle with a dramatic night volcano glow,
volcano eruptions with camera shake, ground cracks and falling ash, spoken color
callouts, adaptive background music that intensifies each round, and a local
leaderboard that records player name, highest safe trials, and time survived.

## Controls

- Move: W A S D or the arrow keys.
- The minimap (bottom right) marks the glowing safe zones for the current color.
- The mute button (top left) silences music, voice, and sound.

## Tech Stack

- React (single functional component, no required props).
- Three.js for the real-time 3D world, terrain, lighting, and effects.
- Tone.js for the adaptive background music.
- Web Speech API (SpeechSynthesis) for the spoken color callouts.
- Web Audio API for wind ambience and countdown ticks.
- HTML5 Canvas for the minimap.
- Plain CSS (injected by the component) for the interface, welcome animation,
  and screens. No CSS framework required.

The leaderboard is kept in memory for the session. It can be switched to browser
localStorage for persistence when deployed as a standalone site.

## Project Structure

```
public/
  logo.png     Your CodeChef VIT Chennai logo, shown on the welcome screen.
  qr.png       QR code image shown on the game over screen (Instagram link).
src/
  ColorLavaGame.jsx   The entire game as one React component.
```

The component references the two images by absolute path (/logo.png and
/qr.png), which is how files in the public folder are served in Vite and
Create React App.

## How To Run

Prerequisites: Node.js version 18 or newer, and npm.

### Option A - Run inside a new Vite React app (recommended)

1. Create a new React project:

   npm create vite@latest color-lava -- --template react

2. Enter the project and install dependencies:

   cd color-lava
   npm install
   npm install three tone

3. Copy ColorLavaGame.jsx into the src folder.

4. Copy your logo image to public/logo.png and the QR image to public/qr.png.

5. Use the component. Replace the contents of src/App.jsx with:

   import ColorLavaGame from './ColorLavaGame.jsx';
   export default function App() { return <ColorLavaGame />; }

6. Start the development server:

   npm run dev

7. Open the address shown in the terminal (usually http://localhost:5173).
   Allow the page to play audio, then press ENTER THE ISLE and WASH ASHORE.

### Option B - Build for production

   npm run build
   npm run preview

The build output in the dist folder can be hosted on any static host such as
Netlify, Vercel, or GitHub Pages.

### Option C - Standalone HTML version

A no-setup version of the same game is provided as color-lava-game.html. It has
no build step and no dependencies to install; open the file in a modern browser
(Chrome, Edge, Firefox, or Safari) and play. An internet connection is needed on
first load because it pulls the 3D engine from a content delivery network. This
version does not include the welcome animation or the end-screen QR code.

## Notes

- Use a desktop or laptop with a keyboard. The game is designed for keyboard
  movement.
- A modern browser with WebGL is required. Chromium based browsers give the
  smoothest performance.
- If performance is low on an older machine, the heaviest cost is shadows; this
  can be reduced on request.

## Credits

Created for the CodeChef VIT Chennai Chapter. Follow the chapter on Instagram at
instagram.com/codechef.vitc (also shown as a QR code on the game over screen).