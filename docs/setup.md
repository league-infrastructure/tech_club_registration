# Tech Club Registration - Setup Guide

This guide will walk you through setting up the Tech Club Registration application locally and deploying it to Railway.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/league-infrastructure/tech_club_registration.git
cd tech_club_registration
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Supabase Client Library

### 3. Set Up Supabase

#### Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in or create a new account
3. Click "New Project"
4. Fill in the project details:
   - **Name**: tech-club-registration (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
5. Click "Create new project" and wait for the project to be ready (~2 minutes)

#### Get Your Supabase Credentials

1. In your Supabase project dashboard, click the "Settings" icon (gear icon)
2. Navigate to "API" in the left sidebar
3. You'll find two important values:
   - **Project URL** (under "Project URL")
   - **Anon/Public Key** (under "Project API keys" → "anon public")

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   Replace:
   - `https://your-project-id.supabase.co` with your actual Project URL
   - `your-anon-key-here` with your actual Anon/Public Key

### 5. Run the Development Server

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000).

You should see the default Next.js welcome page. The page will automatically reload when you make changes to the code.

## Database Schema Setup (Supabase)

To store tech club events and registrations, you'll need to create tables in Supabase.

### Create Tables Using Supabase SQL Editor

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New query"
4. Paste the following SQL to create the necessary tables:

```sql
-- Create events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  max_attendees INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create registrations table
CREATE TABLE registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, email)
);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for events (public read)
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

-- Create policies for registrations (public insert, users can view their own)
CREATE POLICY "Anyone can register for events"
  ON registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own registrations"
  ON registrations FOR SELECT
  USING (true);
```

5. Click "Run" to execute the SQL

This will create:
- An `events` table to store tech club events
- A `registrations` table to store user registrations
- Row Level Security policies to control access

## Building the Application

To create a production build:

```bash
npm run build
```

This will create an optimized production build in the `.next` directory.

To run the production build locally:

```bash
npm start
```

The application will run at [http://localhost:3000](http://localhost:3000).

## Deploying to Railway

### 1. Create a Railway Account

1. Go to [https://railway.app](https://railway.app)
2. Sign up with GitHub (recommended) or email

### 2. Deploy Your Project

#### Option A: Deploy from GitHub (Recommended)

1. Push your code to GitHub if you haven't already
2. In Railway, click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub account
5. Select the `tech_club_registration` repository
6. Railway will automatically detect it's a Next.js project

#### Option B: Deploy with Railway CLI

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Initialize Railway in your project:
   ```bash
   railway init
   ```

4. Deploy:
   ```bash
   railway up
   ```

### 3. Configure Environment Variables on Railway

1. In your Railway project dashboard, go to the "Variables" tab
2. Add your environment variables:
   - Click "New Variable"
   - Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase URL
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase Anon Key
3. Railway will automatically redeploy your application

### 4. Access Your Deployed Application

1. In Railway, go to the "Settings" tab
2. Click "Generate Domain" under the "Domains" section
3. Your app will be available at `https://your-app-name.up.railway.app`

## Project Structure

```
tech_club_registration/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/          # Reusable React components
│   │   └── (your components here)
│   └── lib/                 # Utility functions
│       └── supabase.ts      # Supabase client configuration
├── public/                  # Static assets (images, fonts, etc.)
├── docs/                    # Documentation
│   └── setup.md            # This file
├── .env.example            # Example environment variables
├── .env.local              # Your local environment variables (git-ignored)
├── railway.json            # Railway deployment configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── next.config.ts          # Next.js configuration
└── README.md               # Project overview
```

## Common Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm start` - Run production server
- `npm install <package>` - Add a new package

## Next Steps

Now that you have the basic setup running, you can start building features:

1. **Create Event Pages**: Add pages to display upcoming events
2. **Registration Forms**: Build forms for users to register for events
3. **Admin Dashboard**: Create an admin interface to manage events
4. **Authentication**: Add user authentication with Supabase Auth
5. **Email Notifications**: Send confirmation emails using Supabase Functions

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can run on a different port:

```bash
npm run dev -- -p 3001
```

### Environment Variables Not Loading

- Make sure your `.env.local` file is in the root directory
- Restart the development server after changing environment variables
- Verify that variable names start with `NEXT_PUBLIC_` for client-side access

### Supabase Connection Issues

- Double-check your Supabase URL and Anon Key in `.env.local`
- Ensure your Supabase project is active and not paused
- Check the browser console for specific error messages

### Railway Deployment Fails

- Check the Railway deployment logs for specific errors
- Ensure all environment variables are set in Railway
- Verify that `package.json` has the correct build and start scripts

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Review the documentation links
3. Open an issue on the GitHub repository
