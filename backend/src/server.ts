import { ApolloServer } from 'apollo-server-express'
import * as GraphiQL from 'apollo-server-module-graphiql'
import * as cors from 'cors'
import * as express from 'express'
import { createServer, Server } from 'http'
import * as url from 'url'
import Account from './account/Account'
import { buildSchema } from 'type-graphql'
import * as path from 'path'
import { ProductResolver } from './product/ProductResolver'
import { AccountResolver } from './account/AccountResolver'
import { authChecker } from './auth/authChecker'
import { AuthContext } from './auth/authContext'
import { ProductDateResolver } from './product-date/ProductDateResolver'
import { CheckoutOrderResolver } from './checkout-order/CheckoutOrderResolver'
import { ReviewResolver } from './review/ReviewResolver'
import * as expressJwt from 'express-jwt'
import { expressJwtOptions } from './auth/authHelper'
import { init } from './database'

init()

type ExpressGraphQLOptionsFunction = (
    req?: express.Request,
    res?: express.Response
) => any | Promise<any>

function graphiqlExpress(
    options: GraphiQL.GraphiQLData | ExpressGraphQLOptionsFunction
) {
    const graphiqlHandler = (
        req: express.Request,
        res: express.Response,
        next: any
    ) => {
        const query = req.url && url.parse(req.url, true).query
        GraphiQL.resolveGraphiQLString(query, options, req).then(
            (graphiqlString: any) => {
                res.setHeader('Content-Type', 'text/html')
                res.write(graphiqlString)
                res.end()
            },
            (error: any) => next(error)
        )
    }

    return graphiqlHandler
}

export default async (port: number): Promise<Server> => {
    const app = express()
    const server: Server = createServer(app)
    const schema = await buildSchema({
        resolvers: [
            ProductResolver,
            AccountResolver,
            ProductDateResolver,
            CheckoutOrderResolver,
            ReviewResolver,
        ],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
        validate: false,
        authChecker: authChecker,
    })

    app.use('*', cors({ origin: '*' }), expressJwt(expressJwtOptions()))

    const apolloServer = new ApolloServer({
        playground: false,
        schema,
        context: async ({ req }: any) => {
            if (req.user != undefined) {
                var account = await Account.findOne({
                    include: { all: true },
                    where: { email: req.user.sub },
                })

                if (account === null) return null

                const ctx: AuthContext = {
                    user: account,
                }
                return ctx
            }
        },
    })

    apolloServer.applyMiddleware({ app, path: '/graphql' })

    if (module.hot) {
        app.use(
            '/graphiql',
            graphiqlExpress({
                endpointURL: '/graphql',
                query:
                    '# Welcome to your own GraphQL server!\n#\n' +
                    '# Press Play button above to execute GraphQL query\n#\n' +
                    '# You can start editing source code and see results immediately\n\n' +
                    'query hello($subject:String) {\n  hello(subject: $subject)\n}',
            })
        )
    }

    return new Promise<Server>(resolve => {
        server.listen(port, () => {
            resolve(server)
        })
    })
}
