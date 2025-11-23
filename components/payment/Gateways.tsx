/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getBanksGateways } from "@/actions/payment";
import Image from "next/image";
import { useEffect, useState } from "react";
import CheckIcon from "../icons/CheckIcon";
import Skeleton from "../shared/Skeleton";

type Props = {
    orderId: number;
    orderNumber: string;
}

export type GatewayItem = {
    id: number;
    name?: string;
    displayName?: string;
    isEnabled: boolean;
    image?: {
        path?: string;
        titleAttribute?: string;
        altAttribute?: string;
    },
    "form": {
        "elements": []
    }
}

const Gateways: React.FC<Props> = props => {

    const { orderId, orderNumber } = props;

    const [selectedGatewayId, setSelectedGatewayId] = useState<number>();

    type GatewayGroupItem = {
        keyword: string;
        category: "Group" | string;
        name?: string;
        title?: string;
        description?: string;
        image?: {
            path?: string;
            titleAttribute?: string;
            altAttribute?: string;
        },
        gateways: GatewayItem[]
    };

    const [gateways, setGateways] = useState<GatewayGroupItem[]>();
    const [getGatewaysLoading, setGetGatewaysLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchBanks = async (orderId: number, orderNumber: string) => {
            const token = localStorage.getItem('Token');
            if (!token) return;
            setGetGatewaysLoading(true);
            const response: any = await getBanksGateways({
                reserveId: orderId,
                username: orderNumber,
                token: token
            }, "fa-IR");

            if (response.data?.result) {
                setGateways(response.data.result);
            }
            setGetGatewaysLoading(false);

        }

        if (orderId && orderNumber) {
            fetchBanks(+orderId, orderNumber as string);
        }


    }, [orderId, orderNumber]);

    if (getGatewaysLoading ) {
        return [1, 2].map(i => (
            <div key={i} className="mb-10">
                <div className="flex justify-between mb-4">
                    <Skeleton className="w-12 h-4" dark />
                    <Skeleton className="w-24 h-4" dark />
                </div>

                {[1, 2, 3].map(x => (
                    <div key={x} className="flex rounded-[13px] items-center justify-between p-5 bg-[#192a39] mb-4">
                        <div className="flex items-center gap-3">
                            <Skeleton type="image" className="w-7 h-7 rounded-full" dark />
                            <Skeleton className="w-24 h-4" dark />
                        </div>
                        <Skeleton type="image" className="w-7 h-7" dark />
                    </div>
                ))}
            </div>
        ))
    }

    return (
        <>
            {gateways?.map(item => <div key={item.keyword} className="box-border margin-bottom bank-group-item">
                <div key={item.keyword} className="flex gap-1 items-center justify-between mb-2">

                    <h5 >
                        {item.title} <span className="text-xs"> ({item.name}) </span>
                    </h5>

                    <div className="flex gap-1 items-center">
                        <Image
                            src={item.image?.path || "/images/default-game.png"}
                            alt={item.image?.altAttribute || item.name || ""}
                            title={item.image?.titleAttribute || item.name}
                            className="w-6 h-6 object-contain object-center block"
                            width={24}
                            height={24}
                        />
                        <span className="text-[11px]">{item.description}</span>
                    </div>
                </div>

                {item.gateways.map(gatewayItem => (
                    <button
                        key={gatewayItem.id}
                        type="button"
                        className={`w-full p-[2px] rounded-[15px] mt-3 ${selectedGatewayId === gatewayItem.id ? "bg-gradient-to-t from-[#01b59c] to-[#9afeab] text-white" : "bg-[#192a39]"}`}
                        onClick={() => { setSelectedGatewayId(gatewayItem.id) }}
                    >
                        <div className={`flex rounded-[13px] items-center justify-between p-5 ${selectedGatewayId === gatewayItem.id ? "bg-gradient-to-t from-[#012431] to-[#0f2b32] text-white" : ""}`}>
                            <div className="flex gap-3 items-center">
                                <div className={`w-7 h-7 rounded-full border inline-flex justify-center items-center ${selectedGatewayId === gatewayItem.id ? "bg-gradient-to-t from-[#01b59c] to-[#9afeab] border-[#01b59c]" : "border-white"}`}>
                                    {selectedGatewayId === gatewayItem.id && <CheckIcon className="w-5 h-5 fill-current" />}
                                </div>
                                {gatewayItem.displayName || gatewayItem.name}
                            </div>

                            <Image
                                src={gatewayItem.image?.path || "/images/default-game.png"}
                                alt={gatewayItem.image?.altAttribute || item.name || ""}
                                title={gatewayItem.image?.titleAttribute || item.name}
                                className="w-7 h-7 object-contain object-center block"
                                width={24}
                                height={24}
                            />
                        </div>

                    </button>
                ))}

            </div>
            )
            }
        </>
    )
}

export default Gateways;