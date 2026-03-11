# Formix

A modern, dynamic form builder and collection engine. Formix empowers organizations to rapidly deploy custom forms, manage advanced field constraints, and seamlessly capture respondent data through an intuitive admin and user interface.

## Features

- Dynamic Form Creation: Build complex, custom forms with an interactive drag-and-drop canvas.
- Advanced Logic Engine: Conditionally hide, show, or require fields based on respondent input. Attach automated visual highlight alerts to fields based on dynamic rules.
- Live Data Integration: Inject remote database entries into form selectors (e.g., dynamically loading live Job Sites/Branches directly from the backend).
- Rich Media Support: Direct secure uploads for image and video files using authenticated buckets.
- Administrative Dashboard: Manage your form lifecycle, duplicate sharing links instantly, review submissions in a rich table view with native data formatting, and permanently delete unneeded forms.
- Completely Responsive: Modern design patterns optimized for desktop, tablet, and mobile accessibility without layout breakage.

## Tech Stack

Frontend:
- Framework: Next.js (React)
- Languages: TypeScript
- Styling: Tailwind CSS
- UI Foundations: Radix UI
- Drag & Drop: @dnd-kit
- Feedback & Icons: Sonner, Lucide React

Backend:
- Framework: FastAPI (Python)
- Database: Supabase (PostgreSQL)
- Validation: Pydantic

## Deployment Information

The application architecture is designed for modern cloud hosting. The frontend is optimized for edge networks (e.g., Vercel or Render static deployments), while the backend is deployed as a Web Service on Render.

Notice regarding Cold Starts:
Because the backend API is hosted on Render's free tier, the server actively spins down to conserve resources after 15 minutes of inactivity. When accessing the application for the first time after a period of rest, please expect a cold start delay of approximately 50 to 60 seconds while the backend orchestrations boot up. Once active, all subsequent requests will resolve instantly. 

## Local Setup Instructions

### Prerequisites
- Node.js installed
- Python 3.10+ installed
- Supabase account and project

### Backend Setup
1. Navigate to the `backend` directory.
2. Install dependencies: `pip install -r requirements.txt`
3. Duplicate `.env.example` to `.env` and fill in your Supabase credentials:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
4. Start the FastAPI development server: `uvicorn src.main:app --reload`
   The backend will start on port 8000.

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies: `pnpm install`
3. Duplicate `.env.example` to `.env` (or create one) and configure your environment:
   - `NEXT_PUBLIC_API_URL=http://localhost:8000`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` (Ensure you use your Anon JWT token if required for direct storage uploads).
4. Run the development environment: `pnpm dev`
   The frontend will start on port 3000.
