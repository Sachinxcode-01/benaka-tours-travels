import fs from "fs";
import path from "path";

const vehicles = [
  {
    file: "swift-dzire.svg",
    name: "Maruti Swift Dzire",
    category: "Sedan",
    seats: "5 Seats",
  },
  {
    file: "hyundai-aura.svg",
    name: "Hyundai Aura",
    category: "Sedan",
    seats: "5 Seats",
  },
  {
    file: "maruti-ertiga.svg",
    name: "Maruti Ertiga",
    category: "MUV",
    seats: "7 Seats",
  },
  {
    file: "innova-crysta.svg",
    name: "Toyota Innova Crysta",
    category: "MUV",
    seats: "8 Seats",
  },
  {
    file: "force-toofan.svg",
    name: "Force Toofan Cruiser",
    category: "MUV",
    seats: "11 Seats",
  },
  {
    file: "mahindra-scorpio.svg",
    name: "Mahindra Scorpio",
    category: "SUV",
    seats: "7 Seats",
  },
  {
    file: "mahindra-bolero.svg",
    name: "Mahindra Bolero",
    category: "SUV",
    seats: "7 Seats",
  },
  {
    file: "maruti-brezza.svg",
    name: "Maruti Brezza",
    category: "SUV",
    seats: "5 Seats",
  },
  {
    file: "grand-vitara.svg",
    name: "Maruti Grand Vitara",
    category: "SUV",
    seats: "5 Seats",
  },
  {
    file: "mahindra-thar.svg",
    name: "Mahindra Thar",
    category: "SUV",
    seats: "5 Seats",
  },
  {
    file: "tempo-traveller.svg",
    name: "Tempo Traveller",
    category: "Minibus",
    seats: "13 Seats",
  },
  {
    file: "25-seater-bus.svg",
    name: "25-Seater Bus",
    category: "Heavy Coach",
    seats: "25 Seats",
  },
];

const targetDir = path.resolve(
  process.cwd(),
  "public/assets/vehicles/placeholders",
);

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

vehicles.forEach((v) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#07080B"/>
      <stop offset="50%" stop-color="#0F1117"/>
      <stop offset="100%" stop-color="#050608"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#F1D58A"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg)"/>
  <rect x="15" y="15" width="570" height="370" rx="16" fill="none" stroke="#D4AF37" stroke-width="2" opacity="0.3"/>
  <circle cx="300" cy="180" r="80" fill="#D4AF37" opacity="0.08"/>
  <g fill="none" stroke="url(#gold)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="translate(260, 140) scale(1.6)">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.2 1 12.1 1 13v3c0 .6.4 1 1 1h2"/>
    <circle cx="7" cy="17" r="2"/>
    <circle cx="17" cy="17" r="2"/>
  </g>
  <text x="300" y="270" font-family="Outfit, sans-serif" font-size="24" font-weight="bold" fill="#F1D58A" text-anchor="middle">${v.name}</text>
  <text x="300" y="300" font-family="Outfit, sans-serif" font-size="14" font-weight="600" fill="#94A3B8" text-anchor="middle">${v.category} • ${v.seats} • 100% Chauffeur Included</text>
  <rect x="220" y="325" width="160" height="28" rx="14" fill="#D4AF37" opacity="0.15" stroke="#D4AF37" stroke-width="1"/>
  <text x="300" y="344" font-family="Outfit, sans-serif" font-size="11" font-weight="bold" fill="#D4AF37" text-anchor="middle">BENAKA RENTAL FLEET</text>
</svg>`;

  fs.writeFileSync(path.join(targetDir, v.file), svg, "utf8");
});

console.log("Successfully generated 12 vehicle SVG placeholders.");
