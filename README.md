# 📱 RN Component Generator

A web application for generating **React Native components with natural language**. Describe the component you want, choose a brand theme, and get production-ready code — all deployed to GitHub Pages.

## ✨ Features

- **Natural Language Generation** — Describe any React Native component in plain English and get working code via OpenAI
- **4 Brand Themes** — Apply consistent brand styles (Default, Dark, Neon, Minimal) across all components
- **Component Gallery** — Browse local session components and remotely committed GitHub components
- **GitHub Commit Integration** — Commit generated components directly to a GitHub repository from the UI
- **GitHub Pages Deployment** — Fully static, deploys automatically via GitHub Actions

## 🚀 Getting Started

### Local Development

```bash
npm install
npm run dev
```

### Build & Preview

```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages

Push to `main` — GitHub Actions automatically builds and deploys to GitHub Pages.

Or manually:

```bash
npm run deploy
```

## ⚙️ Configuration

Open the **Settings** tab in the app to configure:

### OpenAI
- **API Key** — Your OpenAI API key (`sk-...`) — stored in your browser only
- **Model** — `gpt-4o-mini` (default), `gpt-4o`, or `gpt-3.5-turbo`

### GitHub
- **Personal Access Token** — Token with `repo` scope (`ghp_...`) — stored in your browser only
- **Owner** — Your GitHub username or organisation
- **Repository** — Target repo to commit generated components to
- **Branch** — Default `main`
- **Components Path** — Subdirectory to commit into (default `components`)

## 🎨 Brand Themes

| Theme | Style |
|-------|-------|
| **Default** | Clean modern blue/white |
| **Dark** | Deep dark mode with rich purples |
| **Neon** | Vibrant cyberpunk neon |
| **Minimal** | Ultra-minimal black and white |

Each brand theme injects consistent colors, typography, spacing, and border radii into every generated component.

## 🏗️ Project Structure

```
src/
├── brands/              # Brand theme configs (Default, Dark, Neon, Minimal)
├── components/          # UI components (Chat, Preview, Gallery, Settings, Modal)
├── hooks/               # useLocalStorage hook
├── services/            # OpenAI + GitHub API integrations
└── App.jsx              # Main app with tab navigation
```
