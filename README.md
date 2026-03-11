# Formix - Simple Form Builder

Formix is an easy-to-use platform for teams to quickly make custom forms, set up smart conditional rules, and collect files like photos and videos in one place.

<img width="1280" alt="Formix Dashboard" src="https://github.com/user-attachments/assets/4123ad93-0573-4c09-934c-5a3702109c81" />

## ✨ Core Features

- **Form Builder**: A simple drag-and-drop tool to make custom forms.
- **Conditional Logic**: Set up "if/then" rules to show or hide questions based on what the user selects.
- **Dynamic Dropdowns**: Automatically load live options from the database (like locations or job sites) directly into dropdown menus.
- **Media Uploads**: Easily collect and save pictures and videos directly from the form.
- **Submissions Hub**: View all form answers in a clean table format.
- **Mobile Friendly**: Works perfectly on phones, tablets, and desktop computers.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Base UI / Radix primitives
- **Drag & Drop**: `@dnd-kit` for premium, collision-aware interactive reordering
- **Storage**: Supabase Storage (Buckets)
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (Supabase)
- **Tools**: Pydantic

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (Late v18 or newer)
- Python 3.10+
- Supabase Project & URL

### 2. Installation

#### Frontend
```bash
cd frontend
pnpm install
pnpm run dev
```

#### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn src.main:app --reload
```

### 3. Environment Variables

**Frontend (`frontend/.env`):**
```env
NEXT_PUBLIC_APP_NAME="Formix"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:8000"
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_key
```

**Backend (`backend/.env`):**
```env
SUPABASE_URL=your_url
SUPABASE_SERVICE_KEY=your_service_key
```

### 4. Run the app
Open http://localhost:3000 in your browser for the frontend and http://localhost:8000 for the backend.

**Note on Backend Cold Starts (Render.com free tier):** The backend is hosted on Render's free tier, so the server goes to sleep after 15 minutes of inactivity. When you try to access the app again after it sleeps, the first request will take about 50 seconds to boot up. After that, it runs fast as usual.
