export interface IProductItem {
    id: number
    title: string
    tags: ITag[]
    price: number
    rating: number
    description: string
    isTrending: boolean
    imageUrl: string
    totalRating: number
    reviews: IReview[]
}

export interface IUser {
    username: string
    password: string
    name: string
    products: IProductItem[]
}

export interface ICart {
    products: IProductItem[]
}

export interface IProductDate {
    id: number
    value: Date
    products: IProductItem[]
}

export interface IReview {
    id: string
    text: string
    rating: number
    createdAt: Date
}

export interface ITag {
    id: number
    name: string
}
