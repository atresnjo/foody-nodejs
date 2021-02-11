import { UserInputError } from 'apollo-server-express'
import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql'
import Product from './Product'

@Resolver(Product)
export class ProductResolver {
    @Query(() => [Product])
    async findAllProducts() {
        return await Product.findAll()
    }

    @Query(() => Product)
    async product(@Arg('id', { nullable: false }) id: string) {
        var product = await Product.findByPk(id, { include: { all: true } })!
        if (product === null) throw new UserInputError('Product does not exist')
        return product
    }

    @FieldResolver()
    async totalRating(@Root() product: Product) {
        let reviews = product.reviews
        if(reviews === undefined) {    
            reviews = await product.$get('reviews')
        }
    
        const poorRating = reviews?.map((x) => x.rating === 1).length!
        const belowAverageRating = reviews?.map((x) => x.rating === 2).length!
        const averageRating = reviews?.map((x) => x.rating === 3).length!
        const goodRating = reviews?.map((x) => x.rating === 4).length!
        const excellentRating = reviews?.map((x) => x.rating === 5).length!

        const calculatedRating = (5 * excellentRating + 4 * goodRating + 3 * averageRating + 2 * belowAverageRating + 1 * poorRating);
        const finalRating = (excellentRating + goodRating + averageRating + belowAverageRating);
        
        if (calculatedRating > 0 && finalRating > 0) {
            var result = calculatedRating / finalRating;
            return result
        }

        return 0
    }
}
