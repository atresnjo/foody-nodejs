// @ts-ignore
import ReactStars from 'react-rating-stars-component'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export interface IProductReviewProps {
    name: string
    createdAt: Date
    text: string
    rating: Number
}

const ProductReview = ({
    name,
    createdAt,
    text,
    rating,
}: IProductReviewProps) => {
    return (
        <div className="rounded-lg bg-content-500 text-white flex pt-4 mt-3">
            <div className="avatar pl-2">
                <div className="rounded-full w-12 h-12">
                    <img src="https://i.pravatar.cc/500?img=32" />
                </div>
            </div>
            <div className="flex flex-col w-full pl-4 pr-2">
                <div className="flex sm:flex-col md:flex-row w-full">
                    <p className="font-bold">{name}</p>
                    <p className="font-semibold md:ml-auto text-gray-200">
                        {dayjs(createdAt).fromNow()}
                    </p>
                </div>
                <div className="">
                    <ReactStars
                        size={24}
                        edit={false}
                        isHalf={false}
                        value={rating}
                    />
                </div>
                <div className="w-full">
                    <p className="mb-4 text-base leading-relaxed">{text}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductReview
