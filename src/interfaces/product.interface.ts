export interface Product {
    id: string
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    // type: ValidTypes;
    gender: Gender;
}

export type CartProduct = Pick<Product, 'id' | 'slug' | 'title' | 'price'> & {
    quantity: number,
    size: Size,
    image: string
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';
export type Gender = 'men' | 'women' | 'kid' | 'unisex'
