import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const ProductSkeleton = () => {
    return (
        <SkeletonTheme color="#E066C9" highlightColor="#981F82">
            <div className="xl:2xl-container pt-6 xl:w-full">
                <div className="xl:grid xl:w-full sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-5 xl:grid-cols-3 gap-4 mt-5 h-3/4">
                    {[...Array(5)].map(() => (
                        <>
                            <div className="card bordered h-full">
                                <div className="img-container">
                                    <figure>
                                        <Skeleton
                                            duration={2}
                                            count={1}
                                            height={200}
                                            width="100%"
                                        />
                                    </figure>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title text-xl font-bold text-center">
                                        <Skeleton
                                            duration={2}
                                            count={3}
                                            width="100%"
                                        />
                                    </h1>
                                    <div className="justify-center card-actions">
                                        <Skeleton
                                            duration={2}
                                            count={1}
                                            height={35}
                                            width={100}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default ProductSkeleton
