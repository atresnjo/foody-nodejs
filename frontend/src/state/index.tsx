import { atom, RecoilState } from 'recoil'
import { ITag } from '../models/dtos'

export enum LocalStorageKey {
    CART_STATE = 'CART_STATE',
    PRODUCTS_STATE = 'PRODUCTS_STATE',
    TAG_FILTER_STATE = 'TAG_FILTER_STATE',
}
