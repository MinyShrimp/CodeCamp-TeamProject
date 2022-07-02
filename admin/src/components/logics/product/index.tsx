import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { LogicHeader } from '../header';
import { sendGraphQL } from '../sendGraphQL';
import { ProductCard } from './card';
import { IProduct, IProductInput } from './interface';
import { TransforProduct } from './transfor';

export function ProductIndex() {
    const [products, setProducts] = useState<Array<IProduct>>([]);

    async function getAllProducts() {
        const { data, message } = await sendGraphQL({
            query: `query { fetchProducts { id, name, price, stock_count, book { description, publisher { name, description }, author { name, description }, book_images { isMain, file { url } } }, productCategory { name, parent { name, parent { name, parent { name } } } }, productTags { name } } }`,
        });

        if (data) {
            if (data.fetchProducts) {
                setProducts(
                    data.fetchProducts.map((product: IProductInput) =>
                        TransforProduct(product),
                    ),
                );
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
