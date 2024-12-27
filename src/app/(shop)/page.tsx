export const revalidate = 60 // 60 seconds

import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

type HomePageProps = {
    searchParams: Promise<{
        page?: string
    }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
    const page = (await searchParams).page ? parseInt((await searchParams).page!) : 1
    const { products, totalPages } = await getPaginatedProductsWithImages({ page })

    if (products.length === 0) {
        redirect('/')
    }


    return (
        <>
            <Title
                title="Tienda"
                subtitle="Todos los productos"
            />

            <ProductGrid
                products={products}
            />

            <Pagination 
                totalPages={totalPages}
            />
        </>
    );
}
