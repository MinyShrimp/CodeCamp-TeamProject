import { Link } from 'react-router-dom';

export function LogicHeader(props: { entityName: string }) {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }}
            >
                <div>
                    <p className="mb-0" style={{ color: 'var(--bs-blue)' }}>
                        Logic
                    </p>
                    <Link
                        style={{
                            textDecoration: 'none',
                            color: 'var(--bs-gray-dark)',
                        }}
                        className="mb-0 h1"
                        id="entity_name"
                        to={`/admin/logic/${props.entityName.toLowerCase()}`}
                    >
                        {props.entityName}
                    </Link>
                </div>
            </div>
            <hr />
        </>
    );
}
