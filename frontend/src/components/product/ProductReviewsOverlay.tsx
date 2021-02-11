import { useQuery } from 'graphql-hooks'
import React from 'react'
// @ts-ignore
import ReactStars from 'react-rating-stars-component'
import { IProductItem, IReview } from '../../models/dtos'
import ProductReview from './ProductReview'
import ReviewCardItem from '../review/ReviewCardItem'

const FIND_ONE_PRODUCT = `query product ($id: String!) {
    product(id: $id) {
        totalRating
        reviews {
            rating
            id
            text
            createdAt
        }
    }
}`

export interface IProductReviewsProps {
    productId: number
    close: () => void
}

interface FindOneProductQuery {
    product: IProductItem
}

const ProductReviewsOverlay = ({ productId, close }: IProductReviewsProps) => {
    const { data } = useQuery<FindOneProductQuery>(FIND_ONE_PRODUCT, {
        variables: { id: productId },
    })

    return (
        <div
            className={
                'fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-100 flex flex-col items-center justify-center ' +
                (productId >= 0 ? 'visible' : 'invisible')
            }
        >
            <div className="md:container">
                <div className="relative flex flex-col w-full px-4 min-h-screen md:flex md:items-center md:justify-center">
                    <div className="rounded-xl overflow-hidden bg-content-400 w-full md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                        <div className="divide-y-2 divide-gray-400">
                            <div className="mt-4 md:mt-0 items-center self-center align-center text-primary text-center divide-y divide-yellow-500">
                                <div className="w-full flex flex-col text-center items-center">
                                    <p className="font-bold text-lg">Reviews</p>
                                    <p className="text-2xl font-extrabold text-white mt-1">
                                        {data?.product?.totalRating}
                                    </p>
                                    <ReactStars
                                        size={48}
                                        edit={false}
                                        isHalf={true}
                                        value={data?.product?.totalRating}
                                    />
                                    <span className="text-white font-bold">
                                        based on
                                        <span className="pl-1">
                                            <span className="pr-1">
                                                {data?.product?.reviews?.length}
                                            </span>
                                            reviews
                                        </span>
                                    </span>
                                    <div className="p-6 justify-center items-center align-center rounded-lg w-3/4 text-gray-300 mt-6 space-y-2  bg-content-400">
                                        <ReviewCardItem
                                            name={'Excellent'}
                                            value={20}
                                            accent={'success'}
                                        />
                                        <ReviewCardItem
                                            name={'Good'}
                                            value={35}
                                            accent={'secondary'}
                                        />
                                        <ReviewCardItem
                                            name={'Average'}
                                            value={65}
                                            accent={'accent'}
                                        />

                                        <ReviewCardItem
                                            name={'Below Average'}
                                            value={45}
                                            accent={'info'}
                                        />
                                        <ReviewCardItem
                                            name={'Poor'}
                                            value={25}
                                            accent={'error'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col overflow-y-auto h-96">
                            {data?.product?.reviews?.map((review: IReview) => {
                                return (
                                    <ProductReview
                                        key={review?.id}
                                        name={'Adnan Tresnjo'}
                                        {...review}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <button
                            onClick={() => close()}
                            className="btn btn-block text-white btn-primary "
                        >
                            Go back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductReviewsOverlay
