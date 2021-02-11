import { Table, Model, Column, BelongsToMany } from 'sequelize-typescript'
import { Field, ID, ObjectType } from 'type-graphql'
import Product from '../product/Product'
import ProductDatesJoin from './ProductDatesJoin'

@ObjectType()
@Table
export default class ProductDate extends Model {
    @Field(() => ID) id!: string

    @Field()
    @Column
    value!: Date

    @Field(() => [Product])
    @BelongsToMany(() => Product, () => ProductDatesJoin)
    products!: Product[]
}
