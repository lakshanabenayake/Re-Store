# ReStore - AI-Powered E-Commerce Platform

[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)

A modern, full-stack e-commerce platform featuring cutting-edge AI-powered semantic search, built with ASP.NET Core and Next.js.

## 🌟 Key Features

### AI-Powered Semantic Search

- **Google Gemini Integration**: Leverages text-embedding-004 model for generating 768-dimensional embeddings
- **Pinecone Vector Database**: High-performance similarity search across product catalog
- **Intelligent Product Discovery**: Natural language queries return contextually relevant results
- **Automatic Synchronization**: Real-time vector indexing on product CRUD operations

### E-Commerce Core

- **Product Management**: Full CRUD operations with pagination, filtering, and sorting
- **Shopping Cart**: Persistent basket with real-time updates
- **Order Processing**: Complete order management with status tracking
- **Payment Integration**: Stripe payment gateway for secure transactions
- **Discount System**: Flexible coupon and discount management

### Security & Authentication

- **ASP.NET Core Identity**: Robust user authentication and authorization
- **Role-Based Access Control**: Admin and Member roles with fine-grained permissions
- **Secure Password Policies**: Enforced password complexity requirements
- **Cookie-Based Auth**: HttpOnly, SameSite, and Secure cookie configuration

### Modern UI/UX

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **shadcn/ui Components**: Professional, accessible component library
- **Dark/Light Mode**: System-aware theme switching
- **Real-Time Updates**: Redux Toolkit with RTK Query for optimized state management
- **Loading States**: Skeleton screens and progressive enhancement

### Cloud Integration

- **Cloudinary**: Image upload, storage, and optimization
- **SQL Server**: Robust relational database with Entity Framework Core
- **Environment-Based Configuration**: Secure credential management

## 🏗️ Architecture

### Backend (API/)

```
ASP.NET Core 8.0 Web API
├── Controllers/         RESTful API endpoints
├── Services/           Business logic layer
│   ├── GeminiEmbeddingService    AI embeddings generation
│   ├── PineconeService           Vector database operations
│   ├── PaymentsService           Stripe integration
│   └── ImageService              Cloudinary management
├── Data/               Database context and migrations
├── Entities/           Domain models
├── DTOs/               Data transfer objects
├── Extensions/         Helper methods and extensions
└── Middleware/         Custom exception handling
```

### Frontend (clientv2/)

```
Next.js 15 with App Router
├── app/                App router pages
│   ├── catalog/       Product browsing
│   ├── search/        AI-powered semantic search
│   ├── cart/          Shopping cart
│   ├── checkout/      Order placement
│   ├── admin/         Admin dashboard
│   └── seller/        Seller portal
├── components/        Reusable UI components
├── lib/
│   ├── api/           RTK Query API slices
│   └── store/         Redux store configuration
└── public/            Static assets
```

## 🚀 Technology Stack

### Backend

- **Framework**: ASP.NET Core 8.0
- **ORM**: Entity Framework Core 9.0
- **Database**: SQL Server
- **Authentication**: ASP.NET Core Identity
- **Payment**: Stripe.net SDK
- **AI/ML**: Google Gemini API, Pinecone Vector Database
- **Cloud Storage**: Cloudinary
- **Mapping**: AutoMapper
- **Environment**: DotNetEnv

### Frontend

- **Framework**: Next.js 15 (React 18)
- **Language**: TypeScript 5
- **State Management**: Redux Toolkit + RTK Query
- **UI Framework**: Tailwind CSS 4
- **Component Library**: shadcn/ui (Radix UI)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Theming**: next-themes

### DevOps & Tools

- **Version Control**: Git
- **Package Managers**: npm, NuGet
- **API Testing**: REST Client (.http files)
- **Code Quality**: ESLint, TypeScript strict mode

