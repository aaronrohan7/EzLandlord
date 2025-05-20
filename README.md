Smart Property Management System
A MERN stack application for landlords and tenants to manage properties efficiently.
Features

Tenant onboarding with validation
Rent collection with auto-reminders (cron job)
Maintenance requests with photo uploads (GridFS)
Lease agreements with e-signatures and PDF download
Financial analytics with Chart.js visualizations
Real-time chat using Socket.IO
JWT-based authentication with role-based access

Setup Instructions

Install Dependencies:
Backend: cd backend && npm install
Frontend (optional): cd frontend && npm install

Set Up MongoDB:
Install and run MongoDB locally.
Create a database named property-management.

Environment Variables:
Create a .env file in the root directory:MONGODB_URI=mongodb://localhost/property-management
JWT_SECRET=your_jwt_secret_key
PORT=5000

Run Backend:
cd backend && npm start

Run Frontend:
Serve frontend/public/index.html using npx http-server or open directly in a browser.

Access the App:
Backend: http://localhost:5000
Frontend: http://localhost:3000 (or browser file URL)

Technologies

Backend: Node.js, Express.js, MongoDB, JWT, Multer, pdfkit, node-cron, Socket.IO
Frontend: React, Tailwind CSS, Chart.js, react-hot-toast, Socket.IO client
