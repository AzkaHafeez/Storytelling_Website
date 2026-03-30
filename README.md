# Theo Of Evolution

A scroll-driven storytelling site about the evolution of life, built with React, Vite, and GSAP.

## Features
- Intro and theme selection flow
- Scroll-triggered scenes with pinned sections
- Responsive layout with custom theming

## Tech Stack
- React 19
- Vite 8
- GSAP + ScrollTrigger
- Tailwind CSS and custom CSS

## Getting Started
1. `npm install`
2. `npm run dev`

## Scripts
- `npm run dev`: start dev server
- `npm run build`: production build
- `npm run preview`: preview build
- `npm run lint`: run ESLint

## Project Structure
- [src/components](src/components): shared UI building blocks
- [src/sections](src/sections): scroll narrative scenes
- [src/styles](src/styles): global and theme styles
- [src/utils](src/utils): motion helpers

## Notes
- Theme selection sets a data attribute on the root element.
- ScrollTrigger is refreshed after theme changes.
