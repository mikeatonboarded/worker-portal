# Worker Onboarding Portal

A modern, mobile-first React application built with Next.js for streamlined employee onboarding across multiple employers.

## 🚀 Features

- **Mobile-First Design** - Optimized for mobile devices with responsive layouts
- **Authentication Flow** - Phone number login with SMS verification
- **Task Management** - Organized by status (To Do, In Progress, Done) with color coding
- **Document Management** - Upload, track, and manage onboarding documents
- **Progress Tracking** - Visual progress indicators and completion stats
- **Multi-Employer Support** - Manage onboarding for multiple employers

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: Custom context-based auth system
- **State Management**: React Context API

## 📱 Pages

- **Landing Page** (`/`) - Welcome and sign-up/sign-in
- **Authentication** (`/auth/*`) - Login, signup, and verification
- **Dashboard** (`/dashboard`) - Onboarding progress overview
- **Tasks** (`/tasks`) - Task list with status grouping and details modal
- **Documents** (`/documents`) - Document upload and management
- **Profile** (`/profile`) - User profile and settings

## 🚦 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**  
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Authentication

For testing purposes, use these credentials:
- **Phone**: Any valid phone number
- **Verification Code**: `123456`

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📦 Deployment

The application is ready for deployment on platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Heroku**
- **Digital Ocean**

### Vercel Deployment

1. Connect your repository to Vercel
2. Deploy automatically on push to main branch
3. Environment variables will be configured in Vercel dashboard

### Manual Deployment

1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Application will be available on port 3000

## 🎨 Color Coding

- **Red**: Overdue tasks and urgent items
- **Orange**: Due soon (within 3 days)
- **Blue**: In progress items
- **Green**: Completed items

## 📱 Mobile Features

- Touch-friendly interface with large tap targets
- Swipe gestures and mobile navigation
- Optimized forms for mobile input
- Bottom sheet modals on mobile devices

## 🔧 Configuration

Copy `.env.local.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_BASE_URL=your_domain_here
```

## 📚 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── tasks/             # Task management
│   ├── documents/         # Document management
│   └── profile/           # User profile
├── components/            # Reusable components
├── contexts/              # React contexts (auth, etc.)
└── styles/                # Global styles
```

## 🚀 Performance

- **First Load JS**: ~100kB (optimized)
- **Static Generation**: All pages pre-rendered  
- **Mobile Performance**: Optimized for 3G networks
- **Bundle Analysis**: Automatic code splitting
