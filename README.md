# 1Fi EMI Store

A full-stack EMI-based smartphone shopping application built as part of the 1Fi SDE-1 assignment.

The application displays smartphones, product variants, pricing, product images, and multiple EMI plans using data fetched dynamically from a PostgreSQL database through REST APIs.

## Features

- Dynamic product catalog
- Product detail pages
- Multiple product variants
- Dynamic pricing and MRP
- Product images served from the application
- Multiple EMI plans per variant
- Monthly payment amount
- EMI tenure
- Interest rate
- Cashback information
- EMI plan selection
- Proceed with selected plan
- Responsive UI
- REST API backend
- PostgreSQL database
- Prisma ORM

## Products

The application currently contains:

- iPhone 17 Pro
  - Silver 256GB
  - Black 256GB

- Samsung Galaxy S24 Ultra
  - Titanium Black 256GB
  - Titanium Gray 512GB

- Google Pixel 9 Pro
  - Obsidian 128GB
  - Porcelain 256GB

Total:

- 3 products
- 6 variants
- 12 EMI plans

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- PostgreSQL
- Prisma ORM

### Development Tools

- Git
- GitHub
- npm

## Project Structure

```text
1fi-sde-assignment/
│
├── frontend/
│   ├── public/
│   │   └── images/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.js
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── prisma.config.ts
│   └── package.json
│
├── .gitignore
└── README.md
