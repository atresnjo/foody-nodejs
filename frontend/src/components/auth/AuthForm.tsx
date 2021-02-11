import { useForm } from 'react-hook-form'

export interface AuthFormProps {
    execute: (authData: IAuthData) => void
    detailsComponent: JSX.Element
}

export interface IAuthData {
    email: string
    password: string
}

const AuthForm = ({ execute, detailsComponent }: AuthFormProps) => {
    const { register, handleSubmit } = useForm<IAuthData>()
    return (
        <form onSubmit={handleSubmit(execute)}>
            <div className="divide-y divide-gray-200">
                <div className="py-8 text-white">
                    <div className="form-control">
                        <label className="label">
                            <span className="uppercase label-text">email</span>
                        </label>
                        <input
                            ref={register({
                                required: true,
                            })}
                            type="text"
                            name="email"
                            placeholder="email"
                            className="input"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="uppercase label-text">
                                password
                            </span>
                        </label>
                        <input
                            ref={register({
                                required: true,
                            })}
                            type="password"
                            name="password"
                            placeholder="password"
                            className="input"
                        />
                    </div>
                </div>
                <div className="flex justify-between pt-4">
                    <button
                        type="submit"
                        className="btn text-white btn-primary"
                    >
                        Submit
                    </button>
                    {detailsComponent}
                </div>
            </div>
        </form>
    )
}

export default AuthForm
