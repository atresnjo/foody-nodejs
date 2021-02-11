import { atom, RecoilState } from 'recoil'

export const initialOverlayState: RecoilState<boolean> = atom<boolean>({
    key: 'initialOverlayState',
    default: false,
})
