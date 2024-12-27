export const revalidate = 604800 // 7 days

import { notFound } from "next/navigation"
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components"
import { titleFont } from "@/config/fonts"
import { getProductBySlug } from "@/actions"

type ProductPageProps = {
    params: Promise<{
        slug: string
    }>
}

export default async function ProductBySlugPage({ params }: ProductPageProps) {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
        notFound()
    }

    return (
        <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
            {/* Slideshow */}
            <div className="col-span-1 md:col-span-2">

                {/* Mobile Slideshow */}
                <ProductMobileSlideshow
                    title={product.title}
                    images={product.images}
                    className="block md:hidden"
                />

                {/* Desktop Slideshow */}
                <ProductSlideshow
                    title={product.title}
                    images={product.images}
                    className="hidden md:block"
                />
            </div>

            {/* Details */}
            <div className="col-span-1 px-5">
               <StockLabel slug={product.slug} /> 
                
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    {product.title}
                </h1>
                <p className="text-lg mb-5">${product.price}</p>

                {/* Selector de tallas */}
                <SizeSelector
                    selectedSize={product.sizes[0]}
                    availableSizes={product.sizes}
                />

                {/* Selector de cantidad */}
                <QuantitySelector
                    quantity={2}
                />

                {/* Boton */}
                <button className="btn-primary my-5">
                    Agregar al carrito
                </button>

                {/* Description */}
                <h3 className="font-bold text-sm">Descripcion</h3>
                <p className="font-light">
                    {product.description}
                </p>
            </div>
        </div>
    )
}
