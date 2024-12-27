"use server"

import { Product } from "@/interfaces"
import prisma from "@/lib/prisma"

type PaginationOptions = {
    page?: number
    take?: number
    gender?: Product['gender']
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1
    if (page < 1) page = 1

    try {
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            },
            where: {
                gender
            }
        })

        const totalCount = await prisma.product.count({ where: { gender } })
        const totalPages = Math.ceil(totalCount / take)

        return {
            currentPage: page,
            totalPages,
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(img => img.url)
            }))
        }

    } catch {
        throw Error('No se pudo encontrar los productos')
    }
}