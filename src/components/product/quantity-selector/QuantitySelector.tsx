"use client"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

type QuantitySelectorProps = {
    quantity: number
    onQuantityChanged: (quantity: number) => void
}


export const QuantitySelector = ({ quantity, onQuantityChanged }: QuantitySelectorProps) => {

    const onValueChanged = (value: number) => {
        if (quantity + value < 1) return
        onQuantityChanged(quantity + value)
    }

    return (
        <div className="flex">
            <button onClick={() => onValueChanged(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded-md">
                {quantity}
            </span>
            <button onClick={() => onValueChanged(1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}
