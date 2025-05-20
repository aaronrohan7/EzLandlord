import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
            const response = await axios.post(`http://localhost:5000${endpoint}`, formData)
            localStorage.setItem('token', response.data.token)
            setIsAuthenticated(true)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.message || (isLogin ? 'Login failed' : 'Registration failed'))
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>{isLogin ? 'Login to EzLandlord' : 'Create Account'}</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <button type="submit" className="login-btn">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <div className="form-footer">
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            className="toggle-btn"
                            onClick={() => {
                                setIsLogin(!isLogin)
                                setError('')
                                setFormData({
                                    name: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: ''
                                })
                            }}
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login 