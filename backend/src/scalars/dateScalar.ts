import { GraphQLScalarType, Kind } from 'graphql'

export const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value: Date) {
        return value
    },
    parseValue(value: Date) {
        return new Date(value)
    },
    parseLiteral(ast: any) {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10)
        }
        return null
    },
})
