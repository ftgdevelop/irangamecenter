/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getDepositBankGateway, makeDepositToken } from "@/actions/payment";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Loading from "../icons/Loading";
import { useAppDispatch } from "@/hooks/use-store";
import { setReduxError } from "@/redux/errorSlice";
import { ServerAddress } from "@/enum/url";

type Props = {
    amount: number;
}
const OnlinePayment: React.FC<Props> = props => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const [getBanksLoading, setGetBanksLoading] = useState<boolean>(false);
    const [goToBankLoading, setGoToBankLoading] = useState<boolean>(false);
    

    const [selectedBankId, setSelectedBankId] = useState<number | undefined>(undefined);

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

        const callbackUrl = window?.location.origin + "/profile/wallet";

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
            <>
                <h4 className="text-center mb-5 mt-10 text-base"> انتخاب درگاه بانکی </h4>

                {getBanksLoading ? (
                    <div>
                        <Image src="/images/loading.gif" className="h-20 w-20 mx-auto mb-6 -mt-1" alt="loading" width={96} height={96} />
                    </div>
                ) : bankGateways?.length ? (
                    <div className="flex gap-3 justify-center items-center mb-8 py-px">
                        {bankGateways.map(gateway => (
                            <button
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
                ) : bankGateways ?  (
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
        </>
    )
}

export default OnlinePayment;