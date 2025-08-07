/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getDepositBankGateway, getUserBalance, makeDepositToken } from "@/actions/payment";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Loading from "../icons/Loading";
import { useAppDispatch } from "@/hooks/use-store";
import { setReduxError } from "@/redux/errorSlice";
import { ServerAddress } from "@/enum/url";
import ModalPortal from "../shared/layout/ModalPortal";
import Home from "../icons/Home";
import Link from "next/link";
import Refresh from "../icons/Refresh";
import Wallet from "../icons/Wallet";
import { setReduxBalance } from "@/redux/authenticationSlice";

type Props = {
    amount: number;
}
const OnlinePayment: React.FC<Props> = props => {

    const router = useRouter();

    const [getBanksLoading, setGetBanksLoading] = useState<boolean>(false);
    const [goToBankLoading, setGoToBankLoading] = useState<boolean>(false);

    const [statusModal, setStatusModal] = useState<"success" | "error" | "">("");

    const [selectedBankId, setSelectedBankId] = useState<number | undefined>(undefined);
    const bankStatus = router.query?.status;
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (bankStatus === "0") {
            setStatusModal("error");
        } else if (bankStatus === "1") {
            setStatusModal("success");
           
            const localStorageToken = localStorage.getItem('Token');
            const fetchBalance = async (token: string) => {
                dispatch(setReduxBalance({ balance: undefined, loading: true }));
                const response: any = await getUserBalance(token);
                if (response.data?.result?.amount !== null) {
                    dispatch(setReduxBalance({ balance: response?.data?.result?.amount, loading: false }))
                } else {
                    dispatch(setReduxBalance({ balance: undefined, loading: false }));
                } 
            }
            if(localStorageToken){
                fetchBalance(localStorageToken);
            }

        } else {
            setStatusModal("");
        }
    }, [bankStatus, dispatch]);

    const [banks, setBanks] = useState<{

        keyword: "Shetab",
        category: "Group",
        name: "شتاب",
        title: "پرداخت آنلاین",
        description: "پرداخت با تمام کارت های عضو شتاب",
        image: {
            "path": "http://cdn2.safaraneh.com/images/banks/shetab.png",
            "titleAttribute": null,
            "altAttribute": null
        },
        gateways: {
            id: 7,
            name: "ملت",
            displayName: "ملت",
            isEnabled: true,
            image: {
                path: "http://cdn2.safaraneh.com/images/banks/mellat.png",
                titleAttribute: null,
                altAttribute: null
            },
            form: {
                elements: []
            }
        }[]

    }[] | undefined>();

    useEffect(() => {

        const localStorageToken = localStorage.getItem('Token');

        const fetchBanks = async (token: string) => {
            setGetBanksLoading(true);
            const response: any = await getDepositBankGateway(token);
            if (response.data?.result) {
                setBanks(response.data.result);
            }
            setGetBanksLoading(false);
        }

        if (localStorageToken) {
            fetchBanks(localStorageToken);
        }

    }, []);

    const bankGateways = banks?.flatMap(bank => bank.gateways).filter(gateway => gateway.isEnabled);
    const defaultGatewayId = bankGateways?.[0]?.id;

    useEffect(() => {
        if (defaultGatewayId) {
            setSelectedBankId(defaultGatewayId);
        }
    }, [defaultGatewayId]);


    const submitHandler = async () => {
        if (!props.amount || !selectedBankId || goToBankLoading) {
            return
        }

        setGoToBankLoading(true);

        const callbackUrl = window?.location.origin + "/profile/wallet/charge";

        const token = localStorage.getItem('Token');
        if (!token) return;

        const params = {
            gatewayId: selectedBankId,
            callBackUrl: callbackUrl,
            amount: props.amount,
            currencyType: "IRR",
            ipAddress: 1,
        };
        const response: any = await makeDepositToken(params, token);

        if (response.status == 200) {
            router.push(`https://${ServerAddress.Payment}/fa/User/Payment/PaymentRequest?tokenId=${response.data.result.tokenId}`);
        } else {
            dispatch(setReduxError({
                title: "خطا",
                message: response?.response?.data?.error?.message || "خطا در ارسال درخواست!",
                isVisible: true
            }))

            setGoToBankLoading(false);
        }

    }

    return (

        <>
            <ModalPortal
                selector="modal_portal"
                show={statusModal === "error"}
            >
                <div className="fixed bottom-0 left-0 h-screen w-screen overflow-auto">
                    <div className="text-white bg-[#011425] p-4 md:max-w-lg md:mx-auto min-h-screen flex flex-col justift-between">
                        <div className="flex justify-between items-center pb-4">
                            <Home className="w-6 h-6 fill-current" />
                            <h5 className="text-sm"> نتیجه تراکنش </h5>
                            <div className="h-px w-6" />
                        </div>
                        <div className="grow bg-[#34142a] rounded-xl flex flex-col gap-4 justify-center items-center p-4">
                            <div className="bg-[#011425] p-3 rounded-full">
                                <Image src="/images/icons/error.svg" alt="error" className="w-10 h-10 mx-auto" width={60} height={60} />
                            </div>
                            <strong className="block text-base font-bold text-red-600"> خطا در پرداخت </strong>

                            <p className="text-center text-xs leading-5 mb-3"> متاسفانه پرداخت شما انجام نشد .
                                <br />
                                لطفا دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.
                            </p>
                            <button
                                type="button"
                                className="h-12 text-xs px-8 rounded-full text-white flex justify-center gap-2 items-center w-full bg-[#aa3aff]"
                                onClick={() => { setStatusModal("") }}
                            >
                                <Refresh className="w-4 h-4 fill-current" />
                                تلاش مجدد
                            </button>
                            <Link
                                href="/"
                                className="h-12 text-xs px-8 rounded-full text-white flex justify-center gap-2 items-center w-full bg-gradient-to-t from-[#fe4d6a] to-[#ff9b90]"
                            >
                                <Home className="w-4 h-4 fill-current" />
                                بازگشت به فروشگاه
                            </Link>
                        </div>
                    </div>
                </div>
            </ModalPortal>

            <ModalPortal
                selector="modal_portal"
                show={statusModal === "success"}
            >
                <div className="fixed bottom-0 left-0 h-screen w-screen overflow-auto">
                    <div className="text-white bg-[#011425] p-4 md:max-w-lg md:mx-auto min-h-screen flex flex-col justift-between">
                        <div className="flex justify-between items-center pb-4">
                            <Home className="w-6 h-6 fill-current" />
                            <h5 className="text-sm"> نتیجه تراکنش </h5>
                            <div className="h-px w-6" />
                        </div>
                        <div className="grow bg-[#231c51] rounded-xl flex flex-col gap-4 justify-center items-center p-4">
                            <div className="bg-[#011425] p-3 rounded-full">
                                <Image src="/images/icons/check-violet.svg" alt="error" className="w-10 h-10 mx-auto" width={60} height={60} />
                            </div>
                            <strong className="block text-base font-bold text-red-600">  پرداخت  موفق </strong>

                            <p className="text-center text-xs leading-5 mb-3">  پرداخت شما با موفقیت انجام شد.
                                <br />
                                از خرید شما سپاسگذاریم!
                            </p>
                            <Link
                                href="/profile/wallet"
                                className="h-12 text-xs px-8 rounded-full text-white flex justify-center gap-2 items-center w-full bg-[#aa3aff]"
                            >
                                <Wallet className="w-4 h-4 fill-current" />
                                مشاهده کیف پول
                            </Link>
                            <Link
                                href="/"
                                className="h-12 text-xs px-8 rounded-full text-white flex justify-center gap-2 items-center w-full bg-gradient-to-t from-[#fe4d6a] to-[#ff9b90]"
                            >
                                <Home className="w-4 h-4 fill-current" />
                                بازگشت به فروشگاه
                            </Link>
                        </div>
                    </div>
                </div>
            </ModalPortal>

            <h4 className="text-center mb-5 mt-10 text-sm"> انتخاب درگاه بانکی </h4>

            {getBanksLoading ? (
                <div>
                    <Image src="/images/loading.gif" className="h-20 w-20 mx-auto mb-6 -mt-1" alt="loading" width={96} height={96} />
                </div>
            ) : bankGateways?.length ? (
                <div className="flex gap-3 justify-center items-center mb-8 py-px">
                    {bankGateways.map(gateway => (
                        <button
                            key={gateway.id}
                            type="button"
                            className={`text-xs flex gap-2 justify-center items-center border rounded-full py-2 px-3 mb-4 ${selectedBankId === gateway.id ? "bg-white/15 border-white/50" : "bg-transparent border-white/15"}`}
                            onClick={() => { setSelectedBankId(gateway.id) }}
                        >
                            {gateway.image.path ? (
                                <Image
                                    src={gateway.image.path}
                                    alt={gateway.image.altAttribute || ""}
                                    width={60}
                                    height={60}
                                    className="w-8 h-8 object-contain rounded"
                                />
                            ) : null}
                            {gateway.name}
                        </button>
                    ))}
                </div>
            ) : bankGateways ? (
                <div className="text-center text-red-600 text-sm pt-6 pb-14">
                    متاسفانه درگاه پرداختی یافت نشد!
                </div>
            ) : <div className="pt-5 pb-20" />}

            <button
                disabled={goToBankLoading || !(selectedBankId && props.amount)}
                type="button"
                className={`h-12 text-sm px-8 rounded-full text-white flex justify-center gap-2 items-center w-full mb-5 ${!selectedBankId || !props.amount ? "bg-[#231c51]" : "bg-[#aa3aff]"} `}
                onClick={submitHandler}
            >
                شارژ حساب
                {!!goToBankLoading && <Loading className="w-5 h-5 fill-current animate-spin" />}
            </button>
        </>

    )
}

export default OnlinePayment;