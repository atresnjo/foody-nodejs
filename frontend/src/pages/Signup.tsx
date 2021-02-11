import { ClientContext, useMutation } from 'graphql-hooks'
import { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AuthForm, { IAuthData } from '../components/auth/AuthForm'
import { removeAccessToken, storeAccessToken } from '../misc/utils'

const CREATE_USER_MUTATION = `mutation createAccount($email: String!, $password: String!) {
    createAccount(email: $email, password: $password) {
      token
    }
  }
`

const DetailsComponent = () => {
    return (
        <Link className="pt-3 text-primary" to={'/login'}>
            Already haven an account?
        </Link>
    )
}
const Signup = () => {
    const [createUser] = useMutation(CREATE_USER_MUTATION)
    const client = useContext(ClientContext)
    const history = useHistory()

    const handleSignup = async (authData: IAuthData) => {
        var result = await createUser({
            variables: {
                ...authData,
            },
        })
        if (result.error) {
            console.error(result.error)
        } else {
            var token = result.data.createAccount.token
            if (token === undefined) return

            console.debug('setting token')
            client.setHeader('Authorization', `Bearer ${token}`)
            storeAccessToken(token)
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
                                    Signup to foody
                                </h2>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                                    And pick your next delicious meal 🍽️
                                </p>
                            </div>
                        </div>
                        <AuthForm
                            detailsComponent={DetailsComponent()}
                            execute={handleSignup}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
