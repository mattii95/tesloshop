import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart: CartProduct[];
    getTotalItems: () => number;
    subtotal: () => number;
    tax: () => number;
    total: () => number;
    itemsInCart: () => number;
    getSummaryInformation: () => {
        subtotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({
            cart: [],
            subtotal: () => get().getSummaryInformation().subtotal,
            tax: () => get().getSummaryInformation().tax,
            total: () => get().getSummaryInformation().total,
            itemsInCart: () => get().getSummaryInformation().itemsInCart,
            getTotalItems: () => {
                const { cart } = get();
                const total = cart.reduce((total, item) => total + item.quantity, 0);
                return total;
            },
            getSummaryInformation: () => {
                const { cart } = get();

                const subtotal = cart.reduce(
                    (subtotal, product) => (product.quantity * product.price) + subtotal,
                    0
                );

                const tax = subtotal * 0.5;
                const total = subtotal + tax;
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

                return {
                    subtotal,
                    tax,
                    total,
                    itemsInCart
                };
            },
            addProductToCart: (product: CartProduct) => {
                const { cart } = get()

                // Revisar si el producto existe en el carrito con la talla seleccionada
                const productInCart = cart.some(
                    (item) => item.id === product.id && item.size === product.size
                )

                if (!productInCart) {
                    set({ cart: [...cart, product] })
                    return
                }

                // Se que el producto existe por talla, tengo que incrementarlo
                const updatedCartProducts = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity
                        }
                    }
                    return item
                })

                set({ cart: updatedCartProducts })
            },
            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get()
                const updatedCartProducts = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity }
                    }
                    return item
                })
                set({ cart: updatedCartProducts })
            },
            removeProduct: (product: CartProduct) => {
                const { cart } = get()
                const updatedCartProducts = cart.filter(
                    (item) => item.id !== product.id || item.size !== product.size
                );
                set({ cart: updatedCartProducts })
            }
        }),
        {
            name: 'shopping-cart'
        }
    )
)