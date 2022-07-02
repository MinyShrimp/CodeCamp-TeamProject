export interface IProductCategoryInput {
    name: string;
    parent: {
        name: string;
        parent: {
            name: string;
            parent: {
                name: string;
            } | null;
        } | null;
    } | null;
}

export interface IProductInput {
    id: string;
    name: string;
    price: number;
    stock_count: number;

    book: {
        description: string;

        author: {
            name: string;
            description: string;
        };

        publisher: {
            name: string;
            description: string;
        };

        book_images: Array<{
            isMain: boolean;
            file: {
                url: string;
            };
        }>;
    };

    productCategory: IProductCategoryInput | null;

    productTags: Array<{
        name: string;
    }>;
}

export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    stock_count: number;
    categorys: Array<string>;

    author: {
        name: string;
        description: string;
    };

    publisher: {
        name: string;
        description: string;
    };

    images: Array<{
        isMain: boolean;
        url: string;
    }>;

    tags: Array<string>;
}

export interface IPaymentInput {
    imp_uid: string;
    merchant_uid: string;
    paid_amount: number;
    status: 'PAID' | 'CANCELLED';
}
