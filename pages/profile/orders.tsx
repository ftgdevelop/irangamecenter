/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getAllOrders } from "@/actions/commerce";
import OrderItem from "@/components/authentication/profile/Orders/OrderItem";
import SearchIcon from "@/components/icons/SearchIcon";
import Pagination from "@/components/shared/Pagination";
import Skeleton from "@/components/shared/Skeleton";
import { OrderListItemType } from "@/types/commerce";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

const Orders: NextPage = () => {

  const [orders, setOrders] = useState<undefined | OrderListItemType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchingOrders, setFetchingOrders] = useState<boolean>(false);

  const [enteredText, setEnteredText] = useState<string>("");


useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  const handler = setTimeout(async () => {
    if (enteredText.length >= 3 || enteredText.length === 0) {
      setFetchingOrders(true);

      const userToken = localStorage.getItem("Token");
      if (!userToken) return;

      try {
        const response: any = await getAllOrders(
          {
            MaxResultCount: 10,
            SkipCount: (currentPage - 1) * 10,
            search: enteredText || "",
            status: [],
          },
          userToken,
          signal // ارسال signal برای cancel کردن
        );

        if (response.data?.result) {
          setTotalCount(response.data.result.totalCount);
          setOrders(response.data.result.items || []);
        } else {
          setOrders(undefined);
        }
      } catch (error: any) {
        if (error.name === "CanceledError") {
          console.log("Previous request canceled");
        } else {
          setOrders(undefined);
        }
      } finally {
        setFetchingOrders(false);
      }
    }
  }, 500);

  return () => {
    clearTimeout(handler);
    controller.abort(); // لغو درخواست قبلی
  };
}, [enteredText, currentPage]);

  return (
    <div className="px-5">
      
      <div className="relative mb-4">
        <input 
          className="w-full px-5 h-11 bg-white pr-12 dark:bg-[#192a39] border border-neutral-300 dark:border-transparent outline-none rounded-full text-sm"
          placeholder="جستجو بر اساس شماره سفارش"
          onChange={e => {setEnteredText(e.target.value)}}
          value={enteredText}
        />
        <SearchIcon className="w-6 h-6 absolute fill-current top-1/2 -mt-3 right-3" />
      </div>

      {fetchingOrders ? 
        [1,2,3].map(item => (
        <div key={item} className="border-b border-neutral-300 dark:border-white/25 py-5">

            <div className="flex justify-between items-center mb-3">
              <Skeleton dark className="h-5 w-14" />
              <Skeleton dark className="h-5 w-5 rounded-full" type="button" />
            </div>

            <Skeleton dark className="w-24 h-4 mb-3" />

            <div className="flex justify-between items-center mb-3">
              <Skeleton dark className="h-5 w-14" />
              <Skeleton dark className="h-5 w-14" />
            </div>
            
            <Skeleton dark className="w-16 h-16 rounded-lg" type="image" />

        </div>
        )
      ): orders?.length ? 
          orders.map(order => <OrderItem key={order.id} order={order} />
      ): !orders ? (
        <div className="py-10 text-center text-sm text-red-600 font-semibold">
        <Image
          width={90}
          height={90}
          src="/images/icons/2color/empty-cart.svg"
          alt="empty"
          className="mx-auto mb-5"
        />
          سفارشی یافت نشد
        </div>
      ) : null }

      {!!totalCount && <Pagination onChange={setCurrentPage} currentPage={currentPage} itemsPerPage={10} totalItems={totalCount} wrapperClassName="my-5" />}

    </div>
  );
}

export default Orders;