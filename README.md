
## 🚢 About Mediterranean Shipping Express

Mediterranean Shipping Express (MSE) is a global leader in container shipping and logistics, providing worldwide network of industry-specific services. We offer customers a comprehensive international service that delivers fast and reliable transit times, helping provide the best solutions for shipping needs.

### Our Solutions
- **Express Shipping**: 24-hour delivery, same-day service, priority handling
- **Standard Shipping**: Ground transport, cost-effective, reliable delivery  
- **International Shipping**: Air freight, sea freight, customs clearance
- **Track & Trace Solutions**: Live GPS tracking, SMS notifications, delivery updates

## 🏗️ Architecture Overview

### Frontend Stack
- **Framework**: Next.js 16 with App Router and Turbopack
- **UI Library**: Shadcn/UI components with Radix UI primitives
- **Styling**: Tailwind CSS v4 with custom MSC brand colors
- **Animations**: Framer Motion for smooth interactions
- **State Management**: Zustand for client state
- **Authentication**: Better Auth with email/password authentication
- **Database**: PostgreSQL with Prisma ORM
- **Real-time**: Ably for live tracking updates
- **Maps & Routing**: GraphHopper API for geocoding and route optimization
- **Mapping Library**: MapLibre GL for interactive maps
- **Runtime**: Bun for optimal performance

### Key Technologies
- **Ably**: Real-time messaging for live shipment tracking and notifications
- **GraphHopper**: Geocoding, route optimization and distance calculations
- **Better Auth**: Secure email/password authentication with session management
- **Prisma**: Type-safe database access and migrations
- **MapLibre GL**: Interactive maps and geolocation services
- **Framer Motion**: Smooth animations and page transitions

## 📁 Project Structure

```
mediterranean-shipping-express/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx               # Homepage with Our Solutions
│   │   │   ├── layout.tsx             # Root layout with MSE branding
│   │   │   ├── (public)/              # Public pages
│   │   │   │   ├── solutions/         # Solutions overview page
│   │   │   │   ├── services/          # Service detail pages
│   │   │   │   ├── about/             # About MSE
│   │   │   │   ├── contact/           # Contact page
│   │   │   │   ├── track/             # Public tracking
│   │   │   │   ├── faq/               # FAQ page
│   │   │   │   ├── privacy/           # Privacy policy
│   │   │   │   ├── terms/             # Terms of service
│   │   │   │   └── sustainability/    # Sustainability page
│   │   │   ├── (customer)/            # Customer dashboard
│   │   │   │   ├── shipments/         # Shipment management
│   │   │   │   ├── addresses/         # Address book
│   │   │   │   ├── notifications/     # Notification settings
│   │   │   │   ├── profile/           # User profile
│   │   │   │   └── settings/          # Account settings
│   │   │   ├── (driver)/              # Driver portal
│   │   │   │   ├── dashboard/         # Driver dashboard
│   │   │   │   ├── deliveries/        # Delivery management
│   │   │   │   ├── earnings/          # Earnings tracking
│   │   │   │   └── driver-profile/    # Driver profile
│   │   │   ├── admin/                 # Admin panel
│   │   │   │   ├── dashboard/         # Admin dashboard
│   │   │   │   ├── users/             # User management
│   │   │   │   ├── drivers/           # Driver management
│   │   │   │   ├── analytics/         # Analytics
│   │   │   │   ├── reports/           # Reports
│   │   │   │   ├── issues/            # Issue management
│   │   │   │   ├── offices/           # Office management
│   │   │   │   └── settings/          # System settings
│   │   │   ├── auth/                  # Authentication pages
│   │   │   │   ├── login/             # User login
│   │   │   │   ├── signup/            # User registration
│   │   │   │   └── callback/          # Auth0 callback
│   │   │   ├── (auth-user)/           # User auth pages
│   │   │   ├── (auth-admin)/          # Admin auth pages
│   │   │   └── api/                   # API routes
│   │   ├── components/
│   │   │   ├── ui/                    # Shadcn/UI components
│   │   │   ├── dashboard/             # Dashboard components
│   │   │   ├── tracking/              # Tracking components
│   │   │   ├── admin/                 # Admin components
│   │   │   ├── auth/                  # Auth components
│   │   │   ├── shipment/              # Shipment components
│   │   │   ├── our-solutions-section.tsx # Interactive solutions grid
│   │   │   ├── hero-section.tsx       # Landing hero
│   │   │   ├── features-section.tsx   # Features showcase
│   │   │   ├── customer-advisories.tsx # Latest news section
│   │   │   ├── navbar.tsx             # Navigation with MSE logo
│   │   │   └── footer.tsx             # Footer
│   │   ├── hooks/
│   │   │   ├── use-auth.ts            # Auth hook
│   │   │   ├── use-shipment.ts        # Shipment hook
│   │   │   └── use-toast.ts           # Toast notifications
│   │   ├── store/
│   │   │   ├── auth-store.ts          # Auth state
│   │   │   └── shipment-store.ts      # Shipment state
│   │   ├── lib/
│   │   │   ├── auth.ts                # Auth configuration
│   │   │   ├── auth0.ts               # Auth0 setup
│   │   │   ├── prisma.ts              # Database client
│   │   │   ├── ably-client.ts         # Ably real-time client
│   │   │   ├── geocoding.ts           # Geocoding service
│   │   │   └── utils.ts               # Utility functions
│   │   └── types/                     # TypeScript types
│   ├── prisma/
│   │   ├── schema.prisma              # Database schema
│   │   └── migrations/                # Database migrations
│   │   ├── public/                        # Static assets
│   │   │   ├── mse-logo.png              # MSE logo
│   │   │   ├── express-shipping.png       # Solution images
│   │   │   ├── Standard-Shipping.png      
│   │   │   ├── International-Shipping.png 
│   │   │   ├── Track & Trace Solutions.png  
│   │   │   ├── ocean-freight-hero.jpg     # Hero images
│   │   │   ├── logistics-tracking-gps-map.jpg
│   │   │   ├── intermodal-transport-hero.jpg
│   │   │   └── favicons/                  # Favicon files
│   ├── constants.ts                   # MSC brand colors & constants
│   ├── package.json
│   ├── next.config.js                 # Next.js configuration
│   ├── tailwind.config.js             # Tailwind CSS config
│   └── .env.example                   # Environment variables
│
└── README.md
```

