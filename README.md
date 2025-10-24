# CyberProbes - Digital Forensics & Cybersecurity

A modern, professional website for CyberProbes, a digital forensics and cybersecurity services company. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Dark theme with animated gradients and smooth transitions
- **SEO Optimized**: Complete meta tags, Open Graph, Twitter cards, sitemap
- **Performance**: Image optimization, lazy loading, bundle optimization
- **Security**: CSP headers, HTTPS redirects, input sanitization
- **Responsive**: Mobile-first design with Tailwind CSS
- **Authentication**: NextAuth.js with secure session management
- **Database**: Prisma ORM with SQLite
- **Forms**: Contact form with reCAPTCHA protection
- **Blog System**: Dynamic blog with database integration

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Custom components with Tailwind
- **Fonts**: Inter (Google Fonts)
- **Security**: reCAPTCHA, CSP headers, input validation

## 📋 Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- Git

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cyberprobes-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the following variables in `.env.local`:
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-recaptcha-site-key"
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio
- `npm run db:migrate` - Run database migrations
- `npm run clean` - Clean build cache
- `npm run analyze` - Analyze bundle size

## 🏗️ Project Structure

```
cyberprobes-site/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (pages)/           # Page components
│   │   ├── api/               # API routes
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   ├── lib/                   # Utility functions
│   ├── providers/             # Context providers
│   └── middleware.ts          # Next.js middleware
├── prisma/                    # Database schema and migrations
├── public/                    # Static assets
├── .github/                   # GitHub Actions workflows
└── package.json
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Base URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# reCAPTCHA (optional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-recaptcha-site-key"
RECAPTCHA_SECRET_KEY="your-recaptcha-secret-key"
```

### Database Setup

The project uses SQLite with Prisma ORM. To set up the database:

1. Generate Prisma client: `npm run db:generate`
2. Push schema to database: `npm run db:push`
3. Seed with sample data: `npm run db:seed`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project: `npm run build`
2. Start the production server: `npm start`

## 🔒 Security Features

- **CSP Headers**: Content Security Policy for XSS protection
- **HTTPS Redirect**: Automatic HTTPS redirect in production
- **Input Sanitization**: Form input validation and sanitization
- **reCAPTCHA**: Bot protection on contact forms
- **Secure Headers**: X-Frame-Options, X-Content-Type-Options, etc.

## 📊 Performance Features

- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Bundle Optimization**: Tree shaking and code splitting
- **Lazy Loading**: Images and components loaded on demand
- **Caching**: Optimized caching strategies

## 🎨 Design Features

- **Dark Theme**: Professional dark color scheme
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first responsive design
- **Typography**: Inter font for modern look
- **Icons**: SVG icons for scalability

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📈 Analytics

The site is ready for analytics integration. Add your tracking codes to the layout component.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@cyberprobes.com or create an issue in the repository.

## 🔄 Changelog

### v1.0.0
- Initial release
- Complete website with all features
- SEO optimization
- Security implementation
- Performance optimization

---

**CyberProbes** - Securing your digital future, one investigation at a time.