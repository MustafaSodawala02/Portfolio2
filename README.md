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
- **Contact form (receive at mustafasodawala13@gmail.com):**  
  1. Go to [formspree.io](https://formspree.io) and sign up with **mustafasodawala13@gmail.com**.  
  2. Create a new form; Formspree will give you a form ID (e.g. `xjvqopky`).  
  3. In `index.html`, find the contact form and replace `YOUR_FORM_ID` in the `action` URL with your form ID:  
     `action="https://formspree.io/f/YOUR_FORM_ID"` → `action="https://formspree.io/f/xjvqopky"`.  
  Until you do this, "Send Message" will open the visitor’s email client to send you a mailto email instead.
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
