import { AuthenticationError } from 'apollo-server-express'
import { AuthChecker } from 'type-graphql'
import { AuthContext } from './authContext'

export const authChecker: AuthChecker<AuthContext> = ({
    context: { user },
}) => {
    if (!user) {
        throw new AuthenticationError('Access denied')
    }

    return true
}
