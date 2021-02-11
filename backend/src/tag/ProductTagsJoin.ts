import { Table, Model, Column, ForeignKey } from 'sequelize-typescript'
import Product from '../product/Product'
import Tag from './Tag'

@Table
export default class ProductTagsJoin extends Model {
    @ForeignKey(() => Product)
    @Column
    productId!: number

    @ForeignKey(() => Tag)
    @Column
    tagId!: number
}
