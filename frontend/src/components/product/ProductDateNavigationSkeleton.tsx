import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const ProductDateNavigationSkeleton = () => {
    return (
        <SkeletonTheme color="#E066C9" highlightColor="#981F82">
            <div className="p-2 justify-center tabs tabs-boxed">
                {[...Array(5)].map((_, i) => (
                    <div className="p-2">
                        <Skeleton
                            key={i}
                            duration={2}
                            count={1}
                            height={25}
                            width={50}
                        />
                    </div>
                ))}
            </div>
        </SkeletonTheme>
    )
}

export default ProductDateNavigationSkeleton
