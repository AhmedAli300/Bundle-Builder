# 🛡️ Wyze Security System — Interactive React Bundle Builder

A production-ready, data-driven **React 19** prototype featuring a multi-step bundle builder with a live review panel, Bootstrap 5 grid layout, color variant inventory tracking, step accordion navigation, client-side persistence, and an automated Vitest unit testing suite.

---

## 🌟 Key Features

- **📊 Data-Driven Architecture**: All products, pricing, discounts, descriptions, and variant swatches are loaded dynamically from `public/data/products.json` or the optional Express backend `/api/products`.
- **🎨 Independent Variant Inventory**: Each product color variant (*White*, *Grey*, *Black*) tracks its quantity independently. Selecting a color swatch binds the stepper to that active variant without clearing quantities of other variants.
- **⚡ Synchronized Steppers & Live Review Panel**: Product card steppers and review panel line items are bidirectionally synchronized. Review panel items are grouped under **CAMERAS**, **SENSORS**, **ACCESSORIES**, and **PLAN**.
- **💰 Real-Time Total & Savings Calculations**: Dynamically computes active subtotal, pre-discount compare-at total, free shipping, and real-time bundle savings callouts (`Congrats! You're saving $50.92 on your security bundle!`).
- **📱 Bootstrap 5 Responsive Grid System**:
  - **Laptops / Large Screens (`min-width: 992px`)**: Builder column takes `col-12 col-lg-8`, 1-column spacer gap (`offset-lg-1`), and Review Panel takes `col-12 col-lg-3`.
  - **Mobile Viewports (`< 992px`)**: Both sections take `col-12` (100% full width), stacking vertically.
  - **Zero Horizontal Scroll**: Strict `max-width: 100vw; overflow-x: hidden;` rules prevent any horizontal scrollbars on all screen sizes.
- **🛒 Polished Checkout Modal**: Features an interactive order receipt breakdown, itemized line items, discount calculation, payment details, and order confirmation state across all mobile and desktop viewports.
- **💾 Client-Side State Persistence**: "Save my system for later" serializes configuration into `localStorage` (`wyze_bundle_config_v1`), restoring exact selections when shoppers return.
- **🧪 Automated Unit Testing Suite**: 14 Vitest unit tests verifying steppers, product card swatch interactions, checkout modal states, variant logic, and price calculations.

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+`

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/AhmedAli300/Bundle-Builder.git
cd Bundle-Builder
npm install
```

### 2. Running Locally

#### Run Frontend App
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

#### Run Unit Tests
```bash
npm run test
```
Runs the automated test suite powered by Vitest and React Testing Library.

#### (Optional Bonus) Run Express Backend API
```bash
npm run server
```
Runs the Express API at [http://localhost:3001](http://localhost:3001). The React app will automatically fetch live data from `/api/products` and fallback to local JSON if offline.

### 3. Production Build & Linting
```bash
npm run build
npm run preview
```

---

## 📂 Project Architecture

```
bundle-builder/
├── public/
│   └── data/
│       └── products.json          # Data-driven JSON schema
├── server.js                      # Express API backend
├── src/
│   ├── components/
│   │   ├── AccordionStep.jsx      # Accordion step wrapper with navigation
│   │   ├── CheckoutModal.jsx      # Order confirmation & breakdown modal
│   │   ├── Header.jsx             # Top navigation header & action buttons
│   │   ├── LearnMoreModal.jsx     # Product detail specifications modal
│   │   ├── ProductCard.jsx        # Product card with swatches, badges & steppers
│   │   ├── ProductImage.jsx       # Custom SVG vector graphics matching Wyze hardware
│   │   ├── QuantityStepper.jsx    # Reusable quantity stepper component
│   │   ├── ReviewPanel.jsx        # Live summary review panel & guarantee seal
│   │   └── VariantSelector.jsx    # Color swatch chips selector
│   ├── hooks/
│   │   └── useBundleState.js      # Master state management custom hook
│   ├── test/
│   │   ├── CheckoutModal.test.jsx # Unit tests for checkout modal
│   │   ├── ProductCard.test.jsx   # Unit tests for product cards
│   │   ├── QuantityStepper.test.jsx # Unit tests for quantity stepper
│   │   ├── setup.js               # Vitest setup file
│   │   └── useBundleState.test.js # Unit tests for state & pricing calculations
│   ├── App.css
│   ├── App.jsx                    # Application layout root (Bootstrap grid)
│   ├── index.css                  # Design system, CSS variables & modal styles
│   └── main.jsx                   # Entry point importing Bootstrap 5 CSS
├── package.json
├── vite.config.js
└── README.md
```

---

## 💡 Decisions & Technical Tradeoffs

1. **Composite State Keys**:
   - Used composite keys (`productId:variantId` for variant products, `productId` for standard products) inside a single `quantities` map. This enables $O(1)$ lookups, clean serialization for `localStorage`, and simple calculation of step selected counts.
2. **Bootstrap 5 Integration**:
   - Integrated Bootstrap 5 Grid CSS for responsive breakpoints (`col-12 col-lg-8` and `col-12 col-lg-3 offset-lg-1`) while using custom CSS variables for design system tokens (colors, radii, cards, seals).
3. **Inline SVG Visuals**:
   - Built custom SVG visual illustrations for all products (`Wyze Cam v4`, `Cam Pan v3`, `Floodlight v2`, `Duo Doorbell`, `Battery Cam Pro`, `Motion Sensor`, `Hub`, `MicroSD`, `Cam Unlimited`) with dynamic color props (`white`, `black`, `grey`) to guarantee zero broken image links.

---

## 📄 License
MIT License. Created for frontend take-home evaluation.
