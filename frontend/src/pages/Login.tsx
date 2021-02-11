import { ClientContext, useMutation } from 'graphql-hooks'
import { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { removeAccessToken, storeAccessToken } from '../misc/utils'
import AuthForm, { IAuthData } from '../components/auth/AuthForm'

const UPDATE_USER_MUTATION = `mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const DetailsComponent = () => {
    return (
        <Link className="pt-3 text-primary" to={'/signup'}>
            Create an account
        </Link>
    )
}

const Login = () => {
    const [loginUser] = useMutation(UPDATE_USER_MUTATION)
    const client = useContext(ClientContext)
    const history = useHistory()

    const handleLogin = async (authData: IAuthData) => {
        var result = await loginUser({
            variables: {
                ...authData,
            },
        })
        if (result.error) {
            console.error(result.error)
        } else {
            if (result.data.login.token === undefined) return

            console.log(result.data.login.token)
            console.debug(`setting token: ${result.data.login.token}`)
            client.setHeader(
                'Authorization',
                `Bearer ${result.data.login.token}`
            )
            
            storeAccessToken(result.data.login.token)
            history.push('/home')
        }
    }

    useEffect(() => removeAccessToken(), [])

    return (
        <div className="min-h-screen bg-default py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center space-x-5">
                            <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                                🍔
                            </div>
                            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                <h2 className="uppercase leading-relaxed">
                                    Login to foody
                                </h2>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                                    And pick your next delicious meal 🍽️
                                </p>
                            </div>
                        </div>
                        <AuthForm
                            detailsComponent={DetailsComponent()}
                            execute={handleLogin}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
