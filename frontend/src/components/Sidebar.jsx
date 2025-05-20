import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    const menuItems = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/tenants', label: 'Tenants' },
        { path: '/maintenance', label: 'Maintenance' },
        { path: '/payments', label: 'Payments' },
        { path: '/leases', label: 'Leases' }
    ]

    return (
        <div className="sidebar">
            <div className="sidebar-menu">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive ? 'sidebar-item active' : 'sidebar-item'
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Sidebar 