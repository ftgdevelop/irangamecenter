/* eslint-disable  @typescript-eslint/no-explicit-any */

import { approve, getOrderById } from "@/actions/commerce";
import Home from "@/components/icons/Home";
import Refresh from "@/components/icons/Refresh";
import Steps from "@/components/payment/Steps";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";



export default function Confirm() {

  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const orderId = searchParams.get("orderId");
  const isDeposite = searchParams.get("deposite");

  const [errorMode, setError] = useState<boolean>(true);

  interface OrderDetail {
    currencyType: "IRR" | string;
    creationTime: string;
    firstName?: string;
    gender: boolean;
    id: number;
    items: any[];
    lastName?: string;
    orderNumber: string;
    payableAmount: number;
    paymentStatus: "None";
    phoneNumber: "+989374755674";
    profitAmount: number;
    profitPercent: number;
    specialRequest?: unknown;
    status: "Pending" | string;
    tenantId: number;
    totalItemsPrice: number;
    totalQuantity: number;
  }
  const [orderData, setOrderData] = useState<OrderDetail>();
  if(orderData){
    //todo:
    console.log(orderData.status);
  }

  const [paymentByDepositLoading, setPaymentByDepositLoading] = useState(false);
  
  const router = useRouter();

  useEffect(() => {

    const fetchOrder = async (id: string) => {
      
      const token = localStorage.getItem("Token");

      if(!token){
        router.push("/");
      }

      const response: any = await getOrderById({
        id: +id,
        currency: "IRR",
        token: token || "",
      });

      setOrderData(response?.data?.result);
    };

    if (orderId) {
      fetchOrder(orderId);
    }


  }, [orderId, orderNumber]);

  useEffect(()=>{
    
    const token = localStorage.getItem("Token");

    const confirm = async (params:{ reserveId : number; username: string } , token: string) => {
      
      setPaymentByDepositLoading(true);
      
      // const response : any = await confirmByDeposit(params , token);
      // console.log(response.data);
      
      // debugger;

      // if(response.data?.result?.isSuccess){
      //   debugger;
      // }else{
      //   debugger;
      // }

      const approveResponse : any = await approve({orderId:params.reserveId, orderNumber: params.username, token:token});
      debugger;
      setPaymentByDepositLoading(false);
      console.log(approveResponse);

    }

    if(isDeposite && token && orderId && orderNumber && token){
      confirm({reserveId:+orderId, username:orderNumber}, token)
    }

  },[isDeposite, orderId, orderNumber]);
  
  let element : ReactNode = (
    <div className="bg-[#231c51] text-white p-5 confirm-min-h flex flex-col justify-center text-center items-center rounded-xl">
      <div className="bg-[#011425] p-3 rounded-full mb-3">
        <Image src={'/images/icons/check-violet.svg'} width={28} height={28} className="w-7 h-7" alt="check mark"/>
      </div>

      <h5 className="mb-5 font-bold text-xl bg-gradient-to-t from-[#b140ff] to-[#fbd0ff] bg-clip-text text-transparent"> پرداخت موفق </h5>
      <p className="text-[11px] mb-1"> 
        سفارش شما با موفقیت ثبت شد.
      </p>
      <p className="text-[11px] mb-12"> 
        لطفاً در مرحله بعد، اطلاعات اکانت خود را برای انجام سفارش وارد کنید. 
      </p>
      <button
      type="button"
      className="h-11 w-full mb-5 text-white bg-gradient-violet rounded-full text-sm"
      onClick={()=>{setError(x => !x)}}
      >
        ثبت اطلاعات اکانت
      </button>

    </div>
  );

  if(errorMode){
   element = ( 
   <div className="bg-[#34142a] text-white p-5 confirm-min-h flex flex-col justify-center text-center items-center rounded-xl">
      <div className="bg-[#011425] p-2.5 rounded-full mb-3">
        <Image src={'/images/icons/error.svg'} width={28} height={28} className="w-8 h-8" alt="error"/>
      </div>

      <h5 className="mb-5 font-bold text-xl text-[#ff163e]"> پرداخت شما ناموفق بود! </h5>
      <p className="text-[11px] mb-1"> 
        متأسفانه تراکنش شما با خطا مواجه شد یا از سوی بانک تأیید نشد.
      </p>
      <p className="text-[11px] mb-12"> 
        لطفاً موجودی حساب و اتصال اینترنت خود را بررسی کرده و مجدداً تلاش کنید.
      </p>
      <button
        type="button"
        className="flex gap-3 items-center justify-center h-11 w-full mb-5 text-white bg-gradient-violet rounded-full text-sm"
        onClick={()=>{setError(x => !x)}}
      >
        <Refresh className="w-4 h-4 fill-current" />
        تلاش مجدد برای پرداخت
      </button>
      <Link
        href="/"
        className="flex gap-3 items-center justify-center h-11 w-full mb-5 text-white bg-gradient-orange rounded-full text-sm"
      >
        <Home className="w-4 h-4 fill-current" />
        بازگشت به فروشگاه
      </Link>

    </div>
  )}

  return (
    <>

      {paymentByDepositLoading && (
        <div > loading </div>
        // <LoadingFull 
        //   details={{
        //     title:"در حال پرداخت از کیف پول",
        //     description:"لطفا صبر کنید ..."
        //   }}
        // />
      )}

      <Steps activeStepKey="payment" />

      <div className="p-5">
        {element}        
      </div>
    </>
  );
}
