/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getOrderById } from "@/actions/commerce";
import { getBanksGateways, makeTokenByAmount } from "@/actions/payment";
import Gateways from "@/components/payment/Gateways";
import PaymentByDeposit from "@/components/payment/PaymentByDeposit";
import Steps from "@/components/payment/Steps";
import SimplePortal from "@/components/shared/layout/SimplePortal";
import LoadingFull from "@/components/shared/LoadingFull";
import { ServerAddress } from "@/enum/url";
import { numberWithCommas } from "@/helpers";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setReduxError } from "@/redux/errorSlice";
import { GatewayGroupItem } from "@/types/payment";
import { Skeleton } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PaymentPage() {

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const orderId = searchParams.get("orderId");

  const [goToBankLoading, setGoToBankLoading] = useState(false);

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

  const [depositIsSelected, setDepositIsSelected] = useState(false);

  const [selectedGatewayId, setSelectedGatewayId] = useState<number>();
  const [gateways, setGateways] = useState<GatewayGroupItem[]>();
  const [getGatewaysLoading, setGetGatewaysLoading] = useState<boolean>(false);

  const router = useRouter();

  const balance = useAppSelector(state => state.authentication.balance);
  const balanceLoading = useAppSelector(state => state.authentication.balanceLoading);
  const getUserLoading = useAppSelector(state => state.authentication.getUserLoading);
  const balanceCurrency = useAppSelector(state => state.authentication.balanceCurrency);

  useEffect(()=>{
    if(gateways?.length){
      setSelectedGatewayId(gateways[0]?.gateways?.[0]?.id);
    }
  },[gateways?.length]);

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


    const fetchBanks = async (orderId: number, orderNumber: string) => {
      const token = localStorage.getItem("Token");
      if (!token) return;
      setGetGatewaysLoading(true);
      const response: any = await getBanksGateways(
        {
          reserveId: orderId,
          username: orderNumber,
          token: token,
        },
        "fa-IR"
      );

      if (response.data?.result) {
        setGateways(response.data.result);
      }
      setGetGatewaysLoading(false);
    };

    if (orderId && orderNumber) {
      fetchBanks(+orderId, orderNumber as string);
    }


  }, [orderId, orderNumber]);

  let requiredAmount: number = orderData?.payableAmount || 0;

  let withdrawFromWallet = 0;

  const isTheSameCurrency = balanceCurrency === orderData?.currencyType;

  if(isTheSameCurrency && balance && depositIsSelected && orderData?.payableAmount){
    if (balance >= orderData.payableAmount){
      requiredAmount = 0;
      withdrawFromWallet = orderData.payableAmount;
    }else{
      requiredAmount = orderData?.payableAmount - balance;
      withdrawFromWallet = balance;
    }
  }

  const onSubmit = async () => {
    setGoToBankLoading(true);
    
    if(withdrawFromWallet && !requiredAmount){
      router.push(`/confirm?deposite=true&orderNumber=${orderNumber}&orderId=${orderId}`);
    }else{
      
      const callbackUrl = window?.location?.origin + "/confirm";

      const token = localStorage.getItem("Token");
      
      if(!selectedGatewayId || !orderId || !token) return;

      const response: any = await makeTokenByAmount({
        amount:requiredAmount < 30000 ? 30000 : requiredAmount,
        callBackUrl:callbackUrl,
        currencyType:"IRR",
        gatewayId: +selectedGatewayId,
        ipAddress:1,
        reserveId: +orderId
      }, token);

      debugger;
      console.log(response);
      debugger;
      
      if (response?.status == 200) {
        const url = `https://${ServerAddress.Payment}/Reserves/Payment/PaymentRequest?tokenId=${response.data.result.tokenId}`;         
        window.location.replace(url);
      } else {
          
        const errorMessage = response?.response?.data?.error?.message;
        dispatch(setReduxError({
            status: 'error',
            message: errorMessage || "ارسال اطلاعات ناموفق",
            isVisible: true
        }));

        setGoToBankLoading(false);
      }


      
      //makeTokenByAmount
      //goToBank
    }
  }

  return (
    <>

      {goToBankLoading && (
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
          <Gateways 
            gateways={gateways}
            getGatewaysLoading={getGatewaysLoading}
            selectedGatewayId={selectedGatewayId}
            onSelectGateway={setSelectedGatewayId}
           />
        )}

        {(orderData && !getUserLoading && !balanceLoading) ? (
          <PaymentByDeposit 
            onSelect={()=>{setDepositIsSelected(true)}} 
            isSelected={depositIsSelected} 
          /> 
        ):(
          <div>
            <Skeleton className="w-24 h-4 mb-6" />
          </div>
        )}

        <div className="text-sm flex gap-3 items-center justify-between mt-5">
          <label className="text-xs">
            قیمت کالاها ({orderData?.totalQuantity})
          </label>
          <span className="font-semibold">
            {numberWithCommas(orderData?.totalItemsPrice || 0)} ریال
          </span>
        </div>

        {!!withdrawFromWallet && (
        <div className="text-sm flex gap-3 items-center justify-between mt-5">
          <label className="text-xs"> پرداخت از کیف پول </label>
          <span className="font-semibold">
            {numberWithCommas(withdrawFromWallet)} ریال
          </span>
        </div>
        )}

        <div className="text-sm flex gap-3 items-center justify-between mt-5">
          <label className="text-xs"> مبلغ قابل پرداخت </label>
          <span className="font-semibold">
            {numberWithCommas(requiredAmount || 0)} ریال
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
            <label className="text-sm"> {!requiredAmount && withdrawFromWallet ? "پرداخت از کیف پول" : "مبلغ قابل پرداخت"} </label>
            <span className="font-semibold">
              {numberWithCommas(!requiredAmount && withdrawFromWallet ? withdrawFromWallet : requiredAmount || 0)} ریال
            </span>
          </div>
          <button
            type="button"
            className="w-full p-3 font-semibold bg-[#a93aff] text-white rounded-full"
            onClick = {onSubmit}
            disabled={!selectedGatewayId && !!requiredAmount}
          >
            {(withdrawFromWallet && !requiredAmount) ? 
            "پرداخت از کیف پول" :
            `پرداخت ${numberWithCommas(requiredAmount || 0)} ریال`
            }            
          </button>
        </footer>
        <div className="h-20" />
      </SimplePortal>
    </>
  );
}
