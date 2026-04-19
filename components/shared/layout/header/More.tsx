/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { setBodyScrollPosition, setBodyScrollable } from "@/redux/stylesSlice";
import { useAppDispatch } from "@/hooks/use-store";
import AddToWishList from "./AddToWishList";
import Share from "./Share";
import ProductNotificationSetting from "./ProductNotificationSetting";
import Bell from "@/components/icons/Bell";

type Props = {
  productId: number;
  variantId?: number;
};

const More: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [slideInDetails, setSlideInDetails] = useState<boolean>(false);

  useEffect(() => {
    if (openDetails) {
      setSlideInDetails(true);
      dispatch(setBodyScrollable(false));
      dispatch(setBodyScrollPosition(window?.pageYOffset || 0));
    } else {
      dispatch(setBodyScrollable(true));
    }
  }, [openDetails]);

  useEffect(() => {
    if (!slideInDetails) {
      setTimeout(() => {
        setOpenDetails(false);
      }, 300);
    }
  }, [slideInDetails]);

  const notificationIsActive = true;

  return (
    <>
      <div className="max-lg:py-4 max-lg:border-b max-lg:border-neutral-300 max-lg:dark:border-white/30 lg:p-1">
        <AddToWishList productId={props.productId} />
      </div>
      <div className="max-lg:py-4 max-lg:border-b max-lg:border-neutral-300 max-lg:dark:border-white/30 lg:p-1">
        <Share
          iconClassName="w-7 h-7 lg:w-6 lg:h-6 fill-current"
          buttonClassName="inline-flex items-center gap-3"
          label="به اشتراک گذاری"
        />
      </div>
      <div className="max-lg:py-4 lg:p-1">
        <ProductNotificationSetting
          productId={props.productId}
          variantId={props.variantId}
          type="AmazingDiscount"
          buttonClassName="relative group flex w-full justify-between items-center"
        >
            <div className="inline-flex items-center gap-3">
              <Bell className="w-7 h-7 lg:w-6 lg:h-6 fill-current" />
              <div className="lg:hidden">اطلاع رسانی شگفت انگیز </div>
            </div>
            <div
              className={`lg:hidden w-10 h-5 bg-white border border-neutral-300 dark:border-white rounded-full flex p-0.5 dark:p-px ${notificationIsActive ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`shrink-0 aspect-square rounded-full ${notificationIsActive ? "bg-gradient-green" : "bg-gradient-gray"}`}
              />
            </div>

            <div className="max-lg:hidden opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible absolute right-full top-1/2 -translate-y-1/2 text-xs bg-white/70 p-3 whitespace-nowrap text-black rounded-lg mr-2 group-hover:mr-1 transition-all">
              اطلاع رسانی شگفت انگیز
            </div>
        </ProductNotificationSetting>
      </div>
    </>
  );
};

export default More;
