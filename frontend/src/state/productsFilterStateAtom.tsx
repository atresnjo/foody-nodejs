import { atom, RecoilState } from 'recoil'
import { LocalStorageKey } from '.'
import { ITag } from '../models/dtos'

export interface ProductsFilterState {
    tags: ITag[]
}

function LoadFilterStateFromLocalStorage(): ProductsFilterState {
    const stringifiedJSON: string | null = window.localStorage.getItem(
        LocalStorageKey.TAG_FILTER_STATE
    )
    if (typeof stringifiedJSON === 'string') {
        const Loaded: ProductsFilterState = JSON.parse(stringifiedJSON)
        return Loaded
    }

    const BlankAppState: ProductsFilterState = {
        tags: [],
    }

    return BlankAppState
}

export const initialProductsFilterState: RecoilState<ProductsFilterState> = atom<ProductsFilterState>(
    {
        key: 'initialProductsFilterState',
        default: LoadFilterStateFromLocalStorage(),
    }
)
