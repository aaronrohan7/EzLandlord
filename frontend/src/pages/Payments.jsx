import { useState, useEffect } from 'react'
import axios from 'axios'

const Payments = () => {
    const [payments, setPayments] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        tenant: '',
        property: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        status: 'paid'
    })
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
        fetchPayments()
    }, [])

    const fetchPayments = async () => {
        try {
            const response = await api.get('/payments')
            console.log('Fetched payments:', response.data)
            setPayments(response.data)
        } catch (error) {
            console.error('Error fetching payments:', error)
            if (error.response?.status === 401) {
                window.location.href = '/login'
            }
        }
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log('Submitting payment data:', formData)
            const response = await api.post('/payments', formData)
            console.log('Payment added successfully:', response.data)
            setShowModal(false)
            setFormData({
                tenant: '',
                property: '',
                amount: '',
                date: new Date().toISOString().split('T')[0],
                status: 'paid'
            })
            fetchPayments()
        } catch (error) {
            console.error('Error adding payment:', error)
            if (error.response?.status === 401) {
                window.location.href = '/login'
            } else {
                setError(error.response?.data?.message || 'Error adding payment')
            }
        }
    }

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            console.log('Updating payment status:', { id, newStatus })
            const response = await api.patch(`/payments/${id}`, {
                status: newStatus
            })
            console.log('Payment updated successfully:', response.data)
            fetchPayments()
        } catch (error) {
            console.error('Error updating payment:', error)
            if (error.response?.status === 401) {
                window.location.href = '/login'
            }
        }
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Payments</h1>
                <button className="add-btn" onClick={() => setShowModal(true)}>New Payment</button>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Tenant</th>
                            <th>Property</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="no-data">No payments found</td>
                            </tr>
                        ) : (
                            payments.map(payment => (
                                <tr key={payment._id}>
                                    <td>{new Date(payment.date).toLocaleDateString()}</td>
                                    <td>{payment.tenant}</td>
                                    <td>{payment.property}</td>
                                    <td>${payment.amount}</td>
                                    <td>
                                        <span className={`status ${payment.status.toLowerCase()}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn view">View</button>
                                        <select
                                            className="status-select"
                                            value={payment.status}
                                            onChange={(e) => handleUpdateStatus(payment._id, e.target.value)}
                                        >
                                            <option value="paid">Paid</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>New Payment</h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {error && <div className="error-message">{error}</div>}
                            <div className="form-group">
                                <label htmlFor="tenant">Tenant</label>
                                <input
                                    type="text"
                                    id="tenant"
                                    name="tenant"
                                    value={formData.tenant}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="property">Property</label>
                                <input
                                    type="text"
                                    id="property"
                                    name="property"
                                    value={formData.property}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="login-btn">Add Payment</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Payments 