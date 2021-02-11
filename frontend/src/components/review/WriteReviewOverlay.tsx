import { useMutation } from 'graphql-hooks'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
// @ts-ignore
import ReactStars from 'react-rating-stars-component'
import { useRecoilState } from 'recoil'
import {
    ICreateReviewOverlay,
    initialCreateReviewOverlayState,
} from '../../state/createReviewOverlayAtom'

const CREATE_REVIEW_MUTATION = `mutation createReview($input: CreateReviewInput!) {
    createReview(input: $input)
  }
`

interface CreateReviewData {
    text: string
}

const WriteReviewOverlay = () => {
    const [createReview] = useMutation(CREATE_REVIEW_MUTATION)
    const { register, handleSubmit } = useForm()

    const [rating, setRating] = useState<Number>(1)
    const [isDone, setIsDone] = useState<Boolean>(false)

    const [reviewState, setReviewState] = useRecoilState<ICreateReviewOverlay>(
        initialCreateReviewOverlayState
    )

    const handleCreateReview = async (formData: CreateReviewData) => {
        try {
            var result = await createReview({
                variables: {
                    input: {
                        productId: reviewState.productId,
                        rating,
                        ...formData,
                    },
                },
            })
            if (result.error) {
                console.error(result.error)
            } else {
            }
        } finally {
            setIsDone(true)
            setRating(1)
        }
    }

    const close = () => {
        setIsDone(false)
        setReviewState({
            productId: 0,
            open: false,
        })
    }

    return (
        <div
            className={
                'fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-100 flex flex-col items-center justify-center ' +
                (reviewState.open ? 'visible' : 'invisible')
            }
        >
            {isDone ? (
                <div className="shadow-xl compact side rounded-xl overflow-hidden bg-content-400 md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                    <div className="md:flex items-center">
                        <div className="h-10 w-10 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-xl font-mono">
                            🍔
                        </div>

                        <div className="mt-4 md:mt-0 md:ml-6 text-primary text-center md:text-left">
                            <p className="font-bold text-lg">
                                We got your review!
                            </p>
                            <p className="text-md text-white mt-1">
                                We appreciate you leaving a review! 🙏
                            </p>
                        </div>
                    </div>
                    <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                        <button
                            onClick={close}
                            className="btn btn-block text-white btn-primary "
                        >
                            Ok
                        </button>
                    </div>
                </div>
            ) : (
                <div className="p-12 w-full rounded-xl overflow-hidden bg-content-400 md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative text-center mt-6 mr-5 shadow-xl compact side rounded-xl overflow-hidden bg-content-200">
                    <div className="justify-center items-center flex flex-col">
                        <p className="text-center mb-2 text-primary text-xl font-medium ">
                            Did you like it? 🤔
                        </p>
                        <ReactStars
                            size={24}
                            edit={true}
                            isHalf={false}
                            value={rating}
                            onChange={(newRating: number) =>
                                setRating(newRating)
                            }
                        />
                    </div>
                    <form onSubmit={handleSubmit(handleCreateReview)}>
                        <div className="p-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-200">
                                        Tells us what you think about it..
                                    </span>
                                </label>
                                <textarea
                                    ref={register({
                                        required: true,
                                    })}
                                    name="text"
                                    className="h-32 textarea text-white"
                                />
                            </div>
                        </div>
                        <div className="w-full text-center justify-between md:text-right mt-4 flex">
                            <button
                                onClick={close}
                                type="submit"
                                className="btn btn-outline text-white btn-primary "
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn text-white btn-primary "
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default WriteReviewOverlay
