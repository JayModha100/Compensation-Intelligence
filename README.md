# Compensation Intelligence System

A compensation intelligence platform for collecting, normalizing, comparing, and analyzing salary data across companies and levels.

This project is intentionally structured around comparable compensation records rather than raw salary listings. The goal is to make compensation data decision-ready: normalized by company, level, location, and compensation components.

## Project Overview

The system is split into two parts:

- `Server`: Express + MongoDB API for compensation records, comparison workflows, and company insights.
- `Client`: React + Vite dashboard for filtering, comparing, and reviewing compensation data.

The data model treats compensation as a structured record with base salary, bonus, stock, total compensation, company normalization, and level metadata. That makes cross-company analysis possible and reduces the ambiguity that comes from title-only salary datasets.

## Key Features

- Company normalization to merge variants such as `Google`, `Google Inc.`, and `Google LLC`.
- Total compensation calculation from base salary, bonus, and stock.
- Duplicate detection to reduce repeated entries.
- Server-side filtering by company, level, location, and role family.
- Comparison workflow for side-by-side compensation review.
- Company insights with median total compensation and level distribution.
- Clean table-based presentation of compensation records.

## Architecture Overview

### Backend

- Express REST API
- MongoDB via Mongoose
- Validation and normalization in controller logic
- Query filtering and sorting on the server
- Global error handling with JSON responses

### Frontend

- React app built with Vite
- Component-based dashboard for comparison, insights, filters, and tables
- Direct API calls to the backend
- Plain CSS styling only

### Data Flow

1. User enters or filters compensation data in the UI.
2. The frontend sends requests to the backend API.
3. The backend normalizes company names, calculates total compensation, and applies filters.
4. The UI renders comparison cards, insights cards, or tabular compensation results.

## Backend APIs

Base URL: `http://localhost:5000/api/compensations`

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/` | Create a compensation entry |
| `GET` | `/` | List compensation entries with filtering, pagination, and sorting |
| `GET` | `/compare` | Compare two companies or levels |
| `GET` | `/insights/:company` | Fetch company insights using a normalized company name |
| `GET` | `/company/:company` | Alias for company insights |

### Example Query Parameters

#### `GET /`

- `company`
- `level`
- `location`
- `roleFamily`
- `page`
- `limit`
- `sortBy`
- `sortOrder`

#### `GET /compare`

- `type=company|level`
- `first`
- `second`
- `level` optional

#### `GET /insights/:company`

- `company` is taken from the route path
- returns matching entries, median total compensation, and level distribution

## Frontend Functionality

The dashboard currently includes:

- comparison form for two companies and optional level
- company insights button for loading structured insights on demand
- filters for company, level, location, and role family
- compensation table with loading, empty, and error states
- comparison card for side-by-side results
- company insights card for median compensation and level distribution

The UI is intentionally simple. It is designed to surface structured information quickly rather than present a marketing-style landing page.

## Setup Instructions

### Prerequisites

- Node.js 18+ recommended
- MongoDB running locally or available through a connection string

### Install dependencies

From the workspace root:

```powershell
Set-Location 'c:\Users\starl\Documents\trackC\Server'
npm install

Set-Location 'c:\Users\starl\Documents\trackC\Client'
npm install
```

## Environment Variables

Create a `Server/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mydb
```

Notes:

- `MONGODB_URI` is required.
- `PORT` is optional.
- The server also accepts `MONGO_URI` as a fallback if needed.

## How to Run the Backend

```powershell
Set-Location 'c:\Users\starl\Documents\trackC\Server'
npm run dev
```

Production-style start:

```powershell
Set-Location 'c:\Users\starl\Documents\trackC\Server'
npm start
```

The backend health check is available at:

```text
http://localhost:5000/health
```

## How to Run the Frontend

```powershell
Set-Location 'c:\Users\starl\Documents\trackC\Client'
npm run dev
```

Build for production:

```powershell
Set-Location 'c:\Users\starl\Documents\trackC\Client'
npm run build
```

The frontend runs on the Vite dev server, usually at:

```text
http://localhost:5173/
```

## Edge Cases Handled

- Missing required compensation fields during creation.
- Negative salary, bonus, stock, or experience values.
- Duplicate or near-duplicate compensation entries.
- Company name variants through normalization.
- Empty compensation collections.
- No matches for comparison requests.
- No matches for company insights requests.
- Invalid or blank company input for insights.
- Pagination and filter defaults on list requests.
- Missing bonus or stock values defaulting to zero in total compensation.

## Product Philosophy: Levels Over Titles

The system is built around the idea that titles are too inconsistent to serve as a reliable comparison axis.

A title like `Senior Engineer` does not mean the same thing across companies. A compensation intelligence product needs a more stable unit of comparison, and level is the closest practical abstraction. Levels make compensation data more queryable, comparable, and useful for decision-making.

## Tradeoffs and Implementation Decisions

- Reliability was prioritized over feature breadth.
- Company normalization happens on the server so comparison and filtering logic stay consistent.
- Total compensation is computed centrally instead of trusting raw inputs.
- Duplicate detection is deliberately simple and explicit.
- Comparison and insights are first-class workflows because raw listings alone are not enough.
- The UI stays plain and readable instead of adopting a heavy design system.
- The project favors structured, normalized data over large but noisy datasets.

## Summary

This project is a compensation intelligence platform, not a salary listing site.

The implementation is centered on structured, comparable, decision-ready compensation data so users can evaluate companies and levels with a reliable workflow instead of relying on noisy title-based listings.
