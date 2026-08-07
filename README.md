# Benaka Tours & Travels — Web Platform

Premier Car Rental Service in Panchaxari Nagar, Gadag, Karnataka.

## Overview

Benaka Tours & Travels has been serving customers across Gadag, Hubballi, Dharwad, and South India since 2019. This repository contains the modern React + TypeScript + Vite web application built with Feature-Sliced Design (FSD) architecture, Tailwind CSS v4, Motion for React, and GSAP.

## Key Business Rules

- **100% Chauffeur-Driven**: All rentals include professional drivers. Self-drive options are strictly not provided.
- **Dynamic Pricing**: Fares are confirmed dynamically per trip via WhatsApp or direct call based on route, duration, fuel, and tolls.
- **Primary Workflows**: Direct WhatsApp chat (`wa.me/916362416120`) and phone calling (`+91 63624 16120`).
- **Fleet Inventory**: 12 exact vehicles (Sedans, MUVs, SUVs, Minibuses, and 25-Seater Coach).

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + Custom Design Tokens
- **Typography**: `@fontsource/outfit` (Primary UI) + `@fontsource/dancing-script` (Brand Accent)
- **Animation**: `motion` (Component UI/States) + `gsap` with `ScrollTrigger` (Timelines & Parallax)
- **Icons**: `lucide-react`
- **Testing**: Vitest + React Testing Library + jsdom

## Architecture

Following Feature-Sliced Design (FSD) dependency boundaries:
`app → pages → widgets → features → entities → shared`

For detailed technical architecture, see [docs/architecture.md](docs/architecture.md).

## Available Commands

```bash
# Start development server
npm run dev

# Execute type checking
npm run typecheck

# Run Vitest unit tests
npm run test:run

# Format code with Prettier
npm run format

# Production build
npm run build
```

## Environment Variables

See `.env.example` for available configuration flags:

- `VITE_APP_NAME`: Application display name
- `VITE_SITE_URL`: Primary domain URL
- `VITE_GOOGLE_MAPS_API_KEY`: Optional Google Maps API key
- `VITE_SUPABASE_URL`: Optional Supabase URL
- `VITE_SUPABASE_ANON_KEY`: Optional Supabase anonymous key

## Phase 1 Status

Completed project foundation, dependencies, clean FSD architecture, verified business data models, reusable UI components, routing foundation, animation setup, and Vitest test suite.
