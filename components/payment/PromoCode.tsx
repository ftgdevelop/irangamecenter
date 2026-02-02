/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import Accordion from "../shared/Accordion";
import Loading from "../icons/Loading";

type Props = {
  onSubmit: (value: string) => void;
  onChangeText: () => void;
  onRemoveAddedCode : () => void;
  loading?: boolean;
  removeDiscountLoading?: boolean;
  data: any;
};

const PromoCode: React.FC<Props> = (props) => {
  const [text, setText] = useState<string>();

  let resultStatus: React.ReactNode = null;
  let isError: boolean = false;

  let discountAdded = false;
  if (props.data?.code) {
    isError = true;

    switch (props.data.code) {
      case 6101:
        resultStatus = "این کد تخفیف وجود ندارد";
        break;
      case 6102:
        resultStatus = "این کد تخفیف برای این سرویس نیست";
        break;
      case 6103:
        resultStatus = "این کد تخفیف شروع نشده است";
        break;
      case 6104:
        resultStatus = "این کد تخفیف به اتمام رسیده است";
        break;
      case 6105:
        resultStatus = "این کد تخفیف را دیگر نمی توانید استفاده کنید";
        break;
      default:
        resultStatus = null;
    }
  } else if (props.data?.isValid) {
    resultStatus = "کد تخفیف اضافه گردید";
    discountAdded= true;
  }

  return (
    <Accordion
      WrapperClassName="my-5"
      withArrowIcon
      rotateArrow180
      initiallyOpen
      title="کد تخفیف"
      content={
        <div className="mb-7">
          <div className="flex gap-3">
            <div className="grow relative">
              <input
                type="text"
                onChange={(e) => {
                  setText(e.target.value);
                  props.onChangeText();
                }}
                className="p-3.5 disabled:opacity-40 tracking-[4px] outline-none text-sm rounded-full px-5 w-full bg-white border border-[#cccccc] dark:bg-[#192a39] dark:border-[#192a39]"
                value={text}
                placeholder="کد تخفیف را وارد نمایید"
                disabled={discountAdded}
              />

              <button
                type="button"
                onClick={() => {
                  props.onSubmit(text || "");
                }}
                disabled={!text?.length || props.loading || discountAdded}
                className={`absolute top-0 left-0 text-white bottom-0 text-sm px-6 rounded-full flex gap-3 items-center w-28 justify-center ${discountAdded ? "bg-[#a93aff]/50" :text?.length?"bg-[#a93aff]":"bg-[#cccccc] dark:bg-[#362d61]"}`}
              >
                ثبت
                {props.loading && <Loading className="w-6 h-6 fill-current animate-spin" />}
              </button>
            </div>
            {discountAdded && <button
              type="button"
              className="p-0 text-red-600 border-none outline-none flex items-center gap-1"
              onClick={()=>{
                setText("");
                props.onRemoveAddedCode();
              }}
            >
              حذف کد تخفیف
              {props.removeDiscountLoading && <Loading className="w-6 h-6 fill-current animate-spin" /> }
            </button>}
          </div>

          {resultStatus && (
            <p className={`text-xs my-2 ${isError?"text-red-600":"text-green-500"}`}>
              {resultStatus}
            </p>
          )}
        </div>
      }
    />
  );
};

export default PromoCode;
