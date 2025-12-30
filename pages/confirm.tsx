/* eslint-disable  @typescript-eslint/no-explicit-any */

import { approve, getOrderById } from "@/actions/commerce";
import Home from "@/components/icons/Home";
import Refresh from "@/components/icons/Refresh";
import Steps from "@/components/payment/Steps";
import { OrderDetail } from "@/types/commerce";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function Confirm() {

  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const orderId = searchParams.get("orderId");
  const isDeposite = searchParams.get("deposite");

  const [mode, setMode] = useState<"error"|"success"|"pending">("pending");

  const [message, setMessage] = useState<string>("");
  const [detail, setDetail] = useState<string>("");

  const [orderData, setOrderData] = useState<OrderDetail>();

  useEffect(() => {

    const fetchOrder = async (id: string) => {
      
      const token = localStorage.getItem("Token");

      if(!token) return;

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
    if(!token) return;

    const confirm = async (params:{ reserveId : number; username: string } , token: string) => {
      
      setMode("pending");
      
      const approveResponse : any = await approve({orderId:params.reserveId, orderNumber: params.username, token:token});
      
      if(approveResponse?.data?.result?.success){
        setMode("success");
        setMessage(approveResponse.data.result.message);
        setDetail(approveResponse.data.result.detail);
      }else if(approveResponse?.response?.data?.error?.message){
        setMode("error");
        setMessage(approveResponse.response.data.error.message);
        setDetail(approveResponse.response.data.error.details)
      }else if(approveResponse.message){
        setMode("error")
        setMessage(approveResponse.message);
      }

      console.log("approveResponse: ",approveResponse);

    }

    if(isDeposite && token && orderId && orderNumber && token){
      confirm({reserveId:+orderId, username:orderNumber}, token)
    }

  },[isDeposite, orderId, orderNumber]);
  
  let element : ReactNode = "";

  if (mode === "success"){
    element = (
      <div className="bg-[#231c51] text-white p-5 confirm-min-h flex flex-col justify-center text-center items-center rounded-xl">
        <div className="bg-[#011425] p-3 rounded-full mb-3">
          <Image src={'/images/icons/check-violet.svg'} width={28} height={28} className="w-7 h-7" alt="check mark"/>
        </div>
  
        <h5 className="mb-5 font-bold text-xl bg-gradient-to-t from-[#b140ff] to-[#fbd0ff] bg-clip-text text-transparent"> پرداخت موفق </h5>
        <p className="text-[11px] mb-1"> 
          {message || "سفارش شما با موفقیت ثبت شد."}          
        </p>
        <p className="text-[11px] mb-12"> 
          {detail || "لطفاً در مرحله بعد، اطلاعات اکانت خود را برای انجام سفارش وارد کنید. "}          
        </p>
        {!!orderData?.id && <Link
          href={`/profile/orders/${orderData?.id}`}
          className="h-11 w-full mb-5 text-white bg-gradient-violet rounded-full text-sm"
        >
          {orderData?.items.some(x => x.allowNewLoginSubmission) ? "ثبت اطلاعات اکانت" : "جزییات سفارش"}
        </Link>}
  
      </div>
    );
  }

  if(mode === "error"){
   element = ( 
   <div className="bg-[#34142a] text-white p-5 confirm-min-h flex flex-col justify-center text-center items-center rounded-xl">
      <div className="bg-[#011425] p-2.5 rounded-full mb-3">
        <Image src={'/images/icons/error.svg'} width={28} height={28} className="w-8 h-8" alt="error"/>
      </div>

      <h5 className="mb-5 font-bold text-xl text-[#ff163e]"> { message || "پرداخت شما ناموفق بود!"} </h5>
      
      {detail && <div className="text-[11px] mb-12"> {detail} </div>}
      
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
