// scripts/make-campanile.js
// Generates a simple Campanile-style line art SVG into /public/images/campanile.svg

const fs = require("fs");
const path = require("path");

const outPath = path.join(process.cwd(), "public", "images", "campanile.svg");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="420" height="1200" viewBox="0 0 420 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
    <!-- Spire -->
    <path d="M210 60 L245 125 L210 105 L175 125 Z" />
    <path d="M210 40 L210 90" />
    <path d="M200 55 L220 55" />

    <!-- Belltower crown -->
    <path d="M140 165 H280" />
    <path d="M155 165 V235" />
    <path d="M265 165 V235" />
    <path d="M155 235 H265" />

    <!-- Arches / openings -->
    <path d="M175 235 V185" />
    <path d="M210 235 V185" />
    <path d="M245 235 V185" />
    <path d="M165 185 Q175 165 185 185" />
    <path d="M200 185 Q210 165 220 185" />
    <path d="M235 185 Q245 165 255 185" />

    <!-- Roof / cap -->
    <path d="M155 165 L210 115 L265 165" />
    <path d="M180 148 L210 125 L240 148" />

    <!-- Shaft outline -->
    <path d="M160 235 V1120" />
    <path d="M260 235 V1120" />
    <path d="M160 1120 H260" />

    <!-- Inner shaft detail -->
    <path d="M190 265 V1120" />
    <path d="M230 265 V1120" />

    <!-- Window bands -->
    <path d="M160 330 H260" opacity="0.9"/>
    <path d="M160 430 H260" opacity="0.9"/>
    <path d="M160 530 H260" opacity="0.9"/>
    <path d="M160 630 H260" opacity="0.9"/>
    <path d="M160 730 H260" opacity="0.9"/>
    <path d="M160 830 H260" opacity="0.9"/>
    <path d="M160 930 H260" opacity="0.9"/>
    <path d="M160 1030 H260" opacity="0.9"/>

    <!-- Small vertical slits -->
    ${Array.from({ length: 10 }).map((_, i) => {
      const y1 = 360 + i * 70;
      const y2 = y1 + 30;
      return `<path d="M205 ${y1} V${y2}" opacity="0.75"/>`;
    }).join("\n    ")}
    ${Array.from({ length: 10 }).map((_, i) => {
      const y1 = 360 + i * 70;
      const y2 = y1 + 30;
      return `<path d="M215 ${y1} V${y2}" opacity="0.75"/>`;
    }).join("\n    ")}

    <!-- Base plinth -->
    <path d="M140 1120 H280" />
    <path d="M150 1160 H270" />
    <path d="M160 1120 V1160" />
    <path d="M260 1120 V1160" />
  </g>
</svg>
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, svg, "utf8");

console.log(`✅ Wrote ${outPath}`);