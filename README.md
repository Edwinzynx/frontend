# SmartPresence - Frontend

The frontend of the SmartPresence system, built with Next.js, Prisma, and NextAuth.

## Features
- **Landing Page**: Modern hero section with entrance animations.
- **Student Dashboard**: Personal attendance history, profile management, and Face ID registration.
- **Faculty Dashboard**: Classroom attendance processing, student list management, and analytical reports.
- **Dark Azure Theme**: A cohesive, premium design system using modern typography and glassmorphism.

## Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Generates the Prisma client and builds the application for production.
- `npm run start`: Starts the production server.

## Environment Variables
Ensure the following are set in your deployment environment:
- `DATABASE_URL`: PostgreSQL connection.
- `NEXTAUTH_SECRET`: Security secret for auth.
- `NEXT_PUBLIC_CV_BACKEND_URL`: URL of the FastAPI backend.
