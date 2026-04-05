# Portfolio — Mustafa Sodawala

A responsive, single-page portfolio built with **HTML, CSS, and JavaScript** (no build step).  
**Live site:** [mustafasodawala02.github.io/Portfolio2](https://mustafasodawala02.github.io/Portfolio2/)  
**Source:** [github.com/MustafaSodawala02/Portfolio2](https://github.com/MustafaSodawala02/Portfolio2)

---

## Features

- Semantic layout, skip link, keyboard focus styles, `prefers-reduced-motion` support  
- Open Graph / Twitter cards, `robots.txt`, `sitemap.xml`, JSON-LD `Person` schema  
- Contact form via [Formspree](https://formspree.io)  
- Project cards with screenshots, résumé download, professional About photo  

---

## Run locally

1. Clone the repository (see **Push to GitHub** below if you are starting from a folder on your PC).  
2. Open `index.html` in a browser, **or** serve the folder for full behaviour (e.g. VS Code **Live Server**, or `npx serve .`).

---

## Push this project to `Portfolio2` on GitHub (professional workflow)

Do this **once** to connect your computer to the repo, then use **add → commit → push** for updates.

### 1. Install Git

Download: [git-scm.com](https://git-scm.com/download/win) — install with default options.

### 2. Open a terminal in your project folder

```powershell
cd C:\Users\User\Desktop\Portfolio
```

(Change the path if your folder is somewhere else.)

### 3. Initialise Git (only if this folder is not already a repo)

```powershell
git init
git branch -M main
```

### 4. Point `origin` at your GitHub repository

```powershell
git remote add origin https://github.com/MustafaSodawala02/Portfolio2.git
```

If `origin` already exists and is wrong:

```powershell
git remote remove origin
git remote add origin https://github.com/MustafaSodawala02/Portfolio2.git
```

### 5. Stage everything, commit, push

**Important:** Git does not upload what you never add. Your **screenshots, avatar, résumé, and `og-image.png` must be included** or the live site will show broken images.

```powershell
git add index.html styles.css script.js favicon.svg robots.txt sitemap.xml README.md .gitignore
git add images/
git add resume.pdf og-image.png
git status
git commit -m "Portfolio: full site with SEO, Formspree, projects, and assets"
git push -u origin main
```

Project card thumbnails use **external URLs** (Binance repo + live screenshot service) so they still load if you forget `images/` once; your **About photo** (`images/avatar.png`) only works after `images/` is pushed to GitHub.

If the remote already has commits (e.g. old `index.html`), Git may reject the push. Then either:

- **Replace remote history** (only if you are sure you do not need the old commits):

  ```powershell
  git push -u origin main --force
  ```

  or  
- **Pull and merge** first: `git pull origin main --allow-unrelated-histories`, fix conflicts, then `git push`.

Use **GitHub Desktop** if you prefer a graphical flow — same idea: choose the `Portfolio2` repo, commit all files, push.

### 6. Turn on GitHub Pages

On GitHub: **Repository → Settings → Pages**  

- **Source:** Deploy from branch  
- **Branch:** `main`  
- **Folder:** `/ (root)`  
- Save. The site will be at `https://mustafasodawala02.github.io/Portfolio2/` (may take one or two minutes).

---

## Repository layout

| Path | Purpose |
|------|--------|
| `index.html` | Page structure, meta tags, content |
| `styles.css` | Layout, theme, responsive rules |
| `script.js` | Navigation, animations, form handling |
| `favicon.svg` | Browser tab icon |
| `og-image.png` | 1200×630 image for social previews |
| `resume.pdf` | Linked from the hero (résumé download) |
| `images/` | Avatar, project screenshots |
| `robots.txt` / `sitemap.xml` | Crawling hints |

> **Note:** If you previously used `images/project-portfolio2.jpg` only for the removed “earlier version” card, you can delete that file from `images/` to keep the repo tidy.

After the first successful deploy, capture a fresh screenshot of the live `Portfolio2` site and replace `images/project-portfolio.jpg` if you want the project card to match production.

---

## Configuration

| Topic | What to do |
|--------|------------|
| **Site URL** | This repo is configured for `https://mustafasodawala02.github.io/Portfolio2/`. If you use a custom domain, search the project for `Portfolio2` and update URLs. |
| **Formspree** | Form `action` is in `index.html`. Change it only if you create a new form at [formspree.io](https://formspree.io). |
| **Analytics** | Optional. Uncomment the Plausible snippet in `index.html` (or add GA) and adjust the footer privacy line if you use cookies. |
| **Résumé / photo** | Replace `resume.pdf` or `images/avatar.png` locally, then commit and push. |

---

## Licence

Personal portfolio — all rights reserved unless you add an open licence (e.g. MIT) for the code only.

---

Built with care for internships, freelance inquiries, and recruiter-friendly clarity.
