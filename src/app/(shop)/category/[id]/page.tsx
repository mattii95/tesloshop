import { ProductGrid, Title } from "@/components"
import { Product, Categories } from "@/interfaces"
import { initialData } from "@/seed/seed"
import { notFound } from "next/navigation"

type CheckoutPageProps = {
    params: {
        id: Product['gender']
    }
}


export default async function CheckoutPage({ params }: CheckoutPageProps) {
    const { id } = await params
    const products = initialData.products.filter(p => p.gender === id)

    const labels: Record<Product['gender'], string> = {
        'men' : 'Hombres',
        'women' : 'Mujeres',
        'kid' : 'Niños',
        'unisex' : 'Unisex'
    }
    
    // if (id === 'kids') {
    //     notFound()
    // }
    
    return (
        <>
            <Title 
                title={`Articulos de ${labels[id]}`}
                subtitle="Todos los productos"
                className="mb-2"
            />
            <ProductGrid 
                products={products}
            />
        </>
    )
}
