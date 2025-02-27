"use client"
import { useEffect, useState } from "react"
import { titleFont } from "@/config/fonts"
import { getStockBySlug } from "@/actions"

type StockLabelProps = {
    slug: string
}

export const StockLabel = ({ slug }: StockLabelProps) => {
    const [stock, setStock] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getStock()
    }, [])

    const getStock = async () => {
        const stock = await getStockBySlug(slug)
        setStock(stock)
        setIsLoading(false)
    }


    return (
        <>
            {
                isLoading
                    ? (
                        <h1 className={`${titleFont.className} antialiased font-bold text-xl bg-gray-200 rounded-md animate-pulse `}>
                            <div className="h-7"></div>
                        </h1>
                    )
                    : (
                        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                            Stock: {stock}
                        </h1>
                    )
            }
        </>
    )
}
