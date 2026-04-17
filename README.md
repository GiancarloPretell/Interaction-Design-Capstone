# Interaction Design Capstone

## Project Overview

This project is a responsive implementation of our Figma prototype for the Interaction Design Capstone. The goal was to recreate the design using HTML, CSS, and JavaScript while keeping it as close as possible to the original prototype.

Each assignment has progressively built on the last — starting with a responsive layout, adding interactivity and search, and now incorporating real-time form validation with helpful user feedback.

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
- CSS3 (Flexbox, Media Queries, CSS Transitions & Animations)
- JavaScript (form validation, search filtering, loading states, micro-interactions, menu toggle)

---

## Folder Structure

```
/Interaction-Design-Capstone
│
├── css/
│   └── Styling files for layout, responsiveness, animations, and form validation states
│
├── images/
│   └── All images and visual assets used in the website
│
├── js/
│   └── JavaScript files for form validation, search, loading states, animations, and menu toggle
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
- Animations are intentional and tied to user actions, not purely decorative
- Form validation feedback is designed to guide users, not punish them — errors are clear, specific, and disappear once resolved

---

## Repository Link

https://github.com/GiancarloPretell/Interaction-Design-Capstone
