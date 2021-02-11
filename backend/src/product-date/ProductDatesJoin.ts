import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import Product from '../product/Product';
import ProductDate from './ProductDate';

@Table
export default class ProductDatesJoin extends Model {
    
    @ForeignKey(() => Product)
    @Column
    productId!: number;
  
    @ForeignKey(() => ProductDate)
    @Column
    productDateId!: number;
}