## ✨ Key Features

### Interactive Solutions Grid
- **MSC-style interface**: Full-width background carousel with 4 service cards
- **Auto-rotating images**: Background changes every 4 seconds
- **Hover interactions**: Background switches to card-specific images on hover
- **Responsive design**: 4 columns on desktop, 2 on tablet, 1 on mobile
- **Smooth animations**: Framer Motion powered transitions

### Real-time Tracking with Ably
- **Live updates**: Real-time shipment status changes via Ably channels
- **Push notifications**: Instant alerts for status updates
- **Multi-device sync**: Updates across all connected devices
- **Scalable messaging**: Handles thousands of concurrent tracking sessions

### Route Optimization with GraphHopper
- **Smart routing**: Optimal delivery routes using GraphHopper API
- **Distance calculations**: Accurate shipping cost estimates
- **Multi-modal transport**: Support for air, sea, land, and combined shipping
- **International routing**: Global route optimization across 200+ countries

### Multi-role Authentication (Better Auth)
- **Customer Portal**: Create and track shipments, manage addresses
- **Driver Portal**: Delivery management, earnings tracking, route optimization  
- **Admin Dashboard**: Full platform management, analytics, user management
- **Secure access**: JWT tokens, role-based permissions, session management

### Comprehensive Shipment Management
- **13 status states**: From PENDING to DELIVERED with detailed tracking
- **Service types**: Express (1-2 days), Standard (3-5 days), Economy (7-10 days)
- **Package categories**: Documents, parcels, fragile items, electronics, etc.
- **International support**: Customs clearance, documentation, duties handling

### Modern UI/UX
- **MSC Brand Colors**: Authentic golden yellow (#D4AF37) and darker gold (#B8860B)
- **Shadcn/UI Components**: Modern, accessible component library
- **Responsive Design**: Mobile-first approach with perfect tablet/desktop scaling
- **Dark Mode Support**: System preference detection and manual toggle
- **Smooth Animations**: Framer Motion for professional interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (or Bun recommended)
- PostgreSQL 13+
- Ably account (for real-time features)
- GraphHopper API key (for geocoding and routing)

### Environment Variables

Create a `.env.local` file in the frontend directory:

```bash
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Better Auth Configuration
BETTER_AUTH_SECRET=your-32-character-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/mse_db"

# Ably (Real-time)
ABLY_API_KEY=your-ably-server-key

# GraphHopper (Geocoding & Routing)
NEXT_PUBLIC_GRAPHHOPPER_API_KEY=your-graphhopper-api-key

# JWT Authentication
JWT_SECRET=your-jwt-secret-key-here-32-chars-minimum

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-org/mediterranean-shipping-express.git
cd mediterranean-shipping-express/frontend

# Install dependencies (using Bun for optimal performance)
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up the database
bun run prisma:generate
bun run prisma:migrate dev
bun run prisma:seed  # Optional: seed with sample data

# Start development server
bun run dev
```

Visit `http://localhost:3000` to see the application.

### Database Setup

The application uses PostgreSQL with Prisma ORM:

```bash
# Generate Prisma client
bun run prisma:generate

# Run migrations
bun run prisma:migrate dev

# View database in Prisma Studio
bun run prisma:studio
```

## 🔧 API Integration

### Ably Real-time Messaging
```typescript
// Subscribe to shipment updates
const channel = ably.channels.get(`shipment:${shipmentId}`)
channel.subscribe('status-update', (message) => {
  console.log('Shipment status updated:', message.data)
})

// Publish location update (driver app)
channel.publish('location-update', {
  lat: 40.7128,
  lng: -74.0060,
  timestamp: new Date().toISOString()
})
```

### GraphHopper Routing
```typescript
// Calculate shipping route and cost
const route = await fetch(`https://graphhopper.com/api/1/route`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.GRAPHHOPPER_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    points: [[pickup_lng, pickup_lat], [delivery_lng, delivery_lat]],
    vehicle: 'car',
    locale: 'en'
  })
})
```

### Better Auth Authentication
```typescript
// Protected API route
import { auth } from "@/lib/auth"

