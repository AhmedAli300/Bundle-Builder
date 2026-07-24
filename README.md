# 🛡️ Wyze Security System — Interactive React Bundle Builder

A production-ready, data-driven **React 19** prototype featuring a multi-step bundle builder with a live review panel, color variant inventory tracking, client-side persistence, responsive design, and automated unit testing.

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+` or `v20+`
- npm `v9+`

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/AhmedAli300/Bundle-Builder.git
cd Bundle-Builder
npm install
```

---

### Run Frontend

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

### Run Unit Tests

```bash
npm run test
```

Runs the automated test suite powered by **Vitest** and **React Testing Library**.

---

### Run Express Backend API (For Test Only)

```bash
npm run server
```

Runs the Express API at:

```
http://localhost:3001
```

The React application automatically fetches product data from the API and falls back to the local JSON dataset if the server is unavailable.

---

## 🌟 Key Features

- Multi-step accordion bundle builder.
- Live review panel with synchronized quantity steppers.
- Independent quantity tracking for each product color variant.
- Real-time pricing, discount, and savings calculations.
- Responsive layout for desktop, tablet, and mobile devices.
- Client-side persistence using `localStorage`.
- Data-driven product catalog powered by JSON or Express API.
- Automated unit testing using Vitest and React Testing Library.

---
