# Kedar Tours & Travels — Quotation & Fare Estimation Engine

This document outlines the architecture, data contracts, and implementation details for the **Kedar Tours & Travels** branded quotation and estimation system.

---

## 1. Overview

The quotation engine allows both prospective customers (via the public website) and dispatch operators (via the admin portal) to generate official, itemized estimate receipts with unique reference IDs for chauffeur-driven trips.

---

## 2. Identifier Format

Quotations are assigned a unique, trackable identifier formatted as:

```text
KTT-QUOTE-[YYYY]-[XXXX]
```
- `KTT`: Prefix for **Kedar Tours & Travels**
- `QUOTE`: Document type identifier
- `[YYYY]`: Four-digit calendar year (e.g. `2026`)
- `[XXXX]`: Four-digit random numeric salt (e.g. `4819`)

---

## 3. Data Structure (`QuotationDetails`)

```typescript
export interface QuotationDetails {
  quoteId: string;
  generatedAt: string; // ISO 8601 string
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  tripType: string;    // 'OUTSTATION' | 'LOCAL' | 'AIRPORT' | 'TEMPLE'
  journeyType: string; // 'One-Way' | 'Round Trip'
  passengers: number;
  luggage: number;
  acPreference: boolean;
  vehicle: {
    id: string;
    name: string;
    category: string;
    seats: number;
    fuel: string;
  };
  fareBreakdown: {
    estimatedKm?: number;
    ratePerKm?: number;
    driverAllowance?: number;
    estimatedTolls?: number;
    totalEstimatedAmount: number;
  };
}
```

---

## 4. Integration Touchpoints

1. **`FareEstimatorWidget`** (`src/features/fare-calculator/`):
   - Computes distance-based estimates for Outstation, Airport Transfer, and Temple routes.
   - Provides an `"Export Branded PDF Quote"` button that populates a `QuotationDetails` object and opens `QuotationReceiptModal`.

2. **`BookingWizardModal`** (`src/features/booking/`):
   - 4-step wizard that captures full trip itinerary and vehicle selection.
   - Allows previewing, printing, and downloading the estimate before final WhatsApp dispatch.

3. **`AdminDashboardView`** (`src/features/admin/` & `admin-website/`):
   - Adds an instant `"PDF Quote"` action button to customer inquiry rows.
   - Matches inquired vehicle against live fleet inventory to generate instant client-ready quotes.

---

## 5. Printing & PDF Generation

- Implemented in `src/features/quotation/lib/generateQuotePdf.ts`.
- Uses a standalone print-optimized HTML template (`@media print` rules, A4 layout, zero external dependencies).
- Can be saved directly as PDF via the browser's native print dialogue (`window.print()`).

---

© 2026 **Kedar Tours & Travels**. Panchaxari Nagar, Gadag, Karnataka.
