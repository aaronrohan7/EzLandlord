import { useState, useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalTenants: 0,
        activeLeases: 0,
        pendingMaintenance: 0,
        monthlyRevenue: 0
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Get token from localStorage
    const token = localStorage.getItem('token')

    // Configure axios with auth header
    const api = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            // Fetch tenants
            const tenantsResponse = await api.get('/tenants')
            const totalTenants = tenantsResponse.data.length

            // Fetch leases
            const leasesResponse = await api.get('/leases')
            const activeLeases = leasesResponse.data.filter(lease => lease.status === 'active').length

            // Fetch maintenance requests
            const maintenanceResponse = await api.get('/maintenance')
            const pendingMaintenance = maintenanceResponse.data.filter(m => m.status === 'Pending').length

            // Fetch payments for current month
            const paymentsResponse = await api.get('/payments')
            const currentMonth = new Date().getMonth()
            const currentYear = new Date().getFullYear()
            const monthlyRevenue = paymentsResponse.data
                .filter(payment => {
                    const paymentDate = new Date(payment.date)
                    return paymentDate.getMonth() === currentMonth &&
                        paymentDate.getFullYear() === currentYear &&
                        payment.status === 'paid'
                })
                .reduce((sum, payment) => sum + payment.amount, 0)

            setStats({
                totalTenants,
                activeLeases,
                pendingMaintenance,
                monthlyRevenue
            })
            setError('')
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
            if (error.response?.status === 401) {
                window.location.href = '/login'
            } else {
                setError('Error loading dashboard data')
            }
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="dashboard">
                <h1>Dashboard</h1>
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Loading dashboard data...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="dashboard">
                <h1>Dashboard</h1>
                <div className="error-message">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p className="dashboard-subtitle">Welcome back! Here's an overview of your property management.</p>
            </div>
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <div className="dashboard-card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h3>Total Tenants</h3>
                    <p>{stats.totalTenants}</p>
                </div>
                <div className="dashboard-card">
                    <div className="dashboard-card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h3>Active Leases</h3>
                    <p>{stats.activeLeases}</p>
                </div>
                <div className="dashboard-card">
                    <div className="dashboard-card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </div>
                    <h3>Pending Maintenance</h3>
                    <p>{stats.pendingMaintenance}</p>
                </div>
                <div className="dashboard-card">
                    <div className="dashboard-card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3>Monthly Revenue</h3>
                    <p>${stats.monthlyRevenue.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard 