import {
    Table,
    Model,
    Column,
    BelongsToMany,
    HasMany,
} from 'sequelize-typescript'
import { Field, ID, ObjectType } from 'type-graphql'
import CheckoutOrder from '../checkout-order/CheckoutOrder'
import ProductCheckoutOrderJoin from '../checkout-order/ProductCheckoutOrderJoin'
import ProductTagsJoin from '../tag/ProductTagsJoin'
import Review from '../review/Review'
import Tag from '../tag/Tag'

@ObjectType()
@Table
export default class Product extends Model {
    @Field(() => ID) id!: string

    @Field()
    @Column
    title!: string

    @Field()
    @Column
    description!: string

    @Field()
    @Column
    rating!: number

    @Field()
    totalRating!: number

    @Field()
    @Column
    isTrending!: boolean

    @Field()
    @Column
    price!: number

    @Field()
    @Column
    imageUrl!: string

    @Field(_ => [Review])
    @HasMany(() => Review)
    reviews!: Review[] | undefined

    @Field(_ => [CheckoutOrder])
    @BelongsToMany(() => CheckoutOrder, () => ProductCheckoutOrderJoin)
    orders: CheckoutOrder[] | undefined

    @Field(_ => [Tag])
    @BelongsToMany(() => Tag, () => ProductTagsJoin)
    tags: Tag[] | undefined
}
