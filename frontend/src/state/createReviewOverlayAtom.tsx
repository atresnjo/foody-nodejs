import { atom, RecoilState } from 'recoil'

export const initialCreateReviewOverlayState: RecoilState<ICreateReviewOverlay> = atom<ICreateReviewOverlay>(
    {
        key: 'initialCreateReviewOverlayState',
        default: { productId: -1, open: false },
    }
)

export interface ICreateReviewOverlay {
    productId: number
    open: boolean
}
