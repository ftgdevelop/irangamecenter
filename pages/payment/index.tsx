/* eslint-disable  @typescript-eslint/no-explicit-any */

import { approve, getOrderById } from "@/actions/commerce";
//import { confirmByDeposit } from "@/actions/payment";
import Gateways from "@/components/payment/Gateways";
import PaymentByDeposit from "@/components/payment/PaymentByDeposit";
import Steps from "@/components/payment/Steps";
import SimplePortal from "@/components/shared/layout/SimplePortal";
import LoadingFull from "@/components/shared/LoadingFull";
import { numberWithCommas } from "@/helpers";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PaymentPage() {

  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const orderId = searchParams.get("orderId");

  interface OrderDetail {
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

  const [depositIsSelected, setDepositIsSelected] = useState(false);
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

  }, [orderId]);

  useEffect(()=>{
    
    const token = localStorage.getItem("Token");

    const confirmDeposit = async (params:{ reserveId : number; username: string } , token: string) => {
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
      console.log(approveResponse);

    }

    if(depositIsSelected && token && orderId && orderNumber){
      confirmDeposit({reserveId:+orderId, username:orderNumber}, token)
    }

  },[depositIsSelected, orderId, orderNumber]);

  return (
    <>

      {paymentByDepositLoading && (
        <LoadingFull 
          details={{
            title:"در حال پرداخت از کیف پول",
            description:"لطفا صبر کنید ..."
          }}
        />
      )}

      <Steps activeStepKey="payment" />

      <div className="p-4">
        <h2 className="text-lg font-semibold my-4 text-[#fd7e14] dark:text-[#ffefb2]">
          انتخاب روش پرداخت
        </h2>

        {!!(orderId && orderNumber) && (
          <Gateways orderId={+orderId} orderNumber={orderNumber} />
        )}

        <PaymentByDeposit 
          onSelect={()=>{setDepositIsSelected(true)}} isSelected={depositIsSelected} 
        />

        <div className="text-sm flex gap-3 items-center justify-between mt-5">
          <label className="text-xs">
            قیمت کالاها ({orderData?.totalQuantity})
          </label>
          <span className="font-semibold">
            {numberWithCommas(orderData?.totalItemsPrice || 0)} ریال
          </span>
        </div>

        <div className="text-sm flex gap-3 items-center justify-between mt-5">
          <label className="text-xs"> مبلغ قابل پرداخت </label>
          <span className="font-semibold">
            {numberWithCommas(orderData?.payableAmount || 0)} ریال
          </span>
        </div>

        <div className="text-sm flex gap-3 items-center justify-between mt-5">
          <label className="font-semibold bg-gradient-to-t from-[#FD5900] to-[#FFDE00] bg-clip-text text-transparent">
            سود شما از خرید
          </label>
          <span className="font-semibold bg-gradient-to-t from-[#FD5900] to-[#FFDE00] bg-clip-text text-transparent">
            {numberWithCommas(orderData?.profitAmount || 0)} ریال
          </span>
        </div>
      </div>

      <div className="h-[104px]" />

      <SimplePortal selector="fixed_bottom_portal">
        <footer className="min-h-20 fixed bottom-0 left-0 md:right-1/2 md:translate-x-1/2 bg-[#192a39] px-4 py-3 w-full md:max-w-lg">
          <div className="flex justify-between text-white mb-2">
            <label className="text-sm"> مبلغ قابل پرداخت </label>
            <span className="font-semibold">
              {numberWithCommas(orderData?.payableAmount || 0)} ریال
            </span>
          </div>
          <button
            type="button"
            className="w-full p-3 font-semibold bg-[#a93aff] text-white rounded-full"
          >
            پرداخت {numberWithCommas(orderData?.payableAmount || 0)} ریال
          </button>
        </footer>
        <div className="h-20" />
      </SimplePortal>
    </>
  );
}
