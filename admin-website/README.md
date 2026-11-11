# Kedar Admin Portal — Operations & Fleet Management Console

This directory contains the standalone administrative dashboard for **Kedar Tours & Travels**, built with **React 19 + TypeScript + Vite + Tailwind CSS v4**.

---

## 📌 Capabilities

1. **Fleet Inventory Management**: Real-time vehicle status controls (Available, In Service, Maintenance, Booked), capacity editing, and dynamic rate adjustments.
2. **Customer Inquiry Tracker**: Instant review of incoming ride requests with direct WhatsApp reply action links.
3. **Official PDF Quotation Generator**: Generate, preview, and print official branded PDF estimate receipts (`KTT-QUOTE-YYYY-XXXX`) directly from inquiry rows.
4. **Tariff Rate Editor**: Manage per-km rates, driver allowances, and local package pricing across Sedans, MUVs, SUVs, and Tour Coaches.
5. **Auditing & Settings Export**: Export JSON snapshots of fleet configurations and customer inquiries for backup.

---

## 🚀 Running the Admin Portal

From the repository root:

```bash
# Start admin dev server
npm run dev:admin

# Build admin portal for production
npm run build:admin
```

Direct directory navigation:

```bash
cd admin-website
npm install
npm run dev
```

---

## 🔐 Administrative Access

- **Default Demo Passcode**: `1234` or `kedar`
- Authentication state is securely retained in local session storage.

---

© 2026 **Kedar Tours & Travels**. Panchaxari Nagar, Gadag, Karnataka.

