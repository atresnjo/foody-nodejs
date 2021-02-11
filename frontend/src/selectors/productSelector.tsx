import { selector } from 'recoil'
import { IProductItem } from '../models/dtos'
import { initalAllProductsState } from '../state/allProductsAtom'
import { initialProductsFilterState } from '../state/productsFilterStateAtom'

export const filteredProducts = selector<IProductItem[]>({
    key: 'filteredProducts',
    get: ({ get }) => {
        const filters = get(initialProductsFilterState)
        const allProducts = get(initalAllProductsState)
        if (filters.tags.length === 0) return allProducts.products
        console.debug('current filters')
        console.debug(filters)
        console.debug('current products')
        console.debug(allProducts)

        var filteredProducts = allProducts.products.filter((x) => {
            return (
                x.tags.filter((tag): boolean => {
                    console.debug(`comparing ${tag.id}`)
                    var exists = filters.tags.find((x) => x.id === tag.id)
                    console.debug(`exists: ? ${exists}`)
                    if (exists === undefined) {
                        return false
                    }

                    return true
                }).length > 0
            )
        })

        console.debug('filtered products')
        console.debug(filteredProducts)
        return filteredProducts
    },
})
