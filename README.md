# Interaction Design Capstone

## Project Overview

This project is a responsive implementation of our Figma prototype for the Interaction Design Capstone. The goal was to recreate the design using HTML, CSS, and JavaScript while keeping it as close as possible to the original prototype.

Each assignment has progressively built on the last — starting with a responsive layout, adding interactivity and search, incorporating real-time form validation, and now implementing accessibility improvements and a functional dark mode.

---

## How to Run the Project Locally

1. **Download or clone the repository:**

   ```
   git clone https://github.com/GiancarloPretell/Interaction-Design-Capstone.git
   ```

2. **Open the project folder:**

   ```
   cd Interaction-Design-Capstone
   ```

3. **Run the project:**
   - Open `index.html` in your browser (Chrome recommended), **OR**
   - Use VS Code:
     - Install the **Live Server** extension
     - Right-click `index.html`
     - Click **"Open with Live Server"**

---

## Live Website (GitHub Pages)

You can also view the deployed version here:
👉 https://giancarlopretell.github.io/Interaction-Design-Capstone/

---

## Assignment 13 Features — Accessibility & Dark Mode

### Dark Mode Toggle

- A toggle is available site-wide and easy to locate in the navigation
- The toggle clearly indicates which mode is currently active
- Dark mode applies consistently across every page and component — not just one section
- Colors were chosen specifically for dark backgrounds rather than simply inverting the light palette
- The user's theme preference persists across page reloads using `localStorage`

### Color Contrast

- All text-background combinations were verified against WCAG AA standards using a contrast checker
- Small text meets a minimum 4.5:1 contrast ratio; large text meets at least 3:1
- Contrast requirements are met in both light and dark modes
- Placeholder text, borders, and icon colors were also reviewed and updated where needed

### Text Readability & Zoom

- Typography uses relative units (`rem`, `em`, `%`) throughout — no hardcoded `px` font sizes
- Layout remains intact and readable when the browser is zoomed to 200%
- No content overflows, overlaps, or becomes clipped at increased zoom levels

### Focus & Interactive States

- All interactive elements have visible focus indicators
- Buttons, links, and inputs are distinguishable in both themes

---

## Assignment 12 Features — Form Validation & User Feedback

### Real-Time Input Validation

- Validation triggers as the user types and when moving between fields (on `input` and `blur` events)
- Required fields, format checks, and length constraints are all caught before submission
- Errors are never batched and shown only on submit — feedback is immediate

### Inline Error Messages

- Every error message appears directly next to the relevant field, not in an alert box or at the top of the page
- Messages are specific and actionable — for example, _"Enter a valid phone number with 10 to 15 digits"_ rather than just _"Invalid"_
- Errors automatically clear as soon as the user corrects the input

### Success States

- Fields that pass validation display a visible confirmation state (e.g., green border or checkmark icon) so users know their input is accepted
- Users are never left guessing whether a field is valid

### Forms Implemented

- **Event Sign Up** — validates name, email format, phone number, and if all other required options are selected
- **Application to Enlist into Yale School of Art** — validates name, email format, phone number, resume and portfolio upload (size and format) and if all other required options are selected

---

## Assignment 11 Features — Interactive Search & Micro-Interactions

### Client-Side Search with Suggestions

- Search input filters content in real time as the user types
- Suggestions update instantly without requiring form submission
- Clearing the input resets suggestions and restores the full view
- An empty state and "no results" message appear when nothing matches

### Loading Indicators

- Visible loading animations appear when forms are submitted
- Users are never left without feedback during an async action

### Micro-Interactions & Animations

- Smooth transitions and hover effects applied throughout the interface
- Animated accordions on pages like FAQ and News
- Clear error messages when users attempt to submit forms with wrong information
- All animations serve a clear UX purpose and feel intentional

---

## Core Features (from Assignment 10)

### Mobile-First Design

- Text is readable without zoom
- Buttons are large enough to tap
- No horizontal scrolling on mobile

### Responsive Navigation

- **Mobile:** Hamburger menu opens and closes on click
- **Desktop:** Full navigation bar with horizontal links, visible across all pages

### Responsive Testing

- Tested using Chrome DevTools at mobile (~375px) and desktop (~1280px)

---

## Technologies Used

- HTML5
- CSS3 (Flexbox, Media Queries, CSS Transitions & Animations, CSS Custom Properties for theming)
- JavaScript (dark mode toggle, localStorage persistence, form validation, search filtering, loading states, micro-interactions, menu toggle)

---

## Folder Structure

```
/Interaction-Design-Capstone
│
├── css/
│   └── Styling files for layout, responsiveness, animations, form validation states, and dark mode theming
│
├── images/
│   └── All images and visual assets used in the website
│
├── js/
│   └── JavaScript files for dark mode toggle, form validation, search, loading states, animations, and menu toggle
│
├── pages/
│   └── Additional HTML pages linked from the navigation
│
├── index.html
│   └── Main landing page of the website
│
└── README.md
    └── Project documentation and setup instructions
```

---

## Design Notes

- Layout closely follows the Figma design
- Consistent fonts, colors, and spacing across all screen sizes
- Responsive behavior keeps the design unified between mobile and desktop
- Dark mode uses a purposefully designed palette — not an inversion — to keep the interface visually coherent
- Animations are intentional and tied to user actions, not purely decorative
- Form validation feedback is designed to guide users, not punish them — errors are clear, specific, and disappear once resolved

---

## Repository Link

https://github.com/GiancarloPretell/Interaction-Design-Capstone
