import React from 'react';
import { Nav, NavbarBrand, NavLink } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export function IndexHeader() {
    const navigate = useNavigate();
    return (
        <Nav
            className="sb-topnav navbar navbar-expand navbar-dark bg-dark"
            style={{ height: '58px' }}
        >
            <NavbarBrand className="ps-3" as={Link} to="/admin">
                MainProject Admin Page
            </NavbarBrand>
            <NavLink
                className="me-lg-4 ms-auto"
                style={{ color: 'var(--bs-gray-100)' }}
                onClick={() => {
                    window.localStorage.removeItem('admin');
                    navigate('/admin/login');
                }}
            >
                {' '}
                Logout{' '}
            </NavLink>
        </Nav>
    );
}
