# UniSearch - University Discovery Platform

## Overview

UniSearch is a full-stack web application for discovering and exploring universities worldwide. The platform allows users to search, filter, and bookmark universities while providing detailed information about each institution. Built with modern web technologies, it features a React frontend with TypeScript, an Express.js backend, and PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **API Design**: RESTful API architecture
- **Middleware**: Express middleware for JSON parsing, CORS, and request logging
- **Development**: Hot reloading with Vite integration in development mode

### Data Storage
- **Database**: PostgreSQL (configured via Drizzle ORM) - LIVE DATABASE ACTIVE
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations
- **Production Storage**: DatabaseStorage implementation with PostgreSQL backend
- **Connection**: Neon Database serverless PostgreSQL connection
- **Data Population**: 12 universities with comprehensive information populated

## Key Components

### Database Schema
The application uses a single `universities` table with comprehensive university information:
- Basic information (name, location, country)
- Academic data (ranking, acceptance rate, programs)
- Financial details (tuition fees, endowment)
- Contact information (website, phone, address)
- User interactions (bookmarks)

### API Endpoints
- `GET /api/universities` - Retrieve universities with filtering and pagination
- `GET /api/universities/:id` - Get detailed university information
- `GET /api/universities/search/:query` - Search suggestions
- `POST /api/universities/:id/bookmark` - Toggle bookmark status

### UI Components
- **UniversityCard**: Displays university preview with bookmark functionality
- **SearchFilters**: Comprehensive filtering interface (country, ranking, tuition)
- **Header/Footer**: Navigation and branding components
- **Layout Components**: Responsive design with mobile-first approach

### Pages
- **Home**: Main search and discovery interface with filtering
- **UniversityDetail**: Detailed view of individual universities
- **NotFound**: 404 error page for invalid routes

## Data Flow

1. **Search & Filter**: Users interact with search inputs and filters on the home page
2. **API Requests**: Frontend makes REST API calls to Express backend
3. **Data Processing**: Backend applies filters, pagination, and sorting to university data
4. **Response Handling**: TanStack Query manages caching and state updates
5. **UI Updates**: React components re-render with new data
6. **User Actions**: Bookmark toggles trigger API calls and cache invalidation

## External Dependencies

### Frontend Libraries
- **React Ecosystem**: React, React DOM, React Query
- **UI Framework**: Radix UI primitives, shadcn/ui components
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Utilities**: date-fns for date handling, clsx for conditional classes
- **Icons**: Lucide React for icons, React Icons for social media icons

### Backend Libraries
- **Server**: Express.js for HTTP server
- **Database**: Drizzle ORM, @neondatabase/serverless for database connectivity
- **Development**: tsx for TypeScript execution, esbuild for production builds
- **Session Management**: connect-pg-simple for PostgreSQL session storage

### Development Tools
- **Build Tools**: Vite, esbuild
- **TypeScript**: Full TypeScript support across frontend and backend
- **Linting**: ESLint configuration
- **Development**: Hot module replacement, error overlays

## Deployment Strategy

### Development
- Vite dev server for frontend with hot module replacement
- tsx for running TypeScript backend with watch mode
- Replit-specific plugins for development environment integration

### Production Build
1. **Frontend**: Vite builds React app to `dist/public` directory
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command
4. **Deployment**: Single Node.js process serving both API and static files

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Production/development mode switching via `NODE_ENV`
- Replit-specific environment detection and tooling integration

The application follows a monorepo structure with shared TypeScript types and schemas, enabling type safety across the full stack while maintaining clear separation of concerns between frontend and backend code.