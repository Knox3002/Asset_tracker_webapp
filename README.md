##Asset Tracker WebApp


Live Demo

A web application to manage, track, and monitor assets efficiently. Built with Next.js, this project enables you to register assets, view status, and maintain audit logs via a modern web interface and RESTful APIs.

Table of Contents

Features

Technologies

Architecture & Folder Structure

Installation & Setup

Usage

API Endpoints

Configuration

Testing

Deployment

Contributing

License

Contact / Support

Features

Add, update, delete, and view tracked assets

Asset metadata (e.g. name, type, serial number, status)

Audit trail / history of changes

User authentication and access control (if applicable)

Real-time or periodic status updates (if implemented)

Responsive UI and RESTful backend

(Customize this section to reflect your implemented features precisely.)

Technologies

Frontend / Fullstack Framework: Next.js 
GitHub

Styling: (e.g. CSS, Tailwind CSS, styled-components — specify what you used)

Backend / API Routes: pages/api (Next.js API routes) 
GitHub

Database / Storage: (e.g. PostgreSQL, MongoDB, SQLite, etc. — specify)

Others / Utilities: (e.g. Axios / Fetch, Authentication libraries, State management, etc.)

Architecture & Folder Structure

A high-level view of the key directories:

.
├── pages
│   ├── api         # API route handlers
│   ├── index.js    # Main landing / dashboard page
│   └── … (other pages)
├── public          # Public assets (images, favicon, etc.)
├── styles          # CSS / styling files
├── utils           # Utility functions, helpers
├── package.json
├── next.config.mjs
└── README.md


All API endpoints live under pages/api/.

React pages and components live under pages/ (or a subfolder for components).

Utility modules (e.g. for validation, formatting) are under utils/.

Installation & Setup
Prerequisites

Node.js (v16+ recommended)

npm or yarn or pnpm

Database (if external)

Environment variables (see Configuration below)

Steps
# Clone the repository
git clone https://github.com/Knox3002/Asset_tracker_webapp.git
cd Asset_tracker_webapp

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Set up environment variables (see Configuration)

# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev


Then open http://localhost:3000
 in your browser.

Usage

Navigate to the web interface

Log in (if authentication is implemented)

Create new assets, update existing ones, delete or archive as needed

View change history or audit logs (if available)

Search, filter, or classify assets

(Add screenshots or GIFs here if available to illustrate key flows.)

API Endpoints
Method	URL Path	Description
GET	/api/assets	Fetch list of assets
POST	/api/assets	Create a new asset
GET	/api/assets/[id]	Fetch a single asset
PUT	/api/assets/[id]	Update an asset
DELETE	/api/assets/[id]	Delete / archive an asset
…	…	…

(Adjust and expand based on your actual routes.)

Configuration

Create a .env.local file (or the appropriate env file) in the project root. Example:

DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000/api
# Add other environment-specific settings


Ensure that sensitive secrets (e.g. database credentials, JWT keys) are never committed to the repo.

Testing

If you have tests (unit / integration), document how to run them:

npm run test
# or
yarn test
