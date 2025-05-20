import { useState, useEffect } from 'react'
import axios from 'axios'

const Tenants = () => {
    const [tenants, setTenants] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        property: '',
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
        fetchTenants()
    }, [])

    const fetchTenants = async () => {
        try {
            const response = await api.get('/tenants')
            console.log('Fetched tenants:', response.data)
            setTenants(response.data)
        } catch (error) {
            console.error('Error fetching tenants:', error)
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
            console.log('Submitting tenant data:', formData)
            const response = await api.post('/tenants', formData)
            console.log('Tenant added successfully:', response.data)
            setShowModal(false)
            setFormData({
                name: '',
                email: '',
                phone: '',
                property: '',
                status: 'active'
            })
            fetchTenants()
        } catch (error) {
            console.error('Error adding tenant:', error)
            if (error.response?.status === 401) {
                window.location.href = '/login'
            } else {
                setError(error.response?.data?.message || 'Error adding tenant')
            }
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this tenant?')) {
            try {
                console.log('Deleting tenant:', id)
                const response = await api.delete(`/tenants/${id}`)
                console.log('Tenant deleted successfully:', response.data)
                fetchTenants()
            } catch (error) {
                console.error('Error deleting tenant:', error)
                if (error.response?.status === 401) {
                    window.location.href = '/login'
                }
            }
        }
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Tenants</h1>
                <button className="add-btn" onClick={() => setShowModal(true)}>Add New Tenant</button>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Property</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenants.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="no-data">No tenants found</td>
                            </tr>
                        ) : (
                            tenants.map(tenant => (
                                <tr key={tenant._id}>
                                    <td>{tenant.name}</td>
                                    <td>{tenant.email}</td>
                                    <td>{tenant.phone}</td>
                                    <td>{tenant.property}</td>
                                    <td>
                                        <span className={`status ${tenant.status}`}>
                                            {tenant.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn edit">Edit</button>
                                        <button
                                            className="action-btn delete"
                                            onClick={() => handleDelete(tenant._id)}
                                        >
                                            Delete
                                        </button>
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
                            <h2>Add New Tenant</h2>
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
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
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
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <button type="submit" className="login-btn">Add Tenant</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Tenants 