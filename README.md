# Wyze Security System — Interactive React Bundle Builder

A production-grade, multi-step bundle builder with a live review panel, data-driven architecture, color variant inventory tracking, step accordion navigation, client-side persistence, Bootstrap 5 grid layout, and automated unit test suite.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+`

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone <your-repo-url>
cd bundle-builder
npm install
```

### 2. Running Locally

#### Running the Frontend Prototype
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

#### Running Unit Tests
```bash
npm run test
```
Runs 11 automated Vitest unit tests verifying steppers, product card interactions, variant tracking, state logic, and pricing calculations.

#### (Bonus) Running the Express Backend API
The application is designed to be **data-driven**. An optional Express backend server is provided in `server.js`:
```bash
npm run server
```
The API server runs at [http://localhost:3001](http://localhost:3001), serving product catalog schemas from `/api/products` and receiving bundle saves at `/api/bundle/save`.
*(If the backend server is not running, the React application automatically fallbacks seamlessly to the local JSON dataset in `public/data/products.json`).*

### 3. Production Build & Linting
```bash
npm run build
npm run preview
```

---

## 🛠️ Key Features & Responsive Grid Architecture

### 1. Bootstrap 5 Grid System (`col-lg-8` & `col-lg-3 offset-lg-1`)
- **Large Screens & Laptops (`min-width: 992px`)**:
  - **Left Builder Column**: Takes `col-lg-8` (8 grid columns).
  - **Grid Gap / Offset**: Uses `offset-lg-1` (1 column spacer gap).
  - **Right Review Column**: Takes `col-lg-3` (3 grid columns). Total: `8 + 1 + 3 = 12 columns`.
- **Mobile Viewports (`< 992px`)**:
  - Both columns take `col-12` (100% full width), stacking cleanly without overflow.
- **Zero Horizontal Scroll**: Strict `max-width: 100vw; overflow-x: hidden;` rules prevent any unwanted horizontal scrollbars.

### 2. Data-Driven Architecture
- All products, pricing, discounts, descriptions, and variant swatches are loaded dynamically from `public/data/products.json` or the Express backend `/api/products`.

### 3. Advanced Color Variant Selector Logic
- **Independent Variant Inventory**: Each product color variant (e.g., *Wyze Cam v4* in *White*, *Grey*, or *Black*) maintains its own distinct quantity counter.
- **Bound Stepper Control**: Selecting a color chip binds the product card's quantity stepper directly to that active variant.
- **Line Item Separation**: The Review Panel displays every variant with quantity > 0 as its own independent line item.

### 4. Client-Side Persistence ("Save my system for later")
- Clicking **"Save my system for later"** serializes configuration (`quantities`, `selectedVariants`, `openStepId`) into `localStorage` (`wyze_bundle_config_v1`).

---

## 🧪 Unit Test Suite (`npm run test`)

The project includes an automated Unit Testing suite built with **Vitest** and **React Testing Library**:

- `QuantityStepper.test.jsx`: Verifies increment/decrement buttons, min/max limits, and input value changes.
- `ProductCard.test.jsx`: Tests product title, discount badge rendering, swatch selection events, and selected card styling highlights.
- `useBundleState.test.js`: Verifies initial seed data, independent variant quantity tracking, calculation of subtotal / compare-at pricing / bundle savings, and `localStorage` persistence.

---

## 📄 License
MIT License. Built for frontend take-home evaluation.
