import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// @ts-ignore
import Img_404 from '../../assets/img/error-404-monochrome.svg';
import { Page_Container } from '../styles/styled';

export function Page404() {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname === '/') {
            navigate('/admin', { replace: true });
        }
    }, [navigate]);

    return (
        <Container as={Page_Container}>
            <img className="mb-4 img-error" src={Img_404} alt="404" />
            <p className="lead">
                This requested URL was not found on this server.
            </p>
            <Link to="/admin">Return to Dashboard</Link>
        </Container>
    );
}
