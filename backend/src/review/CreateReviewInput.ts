import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateReviewInput {
    @Field()
    productId!: string

    @Field()
    rating!: number

    @Field()
    text!: string
}
