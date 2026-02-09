/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getOrderById, getOrderDetailItem } from "@/actions/commerce";
import FormItem from "@/components/authentication/profile/Orders/FormItem";
import Skeleton from "@/components/shared/Skeleton";
import { numberWithCommas } from "@/helpers";
import { getCurrencyLabelFa } from "@/helpers/currencyLabel";
import { useAppDispatch } from "@/hooks/use-store";
import { setHeaderParams } from "@/redux/pages";
import { OrderDetail, OrderFormData } from "@/types/commerce";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const OrderItemDeatil: NextPage = () => {
  const [orderDetail, setOrderDetail] = useState<undefined | OrderDetail>();
  const [fetchingOrder, setFetchingOrder] = useState<boolean>(true);

  const [data, setData] = useState<undefined | OrderFormData[]>();
  const [fetchingFormData, setFetchingFormData] = useState(true);

  const [activeFormKey, setActiveFormKey] = useState("");

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { orderId, orderItemId } = router.query;

  useEffect(() => {
    const fetchData = async (id: number) => {
      const userToken = localStorage.getItem("Token");

      if (!userToken) return;
      setFetchingOrder(true);
      const response: any = await getOrderById({ id: id, token: userToken });
      if (response.data?.result) {
        setOrderDetail(response.data.result);
      }
      setFetchingOrder(false);
    };

    if (orderId) {
      fetchData(+orderId);
    }

  }, [orderId]);

  useEffect(()=>{

    dispatch(setHeaderParams({
      headerParams:{
        logo: true
      }
    }));

    return(()=>{
      dispatch(setHeaderParams({headerParams: undefined}));
    })

  },[]);

  useEffect(() => {
    const fetchData = async (id: number) => {
      const userToken = localStorage.getItem("Token");
      if (!userToken) return;
      setFetchingFormData(true);
      const response: any = await getOrderDetailItem({
        id: id,
        token: userToken,
      });
      if (response.data?.result?.length) {
        setData(response.data.result);
        setActiveFormKey(response.data.result[0]?.providerKey);
      }
      setFetchingFormData(false);
    };

    if (orderItemId) {
      fetchData(+orderItemId);
    }
  }, [orderItemId]);

  const orderItemData = orderItemId
    ? orderDetail?.items?.find((item) => item.id === +orderItemId)
    : undefined;

  const activeField = useMemo(
    () => data?.find((item) => item.providerKey === activeFormKey)?.fields,
    [activeFormKey]
  );

  const activeId = useMemo(
    () => data?.find((item) => item.providerKey === activeFormKey)?.id,
    [activeFormKey]
  );

  return (
    <>
      <div className="px-5">
        <div className="mb-4 text-xs bg-gradient-yellow flex items-center justify-center gap-3 rounded-full px-5 py-2 text-neutral-700">
          <Image
            src="/images/icons/error.svg"
            alt="error"
            className="w-5 h-5"
            width={100}
            height={100}
          />
          نکات مهم درباره اطلاعات اکانت
        </div>
        {fetchingFormData || fetchingOrder ? (
          <div className=" flex gap-3">
            <Skeleton
              dark
              type="image"
              className="w-1/4 max-w-[100px] aspect-square rounded-2xl grow-0 shrink-0"
            />
            <div className="flex flex-col justify-between grow py-2">
              <Skeleton dark className="h-4 w-1/3" />
              <Skeleton dark className="h-4 w-2/3" />
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <Image
              src={
                orderItemData?.variant?.filePath ||
                orderItemData?.product.filePath ||
                "/images/default-game.png"
              }
              alt={
                orderItemData?.variant?.description ||
                orderItemData?.product.name ||
                ""
              }
              width={100}
              height={100}
              className="w-1/4 max-w-[100px] aspect-square object-cover rounded-2xl grow-0 shrink-0"
            />
            <div className="flex flex-col justify-between grow py-2">
              <p className="font-semibold mb-2">
                {orderItemData?.product.name}
              </p>
              <div className="flex justify-between flex-wrap gap-3 items-end">
                <div>
                  {orderItemData?.variant?.description && (
                    <p className="text-xs mt-2">
                      {orderItemData.variant.description}
                    </p>
                  )}
                  {!!orderItemData?.variant?.attributes?.length && (
                    <p className="text-xs mt-2">
                      {orderItemData?.variant?.attributes?.join("، ")}
                    </p>
                  )}
                </div>
                <div className="self-end font-semibold">
                  {orderItemData?.unitPrice
                    ? `${numberWithCommas(
                        orderItemData.unitPrice
                      )} ${getCurrencyLabelFa(orderItemData.currencyType)}`
                    : ""}
                </div>
              </div>
            </div>
          </div>
        )}

        <hr className="my-4 border-neutral-300 dark:border-white/25" />
        <button
          type="button"
          className="bg-white border border-neutral-300 dark:border-transparent dark:bg-[#192b39] w-full rounded-full px-5 py-3 text-xs flex justify-center items-center gap-2"
        >
          انتخاب از اکانت های ذخیره شده
        </button>
        <hr className="my-4 border-neutral-300 dark:border-white/25" />

        <h5 className="text-sm font-semibold mb-2 mt-7"> انتخاب پلتفرم </h5>
        <p className="text-xs mb-3">
          {" "}
          برای ورود به بازی از کدام روش استفاده میکنید؟{" "}
        </p>
        {data?.length ? (
          <>
            <div
              className={`${
                data.length === 2
                  ? "grid grid-cols-2"
                  : data.length === 3
                  ? "grid grid-cols-3"
                  : "flex"
              } gap-3`}
            >
              {data.map((item) => (
                <button
                  key={item.providerKey}
                  type="button"
                  onClick={() => {
                    setActiveFormKey(item.providerKey);
                  }}
                  className={`font-semibold px-5 h-11 ${
                    [2, 3].includes(data.length) ? "w-full block" : "min-w-32"
                  } rounded-full ${
                    item.providerKey === activeFormKey
                      ? "bg-gradient-green text-[#111111]"
                      : "bg-white border border-neutral-300 dark:bg-[#192b39] dark:border-transparent dark:text-white"
                  }`}
                >
                  {item.displayName || item.providerKey}
                </button>
              ))}
            </div>

            {activeField && activeId && orderItemId && (
              <FormItem
                key={activeFormKey}
                fields={activeField}
                orderItemId={+orderItemId}
                loginProviderId={+activeId}
              />
            )}
          </>
        ) : (
          <div className="flex gap-3">
            <Skeleton dark type="button" className="w-24 rounded-full h-11" />
            <Skeleton dark type="button" className="w-32 rounded-full h-11" />
          </div>
        )}
      </div>
    </>
  );
};

export default OrderItemDeatil;
