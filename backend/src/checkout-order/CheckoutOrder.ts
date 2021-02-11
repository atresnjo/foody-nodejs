import {
    Table,
    Model,
    Column,
    BelongsTo,
    ForeignKey,
    BelongsToMany,
    CreatedAt,
} from 'sequelize-typescript'
import { Field, ID, ObjectType } from 'type-graphql'
import Account from '../account/Account'
import Product from '../product/Product'
import ProductCheckoutOrderJoin from './ProductCheckoutOrderJoin'

@ObjectType()
@Table
export default class CheckoutOrder extends Model {
    @Field(() => ID) id!: string

    @Field()
    @Column
    price!: number

    @ForeignKey(() => Account)
    @Column
    userId!: number

    @BelongsTo(() => Account)
    user!: Account

    @Field(_ => [Product])
    @BelongsToMany(() => Product, () => ProductCheckoutOrderJoin)
    products!: Product[]

    @Field()
    @CreatedAt
    @Column({ field: 'purchasedAt' })
    purchasedAt!: Date;
}