## 📋 Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/sql-server)
- [Git](https://git-scm.com/)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/lakshanabenayake/Re-Store.git
cd ReStore
```

### 2. Backend Setup

#### Create `.env` file in the API directory

```env
# Database Configuration
DB_SERVER=your_server_name
DB_NAME=ReStore
DB_USER=your_username
DB_PASSWORD=your_password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI/ML Configuration
GEMINI_API_KEY=your_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

#### Update `appsettings.json` with Pinecone configuration

```json
{
  "Pinecone": {
    "IndexHost": "your-index-host.pinecone.io"
  }
}
```

#### Restore packages and run migrations

```bash
cd API
dotnet restore
dotnet ef database update
dotnet run
```

The API will be available at `http://localhost:5000`

### 3. Frontend Setup

#### Install dependencies

```bash
cd clientv2
npm install
```

#### Run development server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🎯 API Endpoints

### Products

- `GET /api/products` - Get paginated products with filters
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/search?query={query}` - AI semantic search
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)
- `POST /api/products/index` - Bulk index products to vector DB (Admin)

### Basket

- `GET /api/basket` - Get user's basket
- `POST /api/basket` - Add item to basket
- `DELETE /api/basket` - Remove item from basket

### Orders

- `GET /api/orders` - Get user's orders
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create new order

### Account

- `POST /api/account/register` - Register new user
- `POST /api/account/login` - User login
- `POST /api/account/logout` - User logout
- `GET /api/account/currentUser` - Get current user info

### Payments

- `POST /api/payments` - Create payment intent
- `GET /api/payments/{basketId}` - Get payment intent

## 🔍 AI-Powered Semantic Search

### How It Works

1. **Query Processing**: User enters natural language search query
2. **Embedding Generation**: Gemini API converts query to 768-dimensional vector
3. **Similarity Search**: Pinecone finds most similar product embeddings
4. **Results Ranking**: Returns products ranked by cosine similarity score
5. **Display**: Shows relevant products with similarity confidence scores

### Example Queries

- "comfortable running shoes for marathon"
- "affordable gaming laptop under $1000"
- "waterproof camping tent for 4 people"
- "professional DSLR camera for beginners"

### Automatic Indexing

Products are automatically indexed to Pinecone when:

- ✅ New product is created
- ✅ Product details are updated
- ✅ Product is deleted (vector removed)

## 👥 User Roles

### Admin

- Full product management (CRUD)
- Access to admin dashboard
- View all orders
- Manage users and roles
- Bulk product indexing

### Member (Customer)

- Browse and search products
- Add items to cart
- Place and track orders
- Manage personal profile

### Seller (Future Enhancement)

- Manage own product listings
- View sales analytics
- Track inventory

## 🎨 UI Components

Built with shadcn/ui and Radix UI primitives:

- **Navigation**: Navbar with search, cart, user menu
- **Product Cards**: Image, details, add-to-cart actions
- **Search Interface**: Real-time semantic search with results
- **Shopping Cart**: Item management, quantity updates
- **Checkout Form**: Address, payment, order review
- **Admin Dashboard**: Product management, analytics
- **Loading States**: Skeleton screens, spinners
- **Modals & Dialogs**: Confirmations, forms
- **Toast Notifications**: Success/error feedback

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adapted layouts for medium screens
- **Desktop**: Full-featured experience with side navigation
- **Touch-Friendly**: Large tap targets, smooth interactions

## 🔒 Security Features

- **Password Hashing**: ASP.NET Core Identity with PBKDF2
- **HTTPS Enforcement**: Secure data transmission
- **CORS Configuration**: Controlled cross-origin requests
- **Cookie Security**: HttpOnly, Secure, SameSite policies
- **SQL Injection Prevention**: Parameterized queries with EF Core
- **XSS Protection**: React's built-in escaping
- **CSRF Protection**: Cookie-based authentication

## 🧪 Testing

### API Testing

Use the included `API.http` file with REST Client extension:

```http
### Get all products
GET http://localhost:5000/api/products

### Semantic search
GET http://localhost:5000/api/products/search?query=running shoes
```

### Manual Testing

1. Register new user account
2. Browse product catalog
3. Add items to cart
4. Proceed to checkout
5. Complete payment (test mode)
6. View order confirmation

## 📊 Database Schema

### Core Entities

- **User**: Authentication and profile
- **Product**: Product catalog with pricing, inventory
- **Basket**: Shopping cart items
- **BasketItem**: Cart line items
- **Order**: Order header with shipping address
- **OrderItem**: Order line items
- **AppCoupon**: Discount codes and rules

### Relationships

- User ↔ Basket (1:1)
- Basket ↔ BasketItem (1:N)
- User ↔ Order (1:N)
- Order ↔ OrderItem (1:N)
- Product ↔ BasketItem/OrderItem (1:N)

## 🚧 Future Enhancements

- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced filtering and faceted search
- [ ] Real-time inventory updates
- [ ] Email notifications (order confirmation, shipping)
- [ ] Admin analytics dashboard
- [ ] Seller portal with analytics
- [ ] Multi-language support (i18n)
- [ ] Progressive Web App (PWA) features
- [ ] Social media integration
- [ ] Product recommendations (collaborative filtering)
- [ ] Advanced discount rules engine

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is created for educational purposes.

## 👨‍💻 Developer

**Lakshana Benayake**

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [ASP.NET Core](https://dotnet.microsoft.com/apps/aspnet) - Web API framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Google Gemini](https://ai.google.dev/) - AI embeddings
- [Pinecone](https://www.pinecone.io/) - Vector database
- [Stripe](https://stripe.com/) - Payment processing
- [Cloudinary](https://cloudinary.com/) - Image management

---

⭐ Star this repository if you find it helpful!
