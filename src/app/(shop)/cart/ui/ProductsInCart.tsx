"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import Link from "next/link"

export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false)
    const productsInCar = useCartStore(state => state.cart)
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
    const removeProduct = useCartStore(state => state.removeProduct)

    useEffect(() => {
        setLoaded(true)
    }, [])


    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <>
            {
                productsInCar.map(product => (
                    <div
                        key={`${product.slug}-${product.size}`}
                        className="flex mb-5"
                    >
                        <Image
                            src={`/products/${product.image}`}
                            width={100}
                            height={100}
                            alt={product.title}
                            className="mr-5 rounded"
                            style={{
                                width: '100px',
                                height: '100px'
                            }}
                        />
                        <div>
                            <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer">{product.title}</Link>
                            <p>Talle: {product.size}</p>
                            <p>${product.price}</p>

                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={value => updateProductQuantity(product, value)}
                            />
                            <button
                                onClick={() => removeProduct(product)}
                                className="underline mt-3"
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
