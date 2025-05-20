# EzLandlord - Property Management System

EzLandlord is a comprehensive property management system designed to help landlords manage their properties, tenants, leases, maintenance requests, and payments efficiently.

## Features

- 📊 **Dashboard**: Overview of key metrics and property statistics
- 👥 **Tenant Management**: Track tenant information and history
- 📝 **Lease Management**: Create and manage lease agreements
- 🔧 **Maintenance Requests**: Handle and track property maintenance
- 💰 **Payment Tracking**: Monitor rent payments and financial records
- 🔐 **Authentication**: Secure login and user management

## Tech Stack

### Frontend
- React.js
- Vite
- Axios for API calls
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/EzLandlord.git
cd EzLandlord
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel:
   - `VITE_API_URL`: Your backend API URL

### Backend
1. Deploy to your preferred hosting service (Render, Railway, Heroku, etc.)
2. Set environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret
   - `PORT`: Your preferred port

## Project Structure

```
EzLandlord/
├── backend/
│   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── App.jsx
│   │   │   └── main.jsx
│   │   └── index.html
│   └── README.md
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### Tenants
- GET `/api/tenants` - Get all tenants
- POST `/api/tenants` - Create new tenant
- PUT `/api/tenants/:id` - Update tenant
- DELETE `/api/tenants/:id` - Delete tenant

### Leases
- GET `/api/leases` - Get all leases
- POST `/api/leases` - Create new lease
- PUT `/api/leases/:id` - Update lease
- DELETE `/api/leases/:id` - Delete lease

### Maintenance
- GET `/api/maintenance` - Get all maintenance requests
- POST `/api/maintenance` - Create maintenance request
- PATCH `/api/maintenance/:id` - Update maintenance status

### Payments
- GET `/api/payments` - Get all payments
- POST `/api/payments` - Create new payment
- PATCH `/api/payments/:id` - Update payment status

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email your-email@example.com or open an issue in the repository.

## Acknowledgments

- [React.js](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Vite](https://vitejs.dev/)
