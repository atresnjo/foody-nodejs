import { UserInputError } from 'apollo-server-express';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { AuthContext } from '../auth/authContext';
import Product from '../product/Product';
import { CreateReviewInput } from './CreateReviewInput';
import Review from './Review';

@Resolver(Review)
export class ReviewResolver {
    @Authorized()
    @Mutation(() => Boolean)
    async createReview(
        @Arg('input') input: CreateReviewInput, 
        @Ctx() ctx: AuthContext
    ) {
        var product = await Product.findByPk(input.productId, {include: Review});
        if(product === undefined)
        throw new UserInputError("Product not found")

        await Review.create({...input, userId: ctx.user?.id})
        return true
    }
}

