import { useManualQuery } from 'graphql-hooks'
import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { IProductDate, IProductItem, ITag } from '../../models/dtos'
import dayjs from 'dayjs'
import { uniqBy } from 'lodash-es'
import {
    AllProductsState,
    initalAllProductsState,
} from '../../state/allProductsAtom'
import {
    ICurrentDateNavigationItem,
    initialDateNavigationItem,
} from '../../state/dateNavigationAtom'

const FIND_ONE_DATE_PRODUCT = `query productDate ($id: String!) {
    productDate(id: $id) {
      id
      products {
      totalRating
      id
      title
      description
      imageUrl
      price
      isTrending
      tags {
        id
        name
      }
    }
}
  }`

export interface ProductDateNavigationProps {
    productDates: IProductDate[]
}

interface FindOneDateProductQuery {
    productDate: IProductDate
}

const ProductDateNavigation = ({
    productDates,
}: ProductDateNavigationProps) => {
    const [
        currentNavigationItem,
        setCurrentNavigationItem,
    ] = useRecoilState<ICurrentDateNavigationItem>(initialDateNavigationItem)

    const [
        fetchProducts,
        { loading },
    ] = useManualQuery<FindOneDateProductQuery>(FIND_ONE_DATE_PRODUCT)
    const setAllProductsState = useSetRecoilState<AllProductsState>(
        initalAllProductsState
    )

    const setActiveProductDate = async (id: number) => {
        if (loading) return

        setAllProductsState({
            products: [],
            isLoading: true,
            tags: [],
        })
        const products = await fetchProducts({ variables: { id: id } })

        var result = products?.data!.productDate.products.map(
            (x: IProductItem) => x
        ) as IProductItem[]

        let allTags: ITag[] = []
        products?.data!.productDate.products.map((x: IProductItem) =>
            x.tags.map((t: ITag) => allTags.push(t))
        )

        setCurrentNavigationItem({ productId: id })
        setAllProductsState({
            products: result,
            isLoading: false,
            tags: uniqBy(allTags, 'name'),
        })
    }

    useEffect(() => {
        if (
            productDates !== undefined &&
            currentNavigationItem.productId === -1
        ) {
            var item = productDates[0]
            if (item !== undefined) setActiveProductDate(item?.id)
        }
    }, [productDates])

    return (
        <div className="justify-center tabs tabs-boxed">
            {productDates?.map((productDate: IProductDate) => {
                return (
                    <a
                        key={productDate.id}
                        onClick={() => setActiveProductDate(productDate.id)}
                        className={
                            'tab select-none m-1 ' +
                            (currentNavigationItem.productId === productDate?.id
                                ? 'tab-active'
                                : 'badge badge-outline')
                        }
                    >
                        {dayjs(productDate?.value).format('DD.MM')}
                    </a>
                )
            })}
        </div>
    )
}

export default ProductDateNavigation
