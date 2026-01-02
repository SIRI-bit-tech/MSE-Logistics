# Mediterranean Shipping Express - Setup Guide

## Environment Configuration

### Auth0 Setup
1. Create Auth0 account at auth0.com
2. Create two applications:
   - **User Application**: Standard Web Application for customers
   - **Admin Application**: Regular Web Application for admins
3. Get credentials for both applications
4. Configure Auth0 email settings for notifications

### Database Setup
1. Create PostgreSQL database
2. Configure connection string in `.env`
3. Run migrations: `bun run prisma:migrate`

### Mapbox Setup
1. Create Mapbox account
2. Get API token from dashboard
3. Configure in environment variables

### Redis Setup
For development: `docker run -d -p 6379:6379 redis:latest`

## Running the Application

### Development
```bash
# Terminal 1: Backend
cd backend
bun run dev

# Terminal 2: Frontend
cd frontend
bun run dev

# Terminal 3: Database UI
cd backend
bun run prisma:studio
```

### Production
See deployment section in README.md

## Testing the API

### Public Tracking
```bash
curl "http://localhost:3001/graphql" \
  -H "Content-Type: application/json" \
  -d '{"query":"query{trackShipment(trackingNumber:\"SG123\"){id status}}"}'
```

### Authenticated Requests
```bash
curl "http://localhost:3001/graphql" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"query":"query{myShipments(skip:0 take:10){id trackingNumber}}"}'
```

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure user has correct permissions

### Auth0 Integration
- Verify credentials in .env
- Check callback URLs in Auth0 dashboard
- Ensure email is verified in Auth0

### Mapbox Issues
- Verify token is valid and not expired
- Check domain restrictions in Mapbox
- Ensure CORS is enabled
