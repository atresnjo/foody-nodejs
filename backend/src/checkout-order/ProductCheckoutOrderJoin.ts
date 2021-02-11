import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import CheckoutOrder from './CheckoutOrder';
import Product from '../product/Product';

@Table
export default class ProductCheckoutOrderJoin extends Model {
    
    @ForeignKey(() => Product)
    @Column
    productId!: number;
  
    @ForeignKey(() => CheckoutOrder)
    @Column
    checkoutOrderId!: number;
}
