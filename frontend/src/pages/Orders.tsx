import { useQuery } from 'graphql-hooks'
import React, { useEffect } from 'react'
import Navigation from '../components/Navigation'
import OrderSummary from '../components/order/OrderSummary'
import { useHistory } from 'react-router-dom'

const ME_QUERY = `{
    me {        
        orders {
        id
        purchasedAt
        price
            products {
                title
                imageUrl
                price
            }
        }
    }     
}`

const Orders = () => {
    const { data, error } = useQuery(ME_QUERY)
    const history = useHistory()

    useEffect(() => {
        if (error != undefined && error?.graphQLErrors?.length! > 0) {
            error!.graphQLErrors?.forEach((err: any) => {
                var isAuthed = err.extensions.code === 'UNAUTHENTICATED'
                if (isAuthed) {
                    history.push('/login')
                }
            })
        }
    })

    return (
        <div className="flex flex-col min-h-screen lg:flex-row">
            <Navigation />
            <div className="block lg:block w-full p-4 lg:p-10 flex-grow bg-default">
                <div className="container mx-auto p-5 bg-content-100 rounded-box">
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full  overflow-hidden">
                                <h2 className="my-4 text-4xl text-center font-bold text-white pb-3">
                                    Let's check out what you have eaten so far.
                                    🤤
                                </h2>
                                <div className="mb-8 justify-center flex">
                                    <div className="mr-5 shadow-xl compact side rounded-xl overflow-hidden bg-content-200">
                                        <div className="p-4 flex items-center">
                                            <div>
                                                <p className="mb-2 text-primary text-xl font-medium">
                                                    Total spent last week
                                                </p>
                                                <p className="text-center text-lg text-white font-semibold ">
                                                    360€
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-content-200">
                                        <div className="p-4 flex items-center">
                                            <div>
                                                <p className="text-center mb-2 text-primary text-xl font-medium ">
                                                    Most eaten food
                                                </p>
                                                <p className="text-lg text-white font-semibold ">
                                                    <div className="pt-2 flex-wrap space-x-2 flex-col md:flex-row">
                                                        <div className="badge mx-auto badge-secondary">
                                                            Vegan
                                                        </div>
                                                        <div className="badge mx-auto badge-secondary">
                                                            Meat
                                                        </div>
                                                        <div className="badge mx-auto badge-secondary">
                                                            Bio
                                                        </div>
                                                    </div>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <OrderSummary orders={data?.me?.orders} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders
