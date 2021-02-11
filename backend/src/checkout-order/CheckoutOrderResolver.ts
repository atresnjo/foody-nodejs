import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import Product from '../product/Product'
import { AuthContext } from '../auth/authContext'
import CheckoutOrder from './CheckoutOrder'
import { CreateCheckoutOrderInput } from './CreateCheckoutOrderInput'

@Resolver(CheckoutOrder)
export class CheckoutOrderResolver {
    @Authorized()
    @Mutation(() => Boolean)
    async createCheckoutOrder(
        @Arg('orderInfo') input: CreateCheckoutOrderInput, 
        @Ctx() ctx: AuthContext
    ) {
        var products = await Product.findAll({
            where: { id: input.productIds },
        })

        var totalPrice = products.map(item => item.price).reduce((prev, next) => prev + next);
        let order = await CheckoutOrder.create({price: totalPrice, userId: ctx.user?.id})
        await order.$set('products', products)
        return true
    }
}
