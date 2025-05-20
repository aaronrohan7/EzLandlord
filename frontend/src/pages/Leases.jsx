import { useState, useEffect } from 'react'
import axios from 'axios'

const Leases = () => {
    const [leases, setLeases] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        tenant: '',
        property: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        rent: '',
        deposit: '',
        status: 'active'
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
        fetchLeases()
    }, [])

    const fetchLeases = async () => {
        try {
            const response = await api.get('/leases')
            console.log('Fetched leases:', response.data)
            setLeases(response.data)
        } catch (error) {
            console.error('Error fetching leases:', error)
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
            console.log('Submitting lease data:', formData)
            const response = await api.post('/leases', formData)
            console.log('Lease added successfully:', response.data)
            setShowModal(false)
            setFormData({
                tenant: '',
                property: '',
                startDate: new Date().toISOString().split('T')[0],
                endDate: '',
                rent: '',
                deposit: '',
                status: 'active'
            })
            fetchLeases()
        } catch (error) {
            console.error('Error adding lease:', error)
            if (error.response?.status === 401) {
                window.location.href = '/login'
            } else {
                setError(error.response?.data?.message || 'Error adding lease')
            }
        }
    }

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            console.log('Updating lease status:', { id, newStatus })
            const response = await api.patch(`/leases/${id}`, {
                status: newStatus
            })
            console.log('Lease updated successfully:', response.data)
            fetchLeases()
        } catch (error) {
            console.error('Error updating lease:', error)
            if (error.response?.status === 401) {
                window.location.href = '/login'
            }
        }
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Leases</h1>
                <button className="add-btn" onClick={() => setShowModal(true)}>New Lease</button>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Tenant</th>
                            <th>Property</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Rent</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leases.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="no-data">No leases found</td>
                            </tr>
                        ) : (
                            leases.map(lease => (
                                <tr key={lease._id}>
                                    <td>{lease.tenant}</td>
                                    <td>{lease.property}</td>
                                    <td>{new Date(lease.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(lease.endDate).toLocaleDateString()}</td>
                                    <td>${lease.rent}</td>
                                    <td>
                                        <span className={`status ${lease.status.toLowerCase()}`}>
                                            {lease.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn view">View</button>
                                        <select
                                            className="status-select"
                                            value={lease.status}
                                            onChange={(e) => handleUpdateStatus(lease._id, e.target.value)}
                                        >
                                            <option value="active">Active</option>
                                            <option value="expired">Expired</option>
                                            <option value="terminated">Terminated</option>
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
                            <h2>New Lease</h2>
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
                                <label htmlFor="startDate">Start Date</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">End Date</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="rent">Monthly Rent</label>
                                <input
                                    type="number"
                                    id="rent"
                                    name="rent"
                                    value={formData.rent}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="deposit">Security Deposit</label>
                                <input
                                    type="number"
                                    id="deposit"
                                    name="deposit"
                                    value={formData.deposit}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <button type="submit" className="login-btn">Create Lease</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Leases 