# CyberProbes - Cyber Security & Forensic Services Website

CyberProbes is a modern, responsive website built with Next.js for a cyber security and digital forensics company. The website includes user authentication, an admin panel, blog functionality, and secure video access for registered users.

## Features

- **Modern, Responsive Design**: Fully responsive website built with Next.js and TailwindCSS
- **User Authentication System**: Secure login and registration system using NextAuth.js
- **Admin Panel**: Content management system for videos and blog posts
- **Blog System**: Fully-featured blog with rich content
- **Protected Video Content**: Access to exclusive video content for registered users
- **Contact Form**: User-friendly contact form that sends inquiries to info@cyberprobes.in

## Pages

- **Home**: Landing page with service overview and call-to-action sections
- **About Us**: Company information, team members, and value proposition
- **Services**: Detailed information about cyber security and forensic services
- **Blog**: Articles and insights about cyber security topics
- **Contact**: Contact form and company information
- **Login/Register**: User authentication pages
- **Dashboard**: User dashboard with access to exclusive videos
- **Admin Dashboard**: Content management for videos and blog posts

## Tech Stack

- **Frontend Framework**: Next.js
- **CSS Framework**: TailwindCSS
- **Authentication**: NextAuth.js
- **Database ORM**: Prisma
- **Database**: SQLite (can be easily replaced with PostgreSQL, MySQL, etc.)
- **Styling**: Modern UI with responsive design

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/cyberprobes-site.git
   cd cyberprobes-site
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following:
   ```
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Initialize the database
   ```
   npx prisma migrate dev
   ```

5. Run the development server
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Workflow

### Database Management

- Modify the database schema in `prisma/schema.prisma`
- Run migrations: `npx prisma migrate dev --name [migration-name]`
- View database: `npx prisma studio`

### Authentication

- Authentication is managed with NextAuth.js
- User registration: POST to `/api/register`
- User login: Handled by NextAuth.js

### Content Management

- Admin users can access `/dashboard/admin` to manage content
- Upload and manage videos
- Create and edit blog posts

## Deployment

For production deployment:

1. Build the application
   ```
   npm run build
   ```

2. Start the production server
   ```
   npm start
   ```

## License

[MIT License](LICENSE)

## Contact

For questions or support, please contact info@cyberprobes.in
