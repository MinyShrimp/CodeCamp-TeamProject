import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Page_Container } from '../styles/styled';

export function Page401() {
    return (
        <Container as={Page_Container}>
            <h1 className="display-1">401</h1>
            <p className="lead">Unauthorized</p>
            <p>Access to this resource is denied.</p>
            <Link to="/admin">Return to Dashboard</Link>
        </Container>
    );
}
