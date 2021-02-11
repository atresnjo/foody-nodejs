import { Table, Model, Column, HasMany } from 'sequelize-typescript'
import { Field, ObjectType } from 'type-graphql'
import CheckoutOrder from '../checkout-order/CheckoutOrder'
import Review from '../review/Review'

@ObjectType()
@Table
export default class Account extends Model {
    @Column
    email!: string

    @Column
    password!: string

    @Field(_ => [CheckoutOrder])
    @HasMany(() => CheckoutOrder)
    orders: CheckoutOrder[] | undefined

    @HasMany(() => Review)
    reviews: Review[] | undefined

    @Field()
    token!: string
}
