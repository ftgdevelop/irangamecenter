/* eslint-disable  @typescript-eslint/no-explicit-any */

import { getTransactionDeposit, getTransactionDeposit2222222222222222222222 } from "@/actions/payment";
import CheckIcon from "@/components/icons/CheckIcon";
import Accordion from "@/components/shared/Accordion";
import { numberWithCommas, toPersianDigits } from "@/helpers";
import { getCurrencyLabelFa } from "@/helpers/currencyLabel";
import { Transaction } from "@/types/payment";
import React, { useEffect, useState } from "react";

type Props = {
  orderId: number;
};

const OrderTransactions: React.FC<Props> = (props) => {
  const { orderId } = props;

  const [orderTransactions, setOrderTransactions] = useState<Transaction[]>();

  useEffect(() => {
    const fetchTransactions = async (id: number) => {
      const userToken = localStorage.getItem("Token");
      if (!userToken) return;

      const response: any = await getTransactionDeposit(
        {
          reserveId: id,
          MaxResultCount: 15,
          SkipCount: 0,
          CurrencyType: "IRR",
        },
        userToken
      );

      if (response.data?.result?.totalCount) {
        setOrderTransactions(response.data.result.items);
      }

      await getTransactionDeposit2222222222222222222222(
                {
          reserveId: id,
          MaxResultCount: 15,
          SkipCount: 0,
          CurrencyType: "IRR",
        },
        userToken
      );
      
    };
    if (orderId) {
      fetchTransactions(orderId);
    }
  }, [orderId]);

  let content = null;

  if (orderTransactions?.length) {
    content = orderTransactions.map((t) => (
      <div
        key={t.id}
        className="px-4 py-6 rounded-xl bg-gradient-light-green dark:bg-gradient-dark-green my-2 text-xs flex gap-3 items-start"
      >
        <div className="shrink-0 p-0.5 bg-gradient-green rounded-full">
          <CheckIcon className="w-5 h-5" />
        </div>
        <div className="grow">
          <div className="text-sm font-semibold mb-3.5"> پرداخت موفق </div>
          <div className="flex justify-between mb-3.5">
            <label> تاریخ واریز </label>
            <div className="font-semibold">
              {" "}
              {toPersianDigits(t.creationDateStr || "")}{" "}
            </div>
          </div>
          <div className="flex justify-between">
            <label> مبلغ واریز </label>
            <div className="font-semibold">
              {" "}
              {numberWithCommas(Math.abs(t.amount))}{" "}
              {getCurrencyLabelFa(t.currencyType)}{" "}
            </div>
          </div>
        </div>
      </div>
    ));
  } else {
    content = <div>تراکنشی برای این سفارش پیدا نشد.</div>;
  }

  return (
    <Accordion
      WrapperClassName="my-7"
      titleIsSimpleLeft
      withArrowIcon
      titleClassName="text-[#a93aff]"
      title="جزییات تراکنش ها"
      content={content}
      updateContent={orderTransactions?.[0].creationTime}
    />
  );
};

export default OrderTransactions;
