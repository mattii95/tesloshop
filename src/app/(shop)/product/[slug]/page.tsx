export const revalidate = 604800 // 7 days

import { notFound } from "next/navigation"
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components"
import { titleFont } from "@/config/fonts"
import { getProductBySlug } from "@/actions"
import { Metadata, ResolvingMetadata } from "next"
import { AddToCart } from "./ui/AddToCart"

type ProductPageProps = {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata(
    { params }: ProductPageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const { slug } = await params

    // fetch data
    const product = await getProductBySlug(slug)

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []

    return {
        title: product?.title ?? 'Product not found',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Product not found',
            description: product?.description ?? '',
            images: [`/products/${product?.images[1]}`],
        },
    }
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

                <AddToCart product={product} />

                {/* Description */}
                <h3 className="font-bold text-sm">Descripcion</h3>
                <p className="font-light">
                    {product.description}
                </p>
            </div>
        </div>
    )
}
