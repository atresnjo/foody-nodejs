import { IProductItem } from '../../models/dtos'
import dayjs from 'dayjs'

export interface IOrderSummaryProps {
    orders: IOrderSummaryItem[]
}

export interface IOrderSummaryItem {
    products: IProductItem[]
    price: number
    purchasedAt: Date
    id: number
}

const OrderSummary = ({ orders }: IOrderSummaryProps) => {
    return (
        <>
            {orders?.map((order: IOrderSummaryItem) => {
                return (
                    <ul className="accordion accordion-plus accordion-bordered">
                        <li className="accordion-item text-white">
                            <input id={'item-' + order.id} type="checkbox" />
                            <label
                                htmlFor={'item-' + order.id}
                                className="text-2xl text-center font-medium accordion-title"
                            >
                                Order summary #{order.id} for
                                <span className="pl-2">
                                    {dayjs(order?.purchasedAt).format(
                                        'DD-MM-YYYY'
                                    )}
                                </span>
                            </label>
                            <div className="accordion-body card rounded-lg bg-content-200 self-center">
                                <div className="p-2 pt-5">
                                    {order?.products.map(
                                        (product: IProductItem) => {
                                            return (
                                                <div className="flex mb-5">
                                                    <div className="">
                                                        <img
                                                            src={
                                                                product.imageUrl
                                                            }
                                                            className="rounded-md"
                                                            width={48}
                                                        />
                                                    </div>
                                                    <div className="pt-5 justify-between flex w-full pl-7 flex">
                                                        <span className="text-md font-normal">
                                                            {product.title}
                                                        </span>
                                                        <div className="flex">
                                                            <span className="pl-7 text-md font-extrabold">
                                                                {product.price}{' '}
                                                                €
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )}
                                </div>
                            </div>
                            <div className="border-t p-2 mt-3 ">
                                <div className="font-semibold justify-between flex  text-center py-6 text-xl uppercase">
                                    <span>Total cost</span>
                                    <span className="ml-4">€{order.price}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                )
            })}
        </>
    )
}

export default OrderSummary
