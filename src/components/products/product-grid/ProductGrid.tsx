import { Product } from "@/interfaces"
import { ProductGridItem } from "./ProductGridItem"

type ProductGridProps = {
    products: Product[]
}

export const ProductGrid = ({ products }: ProductGridProps) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-10">
            {
                products.map(product => (
                    <ProductGridItem key={product.slug} product={product} />
                ))
            }
        </div>
    )
}
