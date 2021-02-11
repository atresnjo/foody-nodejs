import { useRecoilState } from 'recoil'
import { ITag } from '../../models/dtos'
import {
    initialProductsFilterState,
    ProductsFilterState,
} from '../../state/productsFilterStateAtom'

interface TagListProps {
    tags: ITag[]
}

const TagList = ({ tags }: TagListProps) => {
    const [
        productsFilterState,
        setProductsFilterState,
    ] = useRecoilState<ProductsFilterState>(initialProductsFilterState)

    const updateFilter = (item: ITag) => {
        var foundTag = productsFilterState.tags.includes(item)
        if (!foundTag) {
            setProductsFilterState({
                tags: [...productsFilterState.tags, item],
            })
        } else {
            setProductsFilterState({
                tags: productsFilterState.tags.filter(
                    (x: ITag): boolean => x.id !== item.id
                ),
            })
        }
    }

    return (
        <div className="flex-col grid md:flex-row md:flex justify-center md:mb-4 md:space-x-2 md:space-y-0 space-y-2 card-actions">
            {tags.map((tag: ITag) => {
                return (
                    <div
                        key={tag.id}
                        onClick={() => updateFilter(tag)}
                        className={
                            'select-none cursor-pointer badge badge-lg ' +
                            (productsFilterState.tags.includes(tag)
                                ? 'badge-primary'
                                : 'badge-secondary')
                        }
                    >
                        {tag.name}
                    </div>
                )
            })}
        </div>
    )
}

export default TagList
