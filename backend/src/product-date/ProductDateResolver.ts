import { UserInputError } from 'apollo-server-express'
import { Arg, Query, Resolver } from 'type-graphql'
import Product from '../product/Product'
import Tag from '../tag/Tag'
import ProductDate from './ProductDate'

@Resolver(ProductDate)
export class ProductDateResolver {
    @Query(() => [ProductDate])
    async findAllProductDates() {
        return await ProductDate.findAll({
            include: { model: Product, include: [Tag] },
        })
    }

    @Query(() => ProductDate)
    async productDate(@Arg('id', { nullable: false }) id: string) {
        var productDate = await ProductDate.findByPk(id, {
            include: { model: Product, include: [Tag] },
        })

        if (productDate === null)
            throw new UserInputError('Productdate does not exist')

        return productDate
    }
}
