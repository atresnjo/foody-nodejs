import { useRecoilState, useSetRecoilState } from 'recoil'
import { IProductItem } from '../../models/dtos'
import { sumBy } from 'lodash-es'
import { useMutation } from 'graphql-hooks'
import { initialOverlayState } from '../../state/overlayAtom'
import { CartState, initialCartState } from '../../state/cartAtom'
import { useEffect } from 'react'
import { LocalStorageKey } from '../../state'

const CREATE_CHECKOUT_MUTATION = `mutation createCheckoutOrder($orderInfo: CreateCheckoutOrderInput!) {
    createCheckoutOrder(orderInfo: $orderInfo)
  }
`

const Cart = () => {
    const [cartState, setCartState] = useRecoilState<CartState>(
        initialCartState
    )

    const [createPurchase, loading] = useMutation(CREATE_CHECKOUT_MUTATION)
    const setOverlayState = useSetRecoilState<boolean>(initialOverlayState)

    const removeProduct = (item: IProductItem['id']): void => {
        const removed: IProductItem[] = cartState.products.filter(
            (x: IProductItem): boolean => x.id !== item
        )
        setCartState({
            products: removed,
            price: sumBy(removed, 'price'),
            isLoading: false,
        })
    }

    useEffect(() => {
        window.localStorage.setItem(
            LocalStorageKey.CART_STATE,
            JSON.stringify(cartState)
        )
    }, [cartState])

    const createCheckoutOrder = async () => {
        try {
            setCartState({ ...cartState, isLoading: true })
            await createPurchase({
                variables: {
                    orderInfo: {
                        productIds: cartState.products.map((x) => x.id),
                    },
                },
            })
            setOverlayState(true)
        } catch (err) {
            console.log(err)
        } finally {
            setCartState({ products: [], price: 0, isLoading: false })
        }
    }

    return (
        <div className="my-1 min-h-screen w-full  sm:my-1 lg:w-full xl:pl-5 md:pl-5 lg:max-w-sm xl:my-1 xl:w-1/2">
            <div className="container pt-6">
                <div className="card h-screen shadow-lg bg-default">
                    <div className="card-body">
                        <div className="col-span-1 lg:col-span-4 ">
                            <h2 className="my-4 text-3xl font-bold card-title">
                                Order summary 😋
                            </h2>
                            <div className="p-2 pt-5">
                                {cartState.products.map(
                                    (product: IProductItem) => {
                                        return (
                                            <div className="grid grid-cols-8 gap-4 mb-5">
                                                <div className="-mx-4">
                                                    <img
                                                        src={product.imageUrl}
                                                        className="rounded-md"
                                                        width={78}
                                                    />
                                                </div>
                                                <div className="pl-3 col-span-6">
                                                    <div className="flex">
                                                        <span className="text-md font-normal flex-grow">
                                                            {product.title}
                                                        </span>
                                                        <button>
                                                            <svg
                                                                onClick={() =>
                                                                    removeProduct(
                                                                        product.id
                                                                    )
                                                                }
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                className="cursor-pointer inline-block"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H8Z"
                                                                    fill="red"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M1 5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5ZM5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"
                                                                    fill="red"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <span className="text-md font-extrabold">
                                                        {product.price} €
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                            <div className="flex flex-wrap justify-between items-center mt-6 pt-6 border-t">
                                <span className="text-lg font-bold">
                                    Total:
                                </span>
                                <span className="text-lg font-bold">
                                    €{cartState.price}
                                </span>
                                <div className="md:pt-3">
                                    <button
                                        onClick={createCheckoutOrder}
                                        disabled={
                                            cartState.products.length <= 0
                                        }
                                        className={
                                            'btn text-white btn-wide btn-primary ' +
                                            (loading.loading === true
                                                ? 'loading + '
                                                : ' + ') +
                                            (cartState.products.length === 0
                                                ? 'btn-disabled'
                                                : '')
                                        }
                                    >
                                        {cartState.products.length === 0
                                            ? 'Please add a product first'
                                            : 'Checkout'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
