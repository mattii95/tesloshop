import { Size } from "@/interfaces"
import clsx from "clsx"

type SizeSelectorProps = {
    selectedSize?: Size
    availableSizes: Size[]
    onSizeChanged: (size: Size) => void
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: SizeSelectorProps) => {
    return (
        <div className="my-5">
            <h3 className="font-bold mb-4">Tallas disponibles</h3>
            <div className="flex">
                {
                    availableSizes.map(size => (
                        <button
                            key={size}
                            onClick={() => onSizeChanged(size)}
                            className={
                                clsx(
                                    "mx-2 hover:underline hover:font-bold text-lg",
                                    {
                                        "underline font-bold": size === selectedSize
                                    }
                                )
                            }
                        >
                            {size}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}
