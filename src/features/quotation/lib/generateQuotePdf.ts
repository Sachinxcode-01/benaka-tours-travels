import type { QuotationDetails } from "../types/quotation";
import { formatDate } from "../../../utils/formatters";

export function generateQuoteId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `KTT-QUOTE-${year}-${randomNum}`;
}

export function generatePrintableQuoteHtml(details: QuotationDetails): string {
  const formattedGeneratedDate = formatDate(details.generatedAt) || details.generatedAt;
  const formattedPickupDate = formatDate(details.pickupDate) || details.pickupDate;
  const formattedReturnDate = details.returnDate ? formatDate(details.returnDate) : "Single Day / One-Way";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Quotation Receipt - ${details.quoteId} | Kedar Tours & Travels</title>
  <style>
    @media print {
      @page { margin: 12mm; size: A4; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background-color: #ffffff;
      color: #1e293b;
      line-height: 1.5;
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }

    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 3px solid #d4af37;
      padding-bottom: 16px;
      margin-bottom: 20px;
    }

    .brand-title {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
    }

    .brand-subtitle {
      font-size: 11px;
      color: #d4af37;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 2px;
    }

    .company-details {
      font-size: 11px;
      color: #475569;
      margin-top: 6px;
    }

    .quote-badge {
      text-align: right;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
    }

    .quote-id {
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
      font-mono: monospace;
    }

    .badge-label {
      font-size: 10px;
      text-transform: uppercase;
      color: #64748b;
      font-weight: 600;
    }

    .section-title {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-left: 3px solid #d4af37;
      padding-left: 8px;
      margin: 18px 0 10px 0;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 14px;
      font-size: 12px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 3px 0;
      border-bottom: 1px dashed #e2e8f0;
    }
    .info-row:last-child { border-bottom: none; }

    .info-label { font-weight: 600; color: #475569; }
    .info-value { font-weight: 700; color: #0f172a; text-align: right; }

    .table-container {
      margin-top: 12px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }

    th {
      background: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 8px 12px;
      font-weight: 600;
      font-size: 11px;
      text-transform: uppercase;
    }

    td {
      padding: 8px 12px;
      border-bottom: 1px solid #e2e8f0;
    }

    tr:last-child td { border-bottom: none; }

    .total-row {
      background: #fffbeb;
      font-weight: 800;
      font-size: 14px;
      color: #92400e;
    }

    .policy-box {
      background: #f1f5f9;
      border-radius: 8px;
      padding: 12px;
      font-size: 11px;
      color: #334155;
      margin-top: 20px;
    }

    .policy-title {
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
    }

    .footer-note {
      text-align: center;
      font-size: 11px;
      color: #64748b;
      margin-top: 24px;
      border-top: 1px solid #e2e8f0;
      padding-top: 12px;
    }

    .print-actions {
      margin-bottom: 16px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .btn {
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      border: none;
    }
    .btn-primary { background: #d4af37; color: #000; }
    .btn-secondary { background: #e2e8f0; color: #334155; }
  </style>
</head>
<body>
  <div class="print-actions no-print">
    <button class="btn btn-secondary" onclick="window.close()">Close Window</button>
    <button class="btn btn-primary" onclick="window.print()">🖨️ Print / Save PDF</button>
  </div>

  <div class="header-container">
    <div>
      <div class="brand-title">KEDAR TOURS & TRAVELS</div>
      <div class="brand-subtitle">Premier 100% Chauffeur-Driven Vehicle Rental</div>
      <div class="company-details">
        📍 Panchaxari Nagar 5th Cross, Gadag, Karnataka 582101<br/>
        📞 Call: +91 98807 62623 | 💬 WhatsApp: +91 98807 62623<br/>
        ✉️ sachiii8827@gmail.com | 🌐 kedartravels.in
      </div>
    </div>
    <div class="quote-badge">
      <div class="badge-label">Official Quotation / Estimate</div>
      <div class="quote-id">${details.quoteId}</div>
      <div class="badge-label" style="margin-top:4px;">Date: ${formattedGeneratedDate}</div>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="section-title" style="margin-top:0;">Customer Details</div>
      <div class="info-row">
        <span class="info-label">Customer Name</span>
        <span class="info-value">${details.customerName || "Valued Customer"}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Mobile Number</span>
        <span class="info-value">${details.customerPhone || "Provided on booking"}</span>
      </div>
      ${details.customerEmail ? `
      <div class="info-row">
        <span class="info-label">Email</span>
        <span class="info-value">${details.customerEmail}</span>
      </div>` : ''}
      <div class="info-row">
        <span class="info-label">Pickup Address</span>
        <span class="info-value">${details.pickupAddress || details.pickupLocation}</span>
      </div>
    </div>

    <div class="card">
      <div class="section-title" style="margin-top:0;">Journey Specifications</div>
      <div class="info-row">
        <span class="info-label">Route</span>
        <span class="info-value">${details.pickupLocation} ➔ ${details.destination || "Local Travel"}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Trip & Journey Type</span>
        <span class="info-value">${details.tripType.toUpperCase()} (${details.journeyType})</span>
      </div>
      <div class="info-row">
        <span class="info-label">Pickup Schedule</span>
        <span class="info-value">${formattedPickupDate} at ${details.pickupTime}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Return Date</span>
        <span class="info-value">${formattedReturnDate}</span>
      </div>
    </div>
  </div>

  <div class="section-title">Assigned Vehicle Category</div>
  <div class="card">
    <div class="info-row">
      <span class="info-label">Vehicle Selected</span>
      <span class="info-value">${details.vehicle.name} (${details.vehicle.category})</span>
    </div>
    <div class="info-row">
      <span class="info-label">Seating & Fuel</span>
      <span class="info-value">${details.vehicle.seats} Seater | ${details.vehicle.fuel} | ${details.acPreference ? 'AC Included' : 'Non-AC'}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Passenger & Luggage</span>
      <span class="info-value">${details.passengers} Passengers | ${details.luggage} Bags</span>
    </div>
    <div class="info-row">
      <span class="info-label">Service Type</span>
      <span class="info-value">👨‍✈️ 100% Certified Uniformed Chauffeur</span>
    </div>
  </div>

  <div class="section-title">Estimated Tariff & Fare Breakdown</div>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Metric / Base</th>
          <th style="text-align:right;">Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${details.fareBreakdown.estimatedKm ? `
        <tr>
          <td>Estimated Trip Distance</td>
          <td>~${details.fareBreakdown.estimatedKm} KM</td>
          <td style="text-align:right;">-</td>
        </tr>` : ''}
        ${details.fareBreakdown.ratePerKm ? `
        <tr>
          <td>Base Tariff Rate</td>
          <td>₹${details.fareBreakdown.ratePerKm} / KM</td>
          <td style="text-align:right;">Included</td>
        </tr>` : ''}
        ${details.fareBreakdown.driverAllowance ? `
        <tr>
          <td>Driver Daily Allowance (Bhatta)</td>
          <td>Per Day Chauffeur Fee</td>
          <td style="text-align:right;">₹${details.fareBreakdown.driverAllowance.toLocaleString("en-IN")}</td>
        </tr>` : ''}
        ${details.fareBreakdown.estimatedTolls ? `
        <tr>
          <td>Estimated Tolls & Permit Taxes</td>
          <td>Actuals / Estimated</td>
          <td style="text-align:right;">₹${details.fareBreakdown.estimatedTolls.toLocaleString("en-IN")}</td>
        </tr>` : ''}
        <tr class="total-row">
          <td colspan="2">ESTIMATED TOTAL FARE</td>
          <td style="text-align:right;">₹${details.fareBreakdown.totalEstimatedAmount.toLocaleString("en-IN")}*</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="font-size:10px; color:#64748b; margin-top:4px;">
    *Estimated quote. Final bill calculated on actual distance (KM) and duration. State entry permit taxes & parking fees payable directly at actuals unless specified.
  </div>

  <div class="policy-box">
    <div class="policy-title">🛡️ Core Operating Terms & Business Guarantees</div>
    • <strong>100% Chauffeur-Driven:</strong> Vehicles are operated exclusively by verified professional drivers. Self-drive is strictly NOT provided.<br/>
    • <strong>Zero Customer Liability:</strong> Driver takes full operational responsibility for vehicle condition, road maintenance, and navigation.<br/>
    • <strong>24/7 Doorstep Dispatch:</strong> Clean, sanitized vehicle dispatched directly to your specified pickup address in Gadag or surrounding cities.
  </div>

  <div class="footer-note">
    Thank you for choosing <strong>Kedar Tours & Travels</strong>. For instant confirmation or modifications, call <strong>+91 98807 62623</strong>.
  </div>

  <script>
    window.onload = function() {
      // Auto-trigger print dialog if opened in a dedicated popup window
      if (window.opener) {
        setTimeout(function() { window.print(); }, 500);
      }
    };
  </script>
</body>
</html>
  `;
}

export function printQuotation(details: QuotationDetails): void {
  const printWindow = window.open("", "_blank", "width=850,height=900");
  if (!printWindow) {
    alert("Please allow popups for this site to generate printable PDF quotes.");
    return;
  }

  const html = generatePrintableQuoteHtml(details);
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
