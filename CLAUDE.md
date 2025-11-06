# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static diet calculator web application (Calculadora de Dieta) that calculates:
- Basal Metabolic Rate (TMB)
- Total Daily Energy Expenditure (GET/TDEE)
- Macronutrient distribution (Protein, Fat, Carbohydrates)
- Daily water intake recommendations

**Deployment**: Hosted on Cloudflare Pages at https://calculadora-dieta.pages.dev

## Architecture

This is a **purely client-side static application** with no backend:
- `public/index.html` - Single-page HTML with semantic structure and SEO meta tags
- `public/script.js` - Vanilla JavaScript with metabolic calculations and DOM manipulation
- `public/styles.css` - Responsive CSS with mobile-first design
- `public/images/` - SVG assets (favicon and preview image)

### Code Structure

**HTML** (`index.html`):
- Form with inputs for: gender, weight, height, age, activity level, goal
- "Parâmetros de Ajuste" section for customizing: calorie adjustment, protein/kg, fat/kg, water/kg
- Results section with metabolic data and macronutrient cards (hidden until calculation)

**JavaScript** (`script.js`):
- Uses **Mifflin-St Jeor equation** for BMR calculation (different formulas for male/female)
- Activity factors applied to BMR to calculate TDEE
- Macros calculated based on user-defined g/kg ratios for protein and fat
- Remaining calories allocated to carbohydrates (4 kcal/g)
- Water calculation: customizable ml/kg (default 35ml/kg)
- Dynamic UI: shows/hides calorie adjustment field based on goal selection

## Key Formulas

**BMR (Mifflin-St Jeor)**:
- Male: `(13.75 × weight) + (5 × height) - (6.75 × age) + 66.5`
- Female: `(9.56 × weight) + (1.85 × height) - (4.68 × age) + 65.71`

**TDEE**: `BMR × activityFactor`

**Macronutrient Calculations**:
- Protein: `proteinPerKg × weight` (default 2g/kg)
- Fat: `fatPerKg × weight` (default 1g/kg)
- Carbs: `(dailyCalories - proteinCalories - fatCalories) / 4`

**Water**: `(weight × waterPerKg) / 1000` (default 35ml/kg)

## Development

This is a static site with no build process. Files in `public/` are served directly.

**Install dependencies**:
```bash
npm install
```

**Development server**:
```bash
npm run dev
# Runs Wrangler Pages dev server on http://localhost:8788
```

**Deploy to production**:
```bash
npm run deploy
# Deploys to Cloudflare Pages
```

**Alternative local testing**: Open `public/index.html` in a browser or use any static server:
```bash
# Using Python
python -m http.server 8000 --directory public

# Using Node.js http-server
npx http-server public -p 8000
```

**Automatic deployment**: Cloudflare Pages automatically deploys when you push to GitHub (configured in `wrangler.jsonc`)