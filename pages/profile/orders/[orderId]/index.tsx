/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getOrderById } from "@/actions/commerce";
import OrderDetailItem from "@/components/authentication/profile/Orders/OrderDetailItem";
import OrderTransactions from "@/components/authentication/profile/Orders/OrderTransactions";
import Skeleton from "@/components/shared/Skeleton";
import { numberWithCommas, toPersianDigits } from "@/helpers";
import { getCurrencyLabelFa } from "@/helpers/currencyLabel";
import { useAppDispatch } from "@/hooks/use-store";
import { setHeaderType2Params } from "@/redux/pages";
import { OrderDetail } from "@/types/commerce";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

const OrderDeatil: NextPage = () => {

  const [orderDetail, setOrderDetail] = useState<undefined | OrderDetail>();
  const [fetchingOrder, setFetchingOrder] = useState<boolean>(false);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { orderId } = router.query;

  useEffect(()=>{

    dispatch(setHeaderType2Params({
      backUrl:"/profile/orders",
      title:"",
      withLogo: true
    }));

    return(()=>{
      dispatch(setHeaderType2Params({
        backUrl:"",
        title:""
      }));
    })

  },[]);


  useEffect(() => {

    const fetchData = async (id:number) => {
        
        const userToken = localStorage.getItem("Token");
        
        if (!userToken) return;
        setFetchingOrder(true);
        const response: any = await getOrderById({id:id, token: userToken});
        if(response.data?.result){
            setOrderDetail(response.data.result);
        }
        setFetchingOrder(false);
    }

    if(orderId){
        fetchData(+orderId);
    }

  }, [orderId]);

  

  let creationTimeString : ReactNode = toPersianDigits(orderDetail?.creationTime || "-");

  if(orderDetail?.creationDateStr){
    creationTimeString = toPersianDigits(orderDetail.creationDateStr);

    if(orderDetail.creationTimeStr){
      creationTimeString += ` - ${toPersianDigits(orderDetail.creationTimeStr)}`;
    }
  }

  if(fetchingOrder){
    creationTimeString = <Skeleton className="h-3 w-12" dark />
  }


  const pairItems:{label: string; value: ReactNode}[] = [
    {
      label:"شماره سفارش",
      value: fetchingOrder ? ( <Skeleton className="h-3 w-12" dark /> ) : orderDetail?.id.toString() || "-"
    },
    {
      label:"تاریخ ثبت سفارش",
      value: <span dir="ltr"> {creationTimeString} </span>
    },
    {
      label:"مبلغ",
      value: fetchingOrder ? ( <Skeleton className="h-3 w-12" dark /> ) : orderDetail?.payableAmount?  `${numberWithCommas(orderDetail.payableAmount)} ${getCurrencyLabelFa(orderDetail.currencyType)}`  : "-"
    },
    {
      label:"سود شما از خرید",
      value: fetchingOrder ? ( <Skeleton className="h-3 w-12" dark /> ) : orderDetail?.profitAmount?  `${numberWithCommas(orderDetail.profitAmount)} ${getCurrencyLabelFa(orderDetail.currencyType)}`  : "-"
    },
    {
      label:"نوع پرداخت",
      value: fetchingOrder ? ( <Skeleton className="h-3 w-12" dark /> ) : orderDetail?.paymentStatus || "-"
    }
  ];

  return (
    <>
      <div className="bg-[#e8ecf0] dark:bg-[#192a39] px-5 py-3 text-xs text-center">
        <Image src="/images/icons/sand-clock.svg" alt="sand clock" width={24} height={24} className="w-6 h-6 inline-block ml-2" />
        لطفاً اطلاعات اکانت بازی خود را برای ادامه فرایند وارد کنید.
      </div>
      <div className="p-5">

        {pairItems.map(item => (
          <div
            key={item.label}
            className="flex justify-between mb-3 text-sm"
          >
            <label> {item.label} </label>
            <div className="font-semibold"> {item.value} </div>
          </div>
        ))}

        {orderId && <OrderTransactions orderId={+orderId} />}

        {!!orderId && orderDetail?.items?.map(item => (
          <OrderDetailItem
            key={item.id}
            itemData={item}
            orderId={+orderId}
          />
        ))}

      </div>
    </>
  );
}

export default OrderDeatil;
