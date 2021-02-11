import { atom, RecoilState } from 'recoil'

export const initialDateNavigationItem: RecoilState<ICurrentDateNavigationItem> = atom<ICurrentDateNavigationItem>(
    {
        key: 'initialDateNavigationItem',
        default: { productId: -1 },
    }
)

export interface ICurrentDateNavigationItem {
    productId: number
}
