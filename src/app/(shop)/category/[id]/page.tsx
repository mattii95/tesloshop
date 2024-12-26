import { notFound } from "next/navigation"

type CheckoutPageProps = {
    params: {
        id: string
    }
}


export default async function CheckoutPage({ params }: CheckoutPageProps) {
    const { id } = await params
    if (id === 'kids') {
        notFound()
    }
    
    return (
        <div>CheckoutPage</div>
    )
}
