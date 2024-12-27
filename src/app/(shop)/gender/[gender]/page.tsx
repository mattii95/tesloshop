export const revalidate = 60 // 60 seconds

import { getPaginatedProductsWithImages } from "@/actions"
import { Pagination, ProductGrid, Title } from "@/components"
import { Product } from "@/interfaces"

type GenderPageProps = {
    params: Promise<{
        gender: string
    }>,
    searchParams: Promise<{
        page?: string
    }>
}


export default async function GenderPage({ params, searchParams }: GenderPageProps) {
    const { gender } = await params
    const page = (await searchParams).page ? parseInt((await searchParams).page!) : 1
    const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Product['gender'] })

    const labels: Record<string, string> = {
        'men': 'Hombres',
        'women': 'Mujeres',
        'kid': 'Niños',
        'unisex': 'Unisex'
    }

    // if (id === 'kids') {
    //     notFound()
    // }

    return (
        <>
            <Title
                title={`Articulos de ${labels[gender]}`}
                subtitle="Todos los productos"
                className="mb-2"
            />
            <ProductGrid
                products={products}
            />

            <Pagination
                totalPages={totalPages}
            />
        </>
    )
}
