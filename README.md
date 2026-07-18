# TaskFlow - Premium Todo List Management Web Application

TaskFlow is a professional, responsive, and modern task board and metrics dashboard. Built with a premium SaaS-style interface featuring soft shadows, glassmorphism, custom gradients, and Framer Motion micro-animations.

The application operates as a full-stack JavaScript monolithic service, hosting the **React client** and the **Express REST API** together.

---

## ✨ Features

- **Full CRUD operations**: Create, Read, Update, and Delete tasks in real-time.
- **SaaS-Style UX**: Glassmorphism cards, blurred-background modals, custom gradients, hover scales, and smooth page transition animations.
- **Status & Priority Badges**: Visual indicators for task urgency (Low, Medium, High) and status (Pending, Completed).
- **Date Alerts**: Automatic indicators highlighting overdue tasks in red with warning alerts.
- **Unified Dashboard**: Metrics detailing total tasks, pending backlogs, completed items, overdue items, and a dynamic circular completion progress widget.
- **Productivity Analytics**: Clean visual breakdowns of task density by category and priority counts using custom responsive charts.
- **Instant Search & Filters**: Search dynamically by title or category, and filter by status, priority, or tags.
- **Interactive Dark Mode**: Full selector-based dark theme toggling with automated local storage state synchronization.
- **Troubleshooting Screen**: Automatic fallback to a server connection recovery dashboard if the API or local MongoDB database goes offline.

---

## 🛠️ Tech Stack

**Frontend Client:**
- **React.js** (v19)
- **Tailwind CSS** (v4 CSS-first compiler)
- **Framer Motion** (smooth layout transitions & spring animations)
- **React Router DOM** (declarative client-side routing)
- **React Hot Toast** (premium notification toasts)
- **React Icons** (Feather and Bootstrap icon packages)
- **Axios** (REST API integrations)

**Backend API & Database:**
- **Node.js** & **Express.js** (REST routing and middleware controllers)
- **MongoDB** via **Mongoose** (ODM schema validations & queries)
- **Cors** & **Dotenv** (security headers and environment config)

---

## 📂 Project Structure

```
/
├── backend/
│   ├── config/db.js            # MongoDB database config via Mongoose
│   ├── middleware/
│   │   └── errorMiddleware.js # JSON Error & 404 handler middleware
│   ├── models/Task.js          # Mongoose Task Schema and validations
│   ├── routes/taskRoutes.js    # Express CRUD routes and sorting/searching
│   ├── .env                    # Config parameters (PORT, MONGO_URI)
│   └── server.js               # Unified server boot script
├── frontend/
│   ├── src/
│   │   ├── components/         # Navbar, Sidebar, TaskCard, TaskModal, StatsCard, EmptyState, LoadingSkeleton
│   │   ├── context/            # TaskContext (CRUD API calls), ThemeContext (theme states)
│   │   ├── pages/              # Dashboard, TasksPage, AnalyticsPage, SettingsPage, NotFound, ServerError
│   │   ├── index.css           # Tailwind custom variants and scrollbars
│   │   └── App.jsx             # Router mappings and layout configuration
│   ├── index.html              # Base HTML with SEO tags
│   └── vite.config.js          # Vite config with Tailwind CSS v4 support
├── package.json                # Root monorepo build and installation scripts
└── README.md                   # Documentation file
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **MongoDB** installed and running locally.

### 2. Quick Setup & Run (Unified)
To install all dependencies, build the React frontend, and boot the full-stack server on port 5000 in one go, run the following commands in the project root:

```bash
# Install dependencies for both folders
npm run install-all

# Compile the frontend assets into production
npm run build-frontend

# Boot the unified service
npm start
```
Open **[http://localhost:5000/](http://localhost:5000/)** in your browser.

---

## ⚡ REST API Routes

All endpoints are hosted relative to `/api/tasks`:

| Method | Route | Description | Query Filters |
|:---|:---|:---|:---|
| **POST** | `/api/tasks` | Create a new task | None |
| **GET** | `/api/tasks` | Fetch matching tasks | `search`, `status`, `priority`, `category`, `sortBy` |
| **GET** | `/api/tasks/:id` | Fetch task details by ID | None |
| **PUT** | `/api/tasks/:id` | Update task details / status | None |
| **DELETE** | `/api/tasks/:id` | Permanently remove task | None |

---

## ☁️ Cloud Deployment

The repository is configured for immediate hosting (e.g. Render, Railway, or Heroku):
1. Push this folder to a GitHub repository.
2. Link the repository to your hosting service.
3. Configure the following deploy settings:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
4. Set the `MONGO_URI` environment variable to point to your remote MongoDB database.
