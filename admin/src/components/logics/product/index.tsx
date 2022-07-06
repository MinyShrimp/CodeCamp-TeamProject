import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { LogicHeader } from '../header';
import { sendGraphQL } from '../sendGraphQL';
import { ProductCard } from './card';
import { IProduct } from './interface';

export function ProductIndex() {
    const [products, setProducts] = useState<Array<IProduct>>([]);

    async function getAllProducts() {
        const { data, message } = await sendGraphQL({
            query: `query { fetchProductsAll { id, name, price, point, description } }`,
        });

        if (data) {
            if (data.fetchProductsAll) {
                setProducts(data.fetchProductsAll);
            }
        } else {
            console.log(message);
        }
    }

    useEffect(() => {
        getAllProducts();
        return () => {};
    }, []);

    return (
        <>
            <LogicHeader entityName="Product" />
            <div
                style={{
                    background: '#9beffe',
                    height: 'calc(100vh - 210px)',
                    padding: '1rem',
                    overflowX: 'hidden',
                    overflowY: 'scroll',
                }}
            >
                {products.map((p) => {
                    return <ProductCard key={v4()} product={p} />;
                })}
            </div>
        </>
    );
}
