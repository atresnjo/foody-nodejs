import React, { useState } from 'react'
import Navigation from '../components/Navigation'
import Cart from '../components/cart/Cart'
import { useRecoilValue } from 'recoil'
import { useQuery } from 'graphql-hooks'
import ProductSkeleton from '../components/product/ProductSkeleton'
import ProductDateNavigation from '../components/product/ProductDateNavigation'
import ProductDateNavigationSkeleton from '../components/product/ProductDateNavigationSkeleton'
import TagList from '../components/tag/TagList'
import { filteredProducts } from '../selectors/productSelector'
import ProductReviewsOverlay from '../components/product/ProductReviewsOverlay'
import WriteReviewCard from '../components/review/WriteReviewOverlay'
import PaymentOverlay from '../components/cart/PaymentOverlay'
import {
    AllProductsState,
    initalAllProductsState,
} from '../state/allProductsAtom'
import { IProductDate, IProductItem } from '../models/dtos'
import ProductItem from '../components/product/ProductItem'

const FIND_MANY_DATE_PRODUCTS = `{
    findAllProductDates {
     id
     value
     products {
       id
       description
       totalRating
     }    
   }
}
`

interface FindAllProductDatesQuery {
    findAllProductDates: IProductDate[]
}

const Home = () => {
    const [productId, setProductId] = useState<number>()

    const allProductsState = useRecoilValue<AllProductsState>(
        initalAllProductsState
    )

    const filteredValues = useRecoilValue<IProductItem[]>(filteredProducts)

    const {
        loading: allProductsLoading,
        data: allProductDates,
    } = useQuery<FindAllProductDatesQuery>(FIND_MANY_DATE_PRODUCTS)

    const close = () => {
        setProductId(-1)
    }

    return (
        <>
            <PaymentOverlay />
            <WriteReviewCard />
            <ProductReviewsOverlay productId={productId!} close={close} />
            <div className="flex flex-col min-h-screen lg:flex-row">
                <Navigation />
                <div className="block lg:block w-full p-4 lg:p-10 flex-grow bg-default text-content-900 lg:w-4/5">
                    <div className="container-lg mx-auto p-5 bg-content-100 rounded-box">
                        {allProductsLoading ? (
                            <ProductDateNavigationSkeleton />
                        ) : (
                            <ProductDateNavigation
                                productDates={
                                    allProductDates?.findAllProductDates!
                                }
                            />
                        )}

                        <div className="flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:-mx-1 lg:-mx-1 xl:-mx-1">
                            <div className="flex-1 my-1 px-1 w-full overflow-hidden sm:my-1 sm:px-1 md:my-1 md:px-1 lg:my-1 lg:px-1 lg:w-3/5 xl:my-1 2xl:w-full xl:px-1 2xl:w-full xl:w-full">
                                <div className="text-center xl:2xl-container pt-6">
                                    <div className="overflow-hidden card shadow-lg bg-default">
                                        <div className="card-body">
                                            <h2 className="text-4xl font-bold card-title">
                                                Today on our menu we have the
                                                following categories available:
                                            </h2>
                                            <div className="mb-4 space-x-2">
                                                <TagList
                                                    tags={allProductsState.tags}
                                                />
                                            </div>
                                            <p className="text-xl font-semibold">
                                                Enjoy! 🍲
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {allProductsState.isLoading ? (
                                    <ProductSkeleton />
                                ) : (
                                    <div className="xl:2xl-container pt-6 xl:w-full">
                                        <div className="xl:grid xl:w-full sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-5 xl:grid-cols-3 gap-4 mt-5 h-3/4">
                                            {filteredValues?.map(
                                                (product: IProductItem) => {
                                                    return (
                                                        <ProductItem
                                                            product={product}
                                                            setProductId={(
                                                                id: number
                                                            ) =>
                                                                setProductId(id)
                                                            }
                                                        />
                                                    )
                                                }
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Cart />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
