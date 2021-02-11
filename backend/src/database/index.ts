import { Sequelize } from 'sequelize-typescript'
import Account from '../account/Account'
import CheckoutOrder from '../checkout-order/CheckoutOrder'
import Product from '../product/Product'
import ProductCheckoutOrderJoin from '../checkout-order/ProductCheckoutOrderJoin'
import ProductDate from '../product-date/ProductDate'
import ProductTagsJoin from '../tag/ProductTagsJoin'
import Review from '../review/Review'
import Tag from '../tag/Tag'
import ProductDatesJoin from '../product-date/ProductDatesJoin'
import { seedProductDates, seedProducts, seedProductTags } from './seed'
import * as dotenv from 'dotenv'
dotenv.config()

export const sequelize = new Sequelize({
    logging: console.log,
    database: process.env.DB_SCHEMA || 'foody',
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: ((process.env.DB_PORT as unknown) as number) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    models: [
        Account,
        Product,
        ProductDate,
        ProductTagsJoin,
        ProductDatesJoin,
        Tag,
        ProductTagsJoin,
        Review,
        CheckoutOrder,
        ProductCheckoutOrderJoin,
    ],
})

export const init = () => {
    sequelize
        .authenticate()
        .then(async () => {
            await sequelize.sync({ alter: true })
            console.log('Connection has been established successfully.')
            await seedProductTags()
            await seedProducts()
            await seedProductDates()
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err)
        })
}
