"use server"
import prisma from "@/lib/prisma";
import { sleep } from "@/utils";

export const getStockBySlug = async (slug: string) => {
    try {
        const stock = await prisma.product.findFirst({
            select: { inStock: true },
            where: { slug }
        });

        return stock?.inStock ?? 0
    } catch (error) {
        console.log(error);
        return 0
    }
}