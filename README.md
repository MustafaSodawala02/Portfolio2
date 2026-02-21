# Mustafa Sodawala — Portfolio

A premium, modern single-page portfolio built with HTML, CSS, and JavaScript. No build step required.

## Quick start

1. Open `index.html` in a browser, or  
2. Serve the folder with any static server, e.g.:
   - **VS Code:** Install "Live Server" and right-click `index.html` → "Open with Live Server"
   - **Python:** `python -m http.server 8000` then visit `http://localhost:8000`
   - **Node:** `npx serve .` then open the URL shown

## Customization

- **Links:** Replace `https://github.com` and `https://linkedin.com/in` in `index.html` with your GitHub and LinkedIn URLs.
- **Project links:** Update each project’s "Code" and "Live" `href` in the Projects section with your repo and demo URLs.
- **Contact form:** The form currently shows a success state only. To send emails, plug in a form service (e.g. Formspree, Netlify Forms) or your own backend and point the form `action` to it.
- **CV:** To add a "Download CV" button in the Hero, add a link to your PDF and use the same button styles as the existing CTAs.

## Sections

- **Hero** — Name, typing title, summary, CTAs (View Projects, Hire Me, Contact Me)
- **About** — Background, traits, career focus
- **Services** — Web Development, UI/UX Design, App Development, Animation
- **Skills** — Technical bars (Python, JS, HTML/CSS, SQL, React, Git) and soft-skill badges
- **Projects** — Cards with placeholder images; add real images by using `<img>` inside `.project-image`
- **Gallery** — Grid placeholders; replace with your own images or links
- **Contact** — Email, phone, location, social links, and contact form
- **Footer** — Copyright and social links

## Tech

- **HTML5** — Semantic sections and accessibility-friendly markup
- **CSS** — Custom properties, gradients, glassmorphism-style cards, scroll animations, responsive layout
- **JavaScript** — Typing effect, mobile menu, smooth scroll, skill-bar and reveal-on-scroll animations, form feedback

Fully responsive and mobile-friendly.
