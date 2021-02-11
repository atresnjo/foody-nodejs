import { useRecoilState } from 'recoil'
import FoodyLogo from '../FoodyLogo'
import { initialOverlayState } from '../../state/overlayAtom'

const PaymentOverlay = () => {
    const [overlayState, setOverlayState] = useRecoilState<boolean>(
        initialOverlayState
    )

    return (
        <div
            className={
                'fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-900 opacity-100 flex flex-col items-center justify-center ' +
                (overlayState === true ? 'visible' : 'invisible')
            }
        >
            <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
                <div className="shadow-xl compact side rounded-xl overflow-hidden bg-content-400 md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                    <div className="md:flex items-center">
                        <FoodyLogo/>

                        <div className="mt-4 md:mt-0 md:ml-6 text-primary text-center md:text-left">
                            <p className="font-bold text-lg">
                                Payment successful 🎉
                            </p>
                            <p className="text-md text-white mt-1">
                                Thanks for ordering, enjoy your meal!
                            </p>
                        </div>
                    </div>
                    <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                        <button
                            onClick={() => setOverlayState(false)}
                            className="btn btn-block text-white btn-primary "
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentOverlay
