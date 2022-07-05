import { IProduct, IProductCategoryInput, IProductInput } from './interface';

function getCategory(
    category: IProductCategoryInput | null, //
): Array<string> {
    const result: Array<string | null> = [null, null, null, null];
    if (category) {
        result[3] = category.name;
        if (category.parent) {
            result[2] = category.parent.name;
            if (category.parent.parent) {
                result[1] = category.parent.parent.name;
                if (category.parent.parent.parent) {
                    result[0] = category.parent.parent.parent.name;
                }
            }
        }
    }

    return result.filter((r) => r !== null) as Array<string>;
}

export function TransforProduct(
    input: IProductInput, //
): IProduct {
    return {
        id: input.id,
        name: input.name,
        price: input.price,
        stock_count: input.stock_count,

        author: input.book.author,
        publisher: input.book.publisher,
        description: input.book.description,

        images: input.book.book_images.map((img) => {
            return {
                isMain: img.isMain,
                url: img.file.url,
            };
        }),

        tags: input.productTags.map((tag) => tag.name),

        categorys: getCategory(input.productCategory),
    };
}
