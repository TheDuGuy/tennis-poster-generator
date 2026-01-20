# Tennis Club Poster Generator

A Next.js web application that generates 4 print-ready A4 posters for Marden Tennis Club notice boards. Committee members can access via URL, input event data, and print professional posters - some with blank spaces for handwritten updates.

## Features

- **4 Poster Types:**
  - Events Calendar (monthly events with color coding)
  - Box League Recruitment (bold promotional poster)
  - Results Grid (handwriting-optimized match results table)
  - Upcoming Matches (fixture list with completion tracking)

- **Print-Ready Output:**
  - A4 portrait format (210mm x 297mm)
  - Optimized margins (15mm top/bottom, 10mm left/right)
  - Force-print colors for accurate reproduction
  - QR codes with high error correction

- **User-Friendly:**
  - Real-time preview while editing
  - Auto-save to localStorage
  - Split-screen form and preview
  - One-click printing (Ctrl+P or Print button)

- **Design System:**
  - Professional color palette
  - Google Fonts (Montserrat + Inter)
  - Responsive layouts
  - Handwriting-optimized grids

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom Print CSS
- **Validation:** Zod schemas
- **QR Codes:** qrcode.react
- **Date Handling:** date-fns
- **Storage:** localStorage (client-side only)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone or download this repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Select a Poster Type** from the home page
2. **Fill in the Form** on the left side
   - All data auto-saves to localStorage
   - Preview updates in real-time on the right
3. **Print the Poster**
   - Click the "Print Poster" button
   - Or use Ctrl+P (Windows) / Cmd+P (Mac)
   - Choose "Print to PDF" to save as a file
   - Or print directly to paper

### Print Tips

- Use Chrome or Edge for best print results
- Select "A4" paper size in print settings
- Enable "Background graphics" in print dialog
- For handwriting posters, use matte paper and dark pens
- QR codes print at 200x200px minimum for reliability

## Poster Types

### 1. Events Calendar (Gate Board - Top)
- Monthly event listing with color-coded types
- Social, Match, League, Tournament categories
- QR code links to full club calendar
- **Update method:** Regenerate and reprint monthly

### 2. Box League Recruitment (Gate Board - Bottom)
- Bold headline and benefits list
- Large QR code for sign-ups
- Static template design
- **Update method:** Reprint once per season

### 3. Results Grid (Courtside - Top)
- Pre-designed table for match results
- Handwriting-optimized spacing (20mm rows)
- Light grey grid (60% opacity)
- **Update method:** Print once, handwrite weekly

### 4. Upcoming Matches (Courtside - Bottom)
- Fixture list with blank player spaces
- Date fields and completion checkboxes
- 30mm row height for readability
- **Update method:** Print per round, handwrite details

## Project Structure

```
tennis-poster-generator/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Landing page (poster selector)
│   ├── layout.tsx               # Root layout with fonts
│   ├── globals.css              # Tailwind + base styles
│   └── posters/                 # Poster pages
│       ├── events-calendar/
│       ├── box-league-recruitment/
│       ├── results-grid/
│       └── upcoming-matches/
├── components/
│   ├── posters/                 # Printable poster components
│   ├── forms/                   # Input forms
│   └── shared/                  # Reusable components
│       ├── PosterHeader.tsx
│       ├── QRCodeGenerator.tsx
│       └── PrintButton.tsx
├── lib/
│   ├── constants/colors.ts      # Design system
│   ├── schemas/                 # Zod validation
│   ├── hooks/useLocalStorage.ts # State persistence
│   └── utils/date-helpers.ts    # Date formatting
└── styles/print-base.css        # Global print CSS
```

## localStorage Keys

Data is saved per poster type:
- `tennis-poster-events-calendar`
- `tennis-poster-box-league`
- `tennis-poster-results-grid`
- `tennis-poster-upcoming-matches`

## Browser Compatibility

Tested and optimized for:
- Chrome 90+ (recommended)
- Edge 90+
- Firefox 88+
- Safari 14+

## Future Enhancements

- Puppeteer API for server-side PDF generation
- Template library with seasonal designs
- Export/import JSON for backup
- Multi-club support with custom branding
- Calendar integration (Google Calendar sync)
- Version history and collaboration

## License

MIT

## Support

For issues or questions, please contact the club committee.
