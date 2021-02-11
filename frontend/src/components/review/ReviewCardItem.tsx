interface ReviewCardItemProps {
    name: string
    accent: string
    value: number
}
const ReviewCardItem = ({ name, value, accent }: ReviewCardItemProps) => {
    return (
        <div className="flex flex-col">
            <span>{name}</span>
            <progress
                className={'progress mt-1 progress-' + accent}
                value={value}
                max="100"
            ></progress>
        </div>
    )
}

export default ReviewCardItem
