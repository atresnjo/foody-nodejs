import { Table, Model, Column, BelongsToMany } from 'sequelize-typescript'
import { Field, ID, ObjectType } from 'type-graphql'
import Product from '../product/Product'
import ProductTagsJoin from './ProductTagsJoin'

@ObjectType()
@Table
export default class Tag extends Model {
    @Field(() => ID) id!: number

    @Field()
    @Column
    name!: string

    @Field(_ => [Product])
    @BelongsToMany(() => Product, () => ProductTagsJoin)
    products!: Product[]
}
