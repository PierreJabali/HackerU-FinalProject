import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const userData = JSON.parse(localStorage.getItem('user'));

    const [user, setUser] = useState(userData);

    return (
        <div>
            <header className="header h-[5rem] bg-purple-200 text-purple-800">
                <div className="page-brand bg-purple-900 ">
                    <a className="link" href="/dashboard">
                        <span className="brand">
                            EStore
                        </span>
                        <span className="brand-mini">ES</span>
                    </a>
                </div>
                <div className="flexbox flex-1">
                    <ul className="nav navbar-toolbar">
                        <li>
                            <Link className="nav-link sidebar-toggler js-sidebar-toggler">
                                <i className="ti-menu"></i>
                            </Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-toolbar">
                        <li className="dropdown dropdown-user ">
                            <Link className="nav-link dropdown-toggle link"
                                data-toggle="dropdown">
                                <img src={`https://localhost:7033/api/Customer/GetImage/${user.image}`} alt="" />
                                <span></span>{user.firstName} {user.lastName}
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <Link className="dropdown-item" onClick={handleLogout}>
                                    <i className="fa fa-power-off"></i>Logout
                                </Link>
                            </ul>
                        </li>
                    </ul>
                </div>
            </header>
            <nav className="page-sidebar bg-purple-900 text-white " id="sidebar">
                <div id="sidebar-collapse">
                    <div className="admin-block row bg-purple-700 flex text-white" style={{ margin: 'auto' }}>
                        <div >
                            <img src={`https://localhost:7033/api/Customer/GetImage/${user.image}`} alt="" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
                        </div>
                        <div className="admin-info">
                            <div className="font-strong">James Brown</div>
                            <small>{user.role}</small>
                        </div>
                    </div>
                    <ul className="side-menu metismenu">
                        <li>
                            <NavLink to="/dashboard" activeclassname="active">
                                <i className="sidebar-item-icon fa fa-th-large"></i>
                                <span className="nav-label">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="heading">PAGES</li>
                        <li>
                            <NavLink to="/categories" activeclassname="active">
                                <i className="sidebar-item-icon fa fa-calendar"></i>
                                <span className="nav-label">Categories</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/products" activeclassname="active">
                                <i className="sidebar-item-icon fa fa-product-hunt"></i>
                                <span className="nav-label">Products</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/messages" activeclassname="active">
                                <i className="sidebar-item-icon fa fa-envelope"></i>
                                <span className="nav-label">Messages</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/customers" activeclassname="active">
                                <i className="sidebar-item-icon fa fa-users"></i>
                                <span className="nav-label">Customers</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile" activeclassname="active">
                                <i className="sidebar-item-icon fa fa-user"></i>
                                <span className="nav-label">Profile</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/settings" activeclassname="active">
                                <i className="sidebar-item-icon fa fa-cogs"></i>
                                <span className="nav-label">Settings</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Header;