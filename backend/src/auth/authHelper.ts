import * as expressJwt from 'express-jwt'
import * as jwt from 'jsonwebtoken'

export const identifier: string = 'ff01Bt0dYnWgD3VKY'
const issuer: string = 'http://localhost:8080/graphql'

export const signToken = (email: string): string => {
    var token = jwt.sign({ issuer: issuer }, identifier, {
        algorithm: 'HS256',
        subject: email,
        expiresIn: '1d',
    })

    return token
}

export const expressJwtOptions = (): expressJwt.Options => {
    const options: expressJwt.Options = {
        secret: identifier,
        algorithms: ['HS256'],
        credentialsRequired: false,
    }

    return options
}
