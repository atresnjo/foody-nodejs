import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateCheckoutOrderInput {
    @Field(() => [String])
    productIds!: string[]
}
