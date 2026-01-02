# Mediterranean Shipping Express - Production-Ready Logistics Platform

A comprehensive, enterprise-grade global courier and logistics platform built with modern technologies for seamless package shipping, real-time tracking, and delivery management.

## Architecture Overview

### Backend Stack
- **Framework**: NestJS with GraphQL (code-first approach)
- **Database**: PostgreSQL with Prisma ORM
- **Real-time**: Socket.io for live updates
- **Authentication**: Auth0 with separate user/admin flows
- **Geo-services**: Mapbox for routing and geocoding
- **Caching**: Redis for query optimization
- **Runtime**: Bun for optimal performance

### Frontend Stack
- **Framework**: Next.js 16 with App Router
- **UI Library**: HeroUI (NextUI) components
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Maps**: Mapbox GL
- **Real-time**: Socket.io client
- **API Client**: Apollo Client for GraphQL

## Project Structure

```
swiftship-global/
├── backend/
│   ├── src/
│   │   ├── main.ts                    # Application entry point
│   │   ├── app.module.ts              # Root module
│   │   ├── modules/
│   │   │   ├── auth/                  # Authentication module
│   │   │   ├── user/                  # User management
│   │   │   ├── shipment/              # Shipment operations
│   │   │   ├── driver/                # Driver management
│   │   │   ├── tracking/              # Tracking service
│   │   │   ├── notification/          # Notification system
│   │   │   ├── geo/                   # Geolocation services
│   │   │   └── prisma/                # Database service
│   │   └── common/
│   │       ├── decorators/            # Custom decorators
│   │       ├── guards/                # Auth guards
│   │       └── interfaces/            # Shared interfaces
│   ├── prisma/
│   │   └── schema.prisma              # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx               # Homepage
│   │   │   ├── layout.tsx             # Root layout
│   │   │   ├── dashboard/             # Customer dashboard
│   │   │   ├── tracking/              # Public tracking page
│   │   │   ├── admin/                 # Admin panel
│   │   │   └── auth/                  # Authentication pages
│   │   ├── components/
│   │   │   ├── navbar.tsx             # Navigation bar
│   │   │   ├── footer.tsx             # Footer
│   │   │   ├── hero-section.tsx       # Landing hero
│   │   │   ├── features-section.tsx   # Features showcase
│   │   │   ├── pricing-section.tsx    # Pricing plans
│   │   │   ├── dashboard/             # Dashboard components
│   │   │   ├── tracking/              # Tracking components
│   │   │   └── admin/                 # Admin components
│   │   ├── hooks/
│   │   │   ├── use-auth.ts            # Auth hook
│   │   │   └── use-shipment.ts        # Shipment hook
│   │   ├── store/
│   │   │   ├── auth-store.ts          # Auth state
│   │   │   └── shipment-store.ts      # Shipment state
│   │   ├── lib/
│   │   │   ├── graphql-client.ts      # Apollo client setup
│   │   │   └── socket-client.ts       # Socket.io setup
│   │   └── globals.css                # Global styles
│   ├── global.d.ts                    # Global TypeScript types
│   ├── constants.ts                   # Application constants
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   └── .env.example
│
└── README.md
```

## Key Features

### Real-time Tracking
- Live GPS updates via Socket.io
- Real-time location sharing with WebSocket connections
- Instant notifications on status changes
- Interactive Mapbox integration for route visualization

### Comprehensive GraphQL API
- **Queries**: 12+ queries for shipment data, pricing, and tracking
- **Mutations**: 18+ mutations for shipment operations and management
- **Subscriptions**: 7+ subscriptions for real-time updates
- Code-first approach with TypeScript decorators
- Enterprise-safe with depth limits, DataLoader pattern, and rate limiting

### Multi-role Authentication
- **Customer**: Create and track shipments
- **Driver**: Manage deliveries and real-time location tracking
- **Admin**: Full shipment and platform management
- **Super Admin**: System configuration and user management
- Auth0 integration with separate user and admin flows
- 2FA for admin accounts

### Package Status Management
- 13 comprehensive status states (PENDING, PROCESSING, IN_TRANSIT, etc.)
- Transport modes (AIR, LAND, WATER, MULTIMODAL)
- Service types (EXPRESS, STANDARD, ECONOMY)
- Customs clearance tracking
- Detailed tracking events with timestamps and locations

### Admin Dashboard
- Real-time shipment management
- Driver assignment and tracking
- Status updates with location tracking
- Analytics and insights
- Custom reporting

### Customer Features
- Easy shipment creation
- Real-time tracking with live maps
- Shipping cost calculator
- Address book management
- Payment method storage
- Notification system
- Shipment history and invoices

## Getting Started

### Prerequisites
- Node.js 18+ (or Bun)
- PostgreSQL 13+
- Redis (for caching)
- Auth0 account
- Mapbox API key

### Installation

#### Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your credentials

bun install
bun run prisma:generate
bun run prisma:migrate
bun run dev
```

#### Frontend Setup
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your credentials

bun install
bun run dev
```

Visit `http://localhost:3000` for the frontend and `http://localhost:3001/graphql` for the GraphQL API.

## API Endpoints

### GraphQL Endpoint
- **URL**: `/graphql`
- **Method**: POST/WebSocket
- **Authentication**: Bearer token in Authorization header

### Socket.io Events
- `tracking:subscribe` - Subscribe to tracking updates
- `location:update` - Real-time location update
- `status:update` - Shipment status change
- `driver:assign` - Driver assignment notification

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key models:
- **User**: Customer and admin accounts
- **Driver**: Delivery personnel with location tracking
- **Shipment**: Package information and status
- **TrackingEvent**: Tracking history timeline
- **Notification**: User notifications
- **Address**: Saved shipping addresses
- **PaymentMethod**: Billing information

## Security Features

- **JWT Authentication**: Secure token-based auth
- **Role-Based Access Control**: Fine-grained permissions
- **Field-Level Authorization**: GraphQL resolver protection
- **Rate Limiting**: 100 req/min authenticated, 20 req/min anonymous
- **Query Complexity Analysis**: Prevent expensive operations
- **Depth Limit Enforcement**: Max 5 levels of nesting
- **DataLoader Pattern**: N+1 query prevention
- **SQL Injection Prevention**: Parameterized queries via Prisma
- **CORS Configuration**: Restricted cross-origin requests
- **HTTPS Required**: Production deployments only

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

- [ ] Environment variables configured
- [ ] Database backups enabled
- [ ] Auth0 production app created
- [ ] Mapbox production token configured
- [ ] Email notifications configured
- [ ] Redis replication enabled
- [ ] HTTPS certificates installed
- [ ] Rate limiting configured
- [ ] Monitoring and logging setup
- [ ] CI/CD pipeline configured
- [ ] Database indexes optimized
- [ ] CDN configured for static assets
- [ ] API documentation generated
- [ ] Security audit completed

## Support and Documentation

- **GraphQL Schema**: Available at `/graphql` endpoint
- **API Documentation**: Auto-generated GraphQL docs
- **Database Docs**: Prisma Studio (`bun run prisma:studio`)

## License

All rights reserved. Contact support@swiftship.global for licensing inquiries.

## Contact

- Email: support@swiftship.global
- Website: https://swiftship.global
- Docs: https://docs.swiftship.global
