# GoPromoCodes Next.js

This is the modern Next.js version of GoPromoCodes, built with:
- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Prisma (PostgreSQL)
- NextAuth.js

## Project Structure

```
gopromocodes-next/
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # Reusable React components
│   ├── lib/          # Utility functions and shared code
│   ├── prisma/       # Database schema and migrations
│   └── styles/       # Global styles and Tailwind config
├── public/           # Static assets
└── prisma/          # Prisma schema and migrations
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Database Migration

This project uses the same PostgreSQL database as the Rails application. The Prisma schema is set up to match the existing database structure while adding modern improvements.

## Deployment

The application can be deployed independently of the Rails application. Recommended deployment platforms:
- Vercel (for Next.js)
- Railway (for PostgreSQL)
- Or any other platform that supports Next.js and PostgreSQL

## Development Workflow

1. Create feature branches from `main`
2. Make changes and commit with descriptive messages
3. Create pull requests for review
4. Merge to `main` after approval

## Environment Variables

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Secret for NextAuth.js
- `GOOGLE_CLIENT_ID`: For Google authentication
- `GOOGLE_CLIENT_SECRET`: For Google authentication 