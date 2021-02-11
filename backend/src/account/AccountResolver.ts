import { UserInputError } from 'apollo-server-express'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import Account from './Account'
import Product from '../product/Product'
import { AuthContext } from '../auth/authContext'
import Token from '../auth/token'
import CheckoutOrder from '../checkout-order/CheckoutOrder'
import { signToken } from '../auth/authHelper'
import * as bcrypt from 'bcrypt'

@Resolver(Account)
export class AccountResolver {
    @Mutation(() => Token)
    async login(
        @Arg('email', { nullable: false }) email: string,
        @Arg('password', { nullable: false }) password: string
    ) {
        var account = await Account.findOne({
            where: { email: email },
        })
        if (account === null) throw new UserInputError('Account does not exist')

        var authCheck = await bcrypt.compare(password, account.password)
        if (authCheck === false)
            throw new UserInputError('Password does not match')

        var token = signToken(email)
        return { token }
    }

    @Mutation(() => Token)
    async createAccount(
        @Arg('email', { nullable: false }) email: string,
        @Arg('password', { nullable: false }) password: string
    ) {
        var account = await Account.findOne({
            where: { email: email },
        })
        if (account !== null) throw new UserInputError('Account already exists')

        account = Account.build({ email, password })
        const hash = await bcrypt.hash(password, 10)
        account.password = hash
        account.save()
        var token = signToken(email)
        return { token }
    }

    @Authorized()
    @Query(() => Account)
    async me(@Ctx() ctx: AuthContext) {
        var account = await Account.findByPk(ctx.user!.id, {
            include: {
                model: CheckoutOrder,
                include: [Product],
                right: true,
            },
        })

        if (account === null) throw new UserInputError('Account does not exist')
        return account
    }
}
