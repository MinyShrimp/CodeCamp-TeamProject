import { Card, Input } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
    background: #9beffe;
    height: calc(100vh - 210px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const InputGroup = styled.div`
    margin-bottom: 2rem;
`;

export const InputItemBetween = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const InputNumber = styled(Input)`
    width: 100%;
    margin-right: 1rem;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 1rem;
`;

export const ProductCardStyle = styled(Card)`
    padding: 1rem;
`;

export const CardStyle = styled(Card)`
    width: 600px;
    height: auto;
    padding: 3rem;
`;

export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

export const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Subtitle = styled.p`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.2em;
`;

export const Timer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
`;
