import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth';
import { itemTotal } from './cartHelper';


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    } else {
        return { color: '#ffffff' }
    }
}

const Menu = ({ history }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-items">
                    <Link className="nav-link" to="/" style={isActive(history, '/')}>Home</Link>
                </li>
                <li className="nav-items">
                    <Link className="nav-link" to="/shop" style={isActive(history, '/shop')}>Shop</Link>
                </li>
                <li className="nav-items shopping-cart">
                    <Link
                        className="nav-link"
                        to="/cart"
                        style={isActive(history, '/cart')}
                    >
                        <i className="fa fa-shopping-cart"></i><sup><small className="cart-badge">{itemTotal()}</small></sup> Cart
                    </Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-items">
                        <Link className="nav-link" to="/user/dashbord" style={isActive(history, '/user/dashbord')}>Dashbord</Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-items">
                        <Link className="nav-link" to="/admin/dashbord" style={isActive(history, '/admin/dashbord')}>Dashbord</Link>
                    </li>
                )}


                {!isAuthenticated() && (
                    <>
                        <li className="nav-items">
                            <Link className="nav-link" to="/signin" style={isActive(history, '/signin')}>Sign in</Link>
                        </li>
                        <li className="nav-items">
                            <Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>Sign up</Link>
                        </li>
                    </>
                )}
                {isAuthenticated() && (
                    <>
                        <li className="nav-items">
                            <span className="nav-link" onClick={() => signout(() => {
                                history.push('/')
                            })}
                                style={{ cursor: 'pointer', color: '#fff' }}
                            >
                                Sign out
                        </span>
                        </li>
                    </>
                )}

            </ul>
        </div>
    )
}

export default withRouter(Menu);