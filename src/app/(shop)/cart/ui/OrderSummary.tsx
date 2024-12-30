"use client"

import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import { useEffect, useState } from "react"

export default function OrderSummary() {
    const itemsInCart = useCartStore(state => state.itemsInCart())
    const subtotal = useCartStore(state => state.subtotal())
    const tax = useCartStore(state => state.tax())
    const total = useCartStore(state => state.total())
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded) return <p>Cargando ..</p>

    return (
        <div className="grid grid-cols-2">
            <span>Nro. Productos</span>
            <span className="text-right">
                {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
            </span>

            <span>Subtotal</span>
            <span className="text-right">
                {currencyFormat(subtotal)}
            </span>

            <span>Impuestos (15%)</span>
            <span className="text-right">
                {currencyFormat(tax)}
            </span>

            <span className="mt-5 text-2xl">Total</span>
            <span className="mt-5 text-2xl text-right">
                {currencyFormat(total)}
            </span>
        </div>
    )
}
