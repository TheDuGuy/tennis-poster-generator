# Quick Start Guide

## Your Tennis Club Poster Generator is Ready! 🎾

The application is fully functional and running at **http://localhost:3000**

## What You Have

✅ **4 Complete Poster Types:**
1. Events Calendar - Monthly event listing with QR codes
2. Box League Recruitment - Bold promotional poster
3. Results Grid - Handwriting-optimized match results
4. Upcoming Matches - Fixture list with tracking

✅ **Features:**
- Real-time preview while editing
- Auto-save to browser localStorage
- Print-ready A4 format
- Professional design with club branding
- QR code generation
- Responsive layouts

## Next Steps

### 1. View the Application
The dev server is already running at:
```
http://localhost:3000
```
Open this in your browser to see the landing page.

### 2. Try Creating a Poster
1. Click on any poster type card
2. Fill in the form on the left
3. See live preview on the right
4. Click "Print Poster" or press Ctrl+P (Cmd+P on Mac)

### 3. Print Tips
- Use Chrome or Edge for best results
- Select A4 paper size
- Enable "Background graphics" in print settings
- Choose "Save as PDF" to create a file

### 4. Customize for Your Club
You can easily customize the default values in each poster page:
- `/app/posters/events-calendar/page.tsx`
- `/app/posters/box-league-recruitment/page.tsx`
- `/app/posters/results-grid/page.tsx`
- `/app/posters/upcoming-matches/page.tsx`

Look for the `defaultData` object and update:
- Club website URL
- Contact email/phone
- Default event names
- WhatsApp group name

### 5. Deploy to Production

**Option A: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Option B: Build and Host Anywhere**
```bash
# Build the app
npm run build

# Start production server
npm start
```

The build output will be in the `.next` folder.

## Data Storage

All poster data is saved in the browser's localStorage:
- Data persists across sessions
- No server required
- Each poster type has its own storage key
- Clear browser data to reset

## Troubleshooting

**Port 3000 already in use?**
```bash
# Kill the current dev server
pkill -f "next dev"

# Or use a different port
npm run dev -- -p 3001
```

**Need to restart the dev server?**
```bash
npm run dev
```

**ESLint errors?**
```bash
npm run lint
```

## File Structure Reference

```
Key Files:
├── app/page.tsx                 # Landing page (start here)
├── app/posters/*/page.tsx       # Poster editor pages
├── components/posters/          # Poster designs
├── components/forms/            # Edit forms
├── lib/constants/colors.ts      # Design system colors
└── README.md                    # Full documentation
```

## Support

- Full documentation: See README.md
- Issues: Check console for errors (F12 in browser)
- Reset data: Clear browser localStorage
- Print issues: Try Chrome/Edge, ensure "Background graphics" is enabled

---

**Ready to create your first poster?** Open http://localhost:3000 and get started! 🎾
