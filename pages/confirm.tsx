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

  const [mode, setMode] = useState<"error"|"success"|"pending">("pending");

  const [errorMessage, setErrorMessage] = useState<string>("");

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
      
      setMode("pending");
      
      // const response : any = await confirmByDeposit(params , token);
      // console.log(response.data);
      
      // debugger;

      // if(response.data?.result?.isSuccess){
      //   debugger;
      // }else{
      //   debugger;
      // }

      const approveResponse : any = await approve({orderId:params.reserveId, orderNumber: params.username, token:token});

      if(approveResponse.message){
        debugger;
        setErrorMessage(approveResponse.message);
        setMode("error")
      }

      
      debugger;
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
      >
        ثبت اطلاعات اکانت
      </button>

    </div>
  );

  if(mode === "error"){
   element = ( 
   <div className="bg-[#34142a] text-white p-5 confirm-min-h flex flex-col justify-center text-center items-center rounded-xl">
      <div className="bg-[#011425] p-2.5 rounded-full mb-3">
        <Image src={'/images/icons/error.svg'} width={28} height={28} className="w-8 h-8" alt="error"/>
      </div>

      <h5 className="mb-5 font-bold text-xl text-[#ff163e]"> پرداخت شما ناموفق بود! </h5>
      
      {errorMessage ? (
        <p className="text-[12px] mb-12"> 
          {errorMessage}
        </p>
      ):(
        <>
          <p className="text-[11px] mb-1"> 
            متأسفانه تراکنش شما با خطا مواجه شد یا از سوی بانک تأیید نشد.
          </p>
          <p className="text-[11px] mb-12"> 
            لطفاً موجودی حساب و اتصال اینترنت خود را بررسی کرده و مجدداً تلاش کنید.
          </p>
        </>
      )}
      
      <Link
        href={`/payment?orderNumber=${orderNumber}&orderId=${orderId}`}
        className="flex gap-3 items-center justify-center h-11 w-full mb-5 text-white bg-gradient-violet rounded-full text-sm"
      >
        <Refresh className="w-4 h-4 fill-current" />
        تلاش مجدد برای پرداخت
      </Link>
      <Link
        href="/"
        className="flex gap-3 items-center justify-center h-11 w-full mb-5 text-white bg-gradient-orange rounded-full text-sm"
      >
        <Home className="w-4 h-4 fill-current" />
        بازگشت به فروشگاه
      </Link>

    </div>
  )}

  if(mode === "pending"){
   element = ( 
   <div className="bg-[#231c50] text-white p-5 confirm-min-h flex flex-col justify-center text-center items-center rounded-xl">
      <div className="bg-[#011425] rounded-full mb-3">
        <Image src={'/images/loading.gif'} width={280} height={280} className="w-16 h-16" alt="error"/>
      </div>

      <h5 className="mb-5 font-bold text-xl bg-gradient-to-t from-[#FD5900] to-[#FFDE00] bg-clip-text text-transparent drop-shadow"> در حال صدور سفارش شما </h5>

      <p className="text-[11px] mb-1" > پرداخت شما با موفقیت انجام شده است. </p>
      <p className="text-[11px] mb-1"> در حال ثبت و صدور سفارش توسط سیستم هستیم.
       لطفاً چند ثانیه منتظر بمانید و از بستن یا رفرش کردن این صفحه خودداری کنید. </p>
      <p className="text-[11px] mb-12"> پس از تکمیل فرآیند، نتیجه به‌صورت خودکار نمایش داده خواهد شد.</p>

    </div>
  )}

  return (
    <>
      <Steps activeStepKey="payment" />

      <div className="p-5">
        {element}        
      </div>
    </>
  );
}
