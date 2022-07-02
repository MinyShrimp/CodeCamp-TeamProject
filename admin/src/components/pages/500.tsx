import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Page_Container } from '../styles/styled';

export function Page500() {
    return (
        <Container as={Page_Container}>
            <h1 className="display-1">500</h1>
            <p className="lead">Internal Server Error</p>
            <Link to="/admin">Return to Dashboard</Link>
        </Container>
    );
}
