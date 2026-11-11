<div align="center">

  <img src="public/assets/vehicles/placeholders/kedarvehicles.png" alt="Kedar Tours & Travels Fleet Banner" width="100%" style="border-radius: 16px; margin-bottom: 20px; border: 1px solid rgba(212, 175, 55, 0.3);" />

  <img src="public/assets/brand/kedar_emblem_gold_transparent.png" alt="Kedar Tours & Travels Crest Emblem" height="90" style="margin-bottom: 12px;" />

# KEDAR TOURS & TRAVELS

### Premier Chauffeur-Driven Vehicle Rental Fleet in Gadag, Karnataka

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3.0-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-5.1-4285F4?style=for-the-badge&logo=maplibre&logoColor=white)](https://maplibre.org/)

</div>

---

## 📌 Executive Summary

**Kedar Tours & Travels** is Gadag's most trusted **100% Chauffeur-Driven** vehicle rental service, operating continuous 24/7 luxury outstation, local, corporate, wedding, and pilgrimage transport across Karnataka, Goa, Maharashtra, Telangana, Andhra Pradesh, and Tamil Nadu since 2019.

This repository contains the enterprise-grade **React 19 + TypeScript** web application engineered with **Feature-Sliced Design (FSD)** architecture, smooth **Motion for React** micro-interactions, **MapLibre GL** live location mapping, multi-language localization (English, Kannada, Hindi), branded **PDF Quotation Generation**, and an automated Vitest test suite.

---

## 📞 Verified Business & Contact Information

| Contact Channel          | Details / Link                                                                      | Availability      |
| :----------------------- | :---------------------------------------------------------------------------------- | :---------------- |
| 📞 **Direct Phone Call** | [**+91 98807 62623**](tel:+919880762623)                                            | 24 Hours / 7 Days |
| 💬 **WhatsApp Direct**   | [**+91 98807 62623 (Chat Now)**](https://wa.me/919880762623)                        | Instant Response  |
| 📍 **Main Office Hub**   | **Panchaxari Nagar 5th Cross, Gadag, Karnataka 582101, India**                      | Open Daily 24/7   |
| 🗺️ **Google Maps**       | [**View Verified Google Maps Location**](https://maps.app.goo.gl/DNABVnQ9cGwE6T9T7) | Live GPS          |
| ✉️ **Email Support**     | [**sachiii8827@gmail.com**](mailto:sachiii8827@gmail.com)                          | Inquiries         |
| 🌐 **Official Website**  | [**kedartravels.in**](https://kedartravels.in/)                                     | Live Portal       |

---

## 🛡️ Core Business Guarantees

- 👨‍✈️ **100% Chauffeur-Driven**: Every rental is operated exclusively by certified, uniformed professional drivers. **Self-drive rentals are strictly not provided under any circumstances.**
- 🚘 **Zero Customer Liability**: Driver takes full operational responsibility for vehicle safety, maintenance, and navigation.
- ⚡ **24/7 Doorstep Service**: Instant pick-up and drop available anytime across Gadag, Hubballi, Dharwad, and surrounding regions.
- 💰 **Transparent Custom Pricing**: Rates calculated dynamically based on trip distance, vehicle category, and duration with zero hidden fees.
- 📄 **Official Branded Quotations**: Instant export of PDF quotations with reference IDs and fare breakdowns for corporate, tour, or pilgrimage bookings.

---

## 🚘 Fleet Inventory (12 Vehicles)

| Category          | Vehicles                                                             | Seating        | Fuel            | Ideal Use Cases                                      |
| :---------------- | :------------------------------------------------------------------- | :------------- | :-------------- | :--------------------------------------------------- |
| **Sedan**         | Maruti Swift Dzire, Hyundai Aura                                     | 5 Seats        | Petrol / CNG    | City commute, local pick-up, small family trips      |
| **MUV**           | Maruti Ertiga, Toyota Innova Crysta, Force Toofan Cruiser            | 7 to 11 Seats  | Petrol / Diesel | Family outstation trips, executive delegation        |
| **SUV**           | Mahindra Scorpio, Mahindra Bolero, Maruti Brezza, Grand Vitara, Thar | 5 to 7 Seats   | Diesel / CNG    | Highway journeys, rough terrain, VIP travel          |
| **Minibus & Bus** | 13-Seater Tempo Traveller, 25-Seater Bus                             | 13 to 25 Seats | Diesel          | Marriage fleets, corporate outings, pilgrimage tours |

---

## 🌟 Key Application Features

1. **Modern Responsive UI**: Built with a luxury dark obsidian & gold aesthetic (`#040507` / `#D4AF37`) adhering to modern WCAG accessibility guidelines.
2. **Interactive Fare Estimator**: Dynamic fare calculator computing estimated rates for outstation, temple pilgrimages, airport transfers, and local packages.
3. **Official PDF Quotation Generator**: Generate, print, or download branded receipts with unique quote IDs (`KTT-QUOTE-YYYY-XXXX`) and itemized cost breakdowns.
4. **Automated WhatsApp Booking Wizard**: 4-step interactive modal that compiles user choices into structured, pre-formatted WhatsApp inquiries.
5. **Multi-Language Support (i18n)**: One-click seamless language switcher between English, Kannada (ಕನ್ನಡ), and Hindi (हिंदी).
6. **AI Concierge Assistant**: Interactive virtual assistant trained on Kedar Tours & Travels fleet, policies, chauffeur standards, and contact details.
7. **Interactive Route & Destination Map**: MapLibre GL vector map showcasing popular routes (Hubballi, Hampi, Badami, Gokarna, Goa, Bengaluru).
8. **Operations & Admin Dashboard**: Dedicated administrative interface (`admin-website/` and in-app `/admin`) for fleet tracking, tariff controls, and customer inquiry management.

---

## 🚀 Technical Architecture & Directory Structure

```text
src/
├── app/          # App initialization, global styles, providers, router configuration
├── pages/        # Lightweight route pages (Home, Fleet, Vehicle Details, Booking, Contact, Admin)
├── widgets/      # Compositional UI widgets (Header, TopBar, Footer, LocationMap, MobileActionBar)
├── features/     # Feature modules (Hero, BookingWizard, Quotation, Chatbot, FareCalculator, Reviews)
├── entities/     # Domain data models & business sources (Vehicle, Business, FAQ)
└── shared/       # Reusable UI primitives, services (WhatsApp, Phone, Maps), hooks, and constants
```

- **Framework**: React 19 + TypeScript + Vite v6
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + Custom Obsidian & Gold Design System
- **Animation**: Motion for React (`motion`) + GSAP ScrollTrigger
- **Mapping**: `@mapcn/map` + `MapLibre GL` with CARTO & OpenStreetMap tiles
- **Icons**: `lucide-react`
- **Testing**: Vitest + React Testing Library + jsdom

---

## 🛠️ Local Development & Scripts

```bash
# 1. Install dependencies
npm install

# 2. Start public customer website (default port: 5173)
npm run dev

# 3. Start standalone admin console (default port: 5174)
npm run dev:admin

# 4. Execute TypeScript typecheck
npm run typecheck

# 5. Run Vitest test suite
npm run test:run

# 6. Run Oxlint code linter
npm run lint

# 7. Build public website for production
npm run build

# 8. Build admin console for production
npm run build:admin
```

---

<div align="center">

© 2026 **Kedar Tours & Travels**. Panchaxari Nagar, Gadag, Karnataka. All rights reserved.

</div>
