import {
    Table,
    Model,
    Column,
    BelongsTo,
    ForeignKey,
    CreatedAt,
} from 'sequelize-typescript'
import { Field, ID, ObjectType } from 'type-graphql'
import Account from '../account/Account'
import Product from '../product/Product'

@ObjectType()
@Table
export default class Review extends Model {
    @Field(() => ID) id!: string

    @Field()
    @Column
    rating!: number

    @Field()
    @Column
    text!: string

    @ForeignKey(() => Account)
    @Column
    userId!: number

    @Field(() => Account)
    @BelongsTo(() => Account)
    user!: Account

    @ForeignKey(() => Product)
    @Column
    productId!: number

    @Field(() => [Product])
    @BelongsTo(() => Product)
    product!: Product

    @Field()
    @CreatedAt
    @Column({ field: 'createdAt' })
    createdAt!: Date
}
