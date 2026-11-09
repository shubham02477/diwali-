# Saal Mubarak — A Brighter Beginning

A responsive Gujarati New Year greeting experience for **Bestu Varas · Vikram Samvat 2083** (Tuesday, 10 November 2026).

Built with plain **HTML, CSS and vanilla JavaScript**. No framework, build step, database or server-side code is required. The mountain, city skyline and diya are drawn with original inline SVG and CSS; fireworks are rendered with the Canvas API.

## Run it on your computer

1. Download and unzip this folder.
2. Open `index.html` in Chrome, Edge, Safari or Firefox.
3. Press **Light the diya**, then choose **Saal Mubarak** to open the four-page greeting card.

For a local development server, open a terminal in this folder and run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Share it with everyone (publish it online)

Opening `index.html` on your own computer only creates a local file. Other people cannot open your computer's local file path. To give everyone one public link, publish this folder using a static host.

### GitHub Pages (free)

1. Sign in to GitHub and create a new **public** repository, for example `saal-mubarak-greeting`.
2. Upload the five project files/folders (`index.html`, `styles.css`, `script.js`, `README.md`; no build folder is needed) to the repository's top level.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch **main** and folder **/(root)**, then save.
6. GitHub will show the published website URL in the Pages section. It will look like `https://YOUR-USERNAME.github.io/saal-mubarak-greeting/`.
7. Open the published URL on your phone to test it, then send that URL in WhatsApp or any group.

Publishing may take a few minutes the first time. Keep `index.html` at the top level of the repository.

### Netlify Drop (alternative)

You can also sign in to Netlify and use its manual deploy / drag-and-drop flow to upload this project folder. Netlify will provide a public URL after deployment.

## What's included

- Night-sky mountain lookout and a glowing city skyline.
- CSS diya that lights up when the visitor presses the main button.
- Canvas fireworks (scaled for high-density displays) after the diya is lit.
- Four general greeting pages for family, friends, community and everyone.
- Previous/next controls, page dots, keyboard navigation and touch swipe.
- Native share / copy-link support where the browser allows it, plus a WhatsApp fallback.
- Responsive layout and reduced-motion support.
- No names or personal details hard-coded into the wishes.

## Customize the text

Open `script.js` and edit the `wishes` array. Each entry has `kicker`, `title`, `message`, `signoff` and `gujarati` fields.

## Notes

- The site uses Google Fonts when an internet connection is available; system font fallbacks are included.
- All scene artwork and animation code are included in the project. No separate image download is required.
- A public GitHub Pages site is visible to anyone with the link (and may be discoverable on the web). Do not add private information to this project.
