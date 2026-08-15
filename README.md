# Uniform Vista

A single-page, 3D-interactive website for **Uniform Vista** — a full-service uniform house covering corporate, medical, industrial, sports, hospitality, chef, and corporate gifting lines.

Built with plain HTML, CSS, and JavaScript — no framework, no build step, no dependencies.

---

## ✨ Features

- **One-page layout** with smooth-scroll navigation: Home · About · Collections · Reviews · Contact
- **Navy & gold premium visual theme**, custom typography (Cormorant Garamond, Jost, Bebas Neue via Google Fonts)
- **Hero section** with a cross-fading photo background slideshow and a translucent overlay so text stays readable
- **3D tilt effects** on product cards and review cards, driven by cursor position
- **Product grid** — 7 uniform/gifting lines with real photos, hover zoom, and a click-to-open detail popup — plus an 8th "Not Sure? Get a Custom Quote" CTA tile
- **Reviews rail** — 10 client testimonials in a horizontally draggable, scroll-snapping carousel
- **Booking form** for 30-minute consultations (name, email, phone, interest, preferred date & time, notes) with a live preview of the request as you fill it in
- **Decorative geometric shapes** in the About section background
- Fully responsive (mobile nav menu, stacked layouts) and respects `prefers-reduced-motion`

---

## 📁 Project Structure

```
uniform-vista/
├── index.html          # All page markup and sections
├── style.css            # All styling (design tokens, layout, animations)
├── script.js             # All interactivity (nav, tilt, carousel, modal, form, slideshow)
└── assets/                # All images used across the site
    ├── uv-logo.jpeg              # Logo (navbar + About section)
    ├── corporate-office.webp     # Product photo — Corporate & Office Wear
    ├── medical-scrubs.avif       # Product photo — Medical & Healthcare Scrubs
    ├── industrial.jpeg           # Product photo — Industrial & Workwear
    ├── sports.jpg                # Product photo — Sports & Team Kits
    ├── hospitality.png           # Product photo — Hospitality & Hotel Staff
    ├── chef.jpg                  # Product photo — Chef & Kitchen Wear
    ├── corporate-gifts.avif      # Product photo — Corporate Gifts & Hampers
    ├── office-bg.avif            # Hero background slideshow
    ├── industrial-bg.jpg         # Hero background slideshow
    ├── chefs-bg.jpg               # Hero background slideshow
    └── medical-scrubs-bg.jpg     # Hero background slideshow
```

> Keep the `assets` folder alongside the three code files at all times — every image reference in `index.html` points to `assets/<filename>`.

---

## 🚀 Getting Started

No build tools or package installs required.

**Option 1 — Just open it**
Double-click `index.html` to open it in your browser.

**Option 2 — Local server (recommended for testing)**
Some browsers restrict certain features (like form submission) when run directly from the file system. Serve it locally instead:

```bash
# Python 3
python3 -m http.server 8000

# Node (if you have npx)
npx serve .
```

Then visit `http://localhost:8000`.

---

## 📬 Contact Form Setup

The booking form uses [FormSubmit](https://formsubmit.co/) — a free, backend-free form-to-email service. No server or database needed.

Current destination is set in `index.html`:

```html
<form ... action="https://formsubmit.co/bussiness@uniformvista.com" method="POST">
```

**Important first-time step:** the very first submission after the site goes live sends a *confirmation email* to that address instead of the form data. Click **"Activate Form"** in that email once — after that, every real submission arrives normally, formatted as a table with the client's name, email, phone, interest, preferred date/time, and notes.

To change the destination email, update the `action` URL to `https://formsubmit.co/YOUR-EMAIL@example.com`.

---

## 🎨 Customizing

- **Colors & fonts** — defined as CSS custom properties at the top of `style.css` under `:root` (`--navy-deep`, `--gold`, `--font-display`, etc.)
- **Products** — each product card lives in `index.html` inside `#productGrid`; swap the image, tag, title, and description as needed
- **Reviews** — inside `#reviewsRail`, each `.review-card` is self-contained
- **Contact info** — email/Instagram links are in the Contact section and the footer

---

## 🌐 Browser Support Notes

Two product images use the **AVIF** format (`corporate-gifts.avif`, `medical-scrubs.avif`, `office-bg.avif`), which is supported in all current major browsers (Chrome, Edge, Firefox, Safari 16+). If you need to support older browsers, convert these to JPG/PNG/WebP.

---

## 📄 License

Internal project for Uniform Vista. All uploaded product photography and logo assets are the property of Uniform Vista — replace or remove before reuse elsewhere.