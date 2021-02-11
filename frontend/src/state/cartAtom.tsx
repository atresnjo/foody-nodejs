import { atom, RecoilState } from 'recoil'
import { LocalStorageKey } from '.'
import { IProductItem } from '../models/dtos'

export const initialCartState: RecoilState<CartState> = atom({
    key: 'initialCartState',
    default: LoadCartAppStateFromLocalStorage(),
})

function LoadCartAppStateFromLocalStorage(): CartState {
    const stringifiedJSON: string | null = window.localStorage.getItem(
        LocalStorageKey.CART_STATE
    )
    if (typeof stringifiedJSON === 'string') {
        const Loaded: CartState = JSON.parse(stringifiedJSON)
        return Loaded
    }

    const BlankAppState: CartState = {
        products: [],
        price: 0,
        isLoading: false,
    }

    return BlankAppState
}

export interface CartState {
    products: IProductItem[]
    price: number
    isLoading: boolean
}