export default async function handler(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers })
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }
  
  // Handle authenticated request
}
```

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User**: Customer and admin accounts with Better Auth integration
- **Driver**: Delivery personnel with location tracking capabilities
- **Shipment**: Package information, status, and routing details
- **TrackingEvent**: Detailed tracking history with timestamps and locations
- **Notification**: User notifications and preferences
- **Address**: Saved shipping addresses with geocoding
- **Activity**: System activity logs and audit trail

### MSC Brand Configuration

The application uses authentic MSC colors defined in `constants.ts`:

```typescript
export const MSC_COLORS = {
  YELLOW: "#D4AF37",    // MSC's signature golden yellow
  GOLD: "#B8860B",      // Darker gold variant
  WHITE: "#FFFFFF",     // Clean white
  BLACK: "#000000",     // Pure black
  LIGHT_GRAY: "#F8F9FA",
  MEDIUM_GRAY: "#6C757D",
  DARK_GRAY: "#343A40",
  TEXT_PRIMARY: "#212529",
  TEXT_SECONDARY: "#6C757D",
  BG_PRIMARY: "#FFFFFF",
  BG_SECONDARY: "#F8F9FA"
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication via Auth0
- **Role-Based Access Control**: Customer, Driver, Admin, Super Admin roles
- **API Route Protection**: Server-side authentication checks
- **CSRF Protection**: Built-in Next.js CSRF protection
- **Rate Limiting**: API endpoint rate limiting
- **Input Validation**: Comprehensive form and API validation
- **SQL Injection Prevention**: Parameterized queries via Prisma
- **XSS Protection**: Content Security Policy headers
- **HTTPS Enforcement**: Production HTTPS requirements

## Deployment

### Backend Deployment
```bash
# Build
bun run build

# Run production
bun run start:prod
```

### Frontend Deployment
```bash
# Build
bun run build

# Start
bun run start
```

Both services can be deployed on Vercel, Railway, Render, or any Docker-compatible platform.

## Development Guidelines

### Code Style
- TypeScript strict mode enabled
- ESLint configuration included
- Prettier for code formatting
- Component-based architecture

### Testing
```bash
# Backend tests
bun run test

# Frontend tests (TBD)
bun run test:frontend
```

### Database Migrations
```bash
# Create new migration
bun run prisma:migrate dev --name migration_name

# Studio for visual inspection
bun run prisma:studio
```

## Production Checklist

- [ ] Environment variables configured for production
- [ ] Database backups enabled and tested
- [ ] Better Auth production configuration completed
- [ ] Ably production API keys configured
- [ ] GraphHopper production API key configured
- [ ] Email notifications configured and tested
- [ ] HTTPS certificates installed and verified
- [ ] Rate limiting configured for API endpoints
- [ ] Monitoring and logging setup (error tracking, performance)
- [ ] CI/CD pipeline configured for automated deployments
- [ ] Database indexes optimized for production queries
- [ ] CDN configured for static assets and images
- [ ] API documentation generated and accessible
- [ ] Security audit completed and vulnerabilities addressed
- [ ] Load testing performed for expected traffic
- [ ] Backup and disaster recovery procedures documented

## Support and Documentation

- **Live Tracking**: Real-time shipment tracking at `/track`
- **Customer Portal**: Full-featured dashboard for shipment management
- **Admin Panel**: Comprehensive administrative interface
- **API Documentation**: GraphQL schema available at `/graphql` endpoint
- **Database Management**: Prisma Studio (`bun run prisma:studio`)
- **24/7 Support**: Customer service available around the clock

## License

© 2026 Mediterranean Shipping Express. All rights reserved. 

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited. For licensing inquiries, please contact legal@mediterraneanshippingexpress.com.

## Contact

- **Website**: https://mediterraneanshippingexpress.com
- **Email**: support@mediterraneanshippingexpress.com
- **Customer Service**: Available 24/7 for tracking and support
- **Business Inquiries**: sales@mediterraneanshippingexpress.com

For technical support or development inquiries, please contact our development team.
