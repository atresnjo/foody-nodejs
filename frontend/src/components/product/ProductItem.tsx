import { IProductItem, ITag } from '../../models/dtos'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
    ICreateReviewOverlay,
    initialCreateReviewOverlayState,
} from '../../state/createReviewOverlayAtom'
import { CartState, initialCartState } from '../../state/cartAtom'
import sumBy from 'lodash-es/sumBy'
// @ts-ignore
import ReactStars from 'react-rating-stars-component'

export interface ProductItemProps {
    product: IProductItem
    setProductId: (id: number) => void
}
const ProductItem = ({ product, setProductId }: ProductItemProps) => {
    const setCreateReviewOverlayState = useSetRecoilState<ICreateReviewOverlay>(
        initialCreateReviewOverlayState
    )

    const [cartState, setCartState] = useRecoilState<CartState>(
        initialCartState
    )

    const addProduct = (item: IProductItem) => {
        const update = [item, ...cartState.products]
        setCartState({
            products: update,
            price: sumBy(update, 'price'),
            isLoading: false,
        })
    }

    console.log(product)
    return (
        <div className="flex flex-col space-between card bordered h-full">
            <div className="relative img-container">
                <img src={product.imageUrl} className="rounded-md" alt="" />
                {product.isTrending && (
                    <span className="absolute inset-x-0 top-0">
                        <div className="text-center uppercase badge-lg badge-accent">
                            trending 🔥
                        </div>
                    </span>
                )}
            </div>
            <div className="card-body text-center ">
                <h1 className="card-title text-2xl font-bold text-center">
                    {product.title}
                </h1>
                <h2 className="pt-2 text-xl font-semibold h-full card-title">
                    {product.description}
                </h2>
                <div className="pt-6 flex-wrap space-x-2 self-center md:space-y-2 md:flex-row">
                    {product.tags.map((tag: ITag) => {
                        return (
                            <div className="badge mx-auto badge-secondary">
                                {tag.name}
                            </div>
                        )
                    })}
                </div>
                <div className="flex pt-8 flex-col max-h-full justify-center">
                    <div className="flex self-center flex-col mt-2 mb-4">
                        <div
                            className="cursor-pointer h-full w-full"
                            onClick={() => setProductId(product.id)}
                        >
                            <ReactStars
                                size={24}
                                edit={false}
                                isHalf={true}
                                value={product.totalRating}
                            />
                        </div>

                        <button
                            onClick={() => {
                                console.log('click')
                                setCreateReviewOverlayState({
                                    productId: product.id,
                                    open: true,
                                })
                            }}
                            className="mb-6 mt-2 btn-outline btn btn-sm btn-secondary"
                        >
                            Leave review
                        </button>
                    </div>
                </div>
                <div className="p-2 flex flex-col">
                    <div className="badge font-bold ml-2 badge-error">
                        €{product.price}
                    </div>
                    <button
                        onClick={() => addProduct(product)}
                        className="mt-3 btn btn-block text-white btn-primary"
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
