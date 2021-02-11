import { atom, RecoilState } from 'recoil'
import { LocalStorageKey } from '.'
import { IProductItem, ITag } from '../models/dtos'

export const initalAllProductsState: RecoilState<AllProductsState> = atom({
    key: 'initialAllProductsState',
    default: LoadAllProductsAppStateFromLocalStorage(),
})

export interface AllProductsState {
    products: IProductItem[]
    isLoading: boolean
    tags: ITag[]
}

function LoadAllProductsAppStateFromLocalStorage(): AllProductsState {
    const stringifiedJSON: string | null = window.localStorage.getItem(
        LocalStorageKey.PRODUCTS_STATE
    )
    if (typeof stringifiedJSON === 'string') {
        const Loaded: AllProductsState = JSON.parse(stringifiedJSON)
        return Loaded
    }

    const BlankAppState: AllProductsState = {
        products: [],
        isLoading: false,
        tags: [],
    }

    return BlankAppState
}