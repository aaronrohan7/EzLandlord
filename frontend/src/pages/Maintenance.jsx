import { useState, useEffect } from 'react'
import axios from 'axios'

const Maintenance = () => {
    const [maintenanceRequests, setMaintenanceRequests] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        tenant: '',
        property: '',
        issue: '',
        priority: 'medium',
        status: 'pending'
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
        fetchMaintenanceRequests()
    }, [])

    const fetchMaintenanceRequests = async () => {
        try {
            const response = await api.get('/maintenance')
            console.log('Fetched maintenance requests:', response.data)
            setMaintenanceRequests(response.data)
        } catch (error) {
            console.error('Error fetching maintenance requests:', error)
            if (error.response?.status === 401) {
                // Handle unauthorized error
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
            const data = {
                ...formData,
                date: new Date().toISOString()
            }
            console.log('Submitting maintenance request:', data)
            const response = await api.post('/maintenance', data)
            console.log('Maintenance request added successfully:', response.data)
            setShowModal(false)
            setFormData({
                tenant: '',
                property: '',
                issue: '',
                priority: 'medium',
                status: 'pending'
            })
            fetchMaintenanceRequests()
        } catch (error) {
            console.error('Error adding maintenance request:', error)
            if (error.response?.status === 401) {
                window.location.href = '/login'
            } else {
                setError(error.response?.data?.message || 'Error adding maintenance request')
            }
        }
    }

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            console.log('Updating maintenance request status:', { id, newStatus })
            const response = await api.patch(`/maintenance/${id}`, {
                status: newStatus
            })
            console.log('Maintenance request updated successfully:', response.data)
            fetchMaintenanceRequests()
        } catch (error) {
            console.error('Error updating maintenance request:', error)
            if (error.response?.status === 401) {
                window.location.href = '/login'
            }
        }
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Maintenance Requests</h1>
                <button className="add-btn" onClick={() => setShowModal(true)}>New Request</button>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Tenant</th>
                            <th>Property</th>
                            <th>Issue</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintenanceRequests.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="no-data">No maintenance requests found</td>
                            </tr>
                        ) : (
                            maintenanceRequests.map(request => (
                                <tr key={request._id}>
                                    <td>{new Date(request.date).toLocaleDateString()}</td>
                                    <td>{request.tenant}</td>
                                    <td>{request.property}</td>
                                    <td>{request.issue}</td>
                                    <td>
                                        <span className={`priority ${request.priority.toLowerCase()}`}>
                                            {request.priority}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status ${request.status.toLowerCase()}`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="action-btn view">View</button>
                                            <select
                                                className="status-select"
                                                value={request.status}
                                                onChange={(e) => handleUpdateStatus(request._id, e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="in-progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
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
                            <h2>New Maintenance Request</h2>
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
                                <label htmlFor="issue">Issue Description</label>
                                <textarea
                                    id="issue"
                                    name="issue"
                                    value={formData.issue}
                                    onChange={handleInputChange}
                                    required
                                    rows="4"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="priority">Priority</label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <button type="submit" className="login-btn">Submit Request</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Maintenance 