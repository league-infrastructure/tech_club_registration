# Tech Club Registration

Display Tech Club events and allow people to register.

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: Supabase (PostgreSQL database, authentication, and APIs)
- **Deployment**: Railway

## Getting Started

For detailed setup instructions, see [docs/setup.md](docs/setup.md).

### Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your Supabase credentials
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Documentation

- [Setup Guide](docs/setup.md) - Complete setup instructions for local development and deployment

## Project Structure

```
├── src/
│   ├── app/          # Next.js App Router pages and layouts
│   ├── components/   # Reusable React components
│   └── lib/          # Utility functions and Supabase client
├── public/           # Static assets
└── docs/             # Project documentation
```
