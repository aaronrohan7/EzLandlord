import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        // Clear auth token and redirect to login
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>EzLandlord</h1>
            </div>
            <div className="navbar-menu">
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar 