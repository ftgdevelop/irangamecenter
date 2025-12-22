/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getTransactionDeposit } from "@/actions/payment";
import React, { useEffect } from "react";

type Props = {
  orderId: number;
}

const OrderTransactions: React.FC<Props> = props => {

    const {orderId} = props;

    useEffect(()=>{
        const fetchTransactions = async (id:number) => {
            
            const userToken = localStorage.getItem("Token");
            if(!userToken) return;

            const response : any = await getTransactionDeposit({
                reserveId: id,
                MaxResultCount:15,
                SkipCount: 0,
                CurrencyType:"IRR"
            }, userToken);

            if(response.data?.result?.totalCount){
                console.log(response.data?.result);
            }
        }
        if(orderId){
            fetchTransactions(orderId);
        }
    },[orderId]);

  return (
    <span
      className="flex items-center px-4 h-7 rounded-full font-semibold"
    >
      {orderId}
    </span>
  );
};

export default OrderTransactions;