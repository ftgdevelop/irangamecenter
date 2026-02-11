/* eslint-disable  @typescript-eslint/no-explicit-any */

import MoreIcon from "@/components/icons/MoreIcon";
import ModalPortal from "../ModalPortal";
import { useEffect, useState } from "react";
import { setBodiScrollPosition, setBodyScrollable } from "@/redux/stylesSlice";
import { useAppDispatch } from "@/hooks/use-store";
import CloseSimple from "@/components/icons/CloseSimple";
import AddToWishList from "./AddToWishList";
import Share from "./Share";
import ProductNotificationSetting from "./ProductNotificationSetting";
import Bell from "@/components/icons/Bell";

type Props = {
  productId: number;
}
const More: React.FC<Props> = props => {
  const dispatch = useAppDispatch();

  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [slideInDetails, setSlideInDetails] = useState<boolean>(false);

  const [notificationSettingMode, setNotificationSettingMode] = useState<boolean>(false);

  useEffect(() => {
    if (openDetails) {
      setSlideInDetails(true);
      dispatch(setBodyScrollable(false));
      dispatch(setBodiScrollPosition(window?.pageYOffset || 0));
    } else {
      dispatch(setBodyScrollable(true));
    }
  }, [openDetails]);

  useEffect(() => {
    if (!slideInDetails) {
      setTimeout(() => {
        setOpenDetails(false);
        setNotificationSettingMode(false);
      }, 300);
    }
  }, [slideInDetails]);

  const notificationIsActive = true;

  return (
    <>
      <button 
        type="button"  
        aria-label="بیشتر"
        onClick={()=>{setOpenDetails(true)}}
      >
        <MoreIcon className="w-7 h-7 stroke-current fill-none stroke-2" />
      </button>
      <ModalPortal show={openDetails} selector="modal_portal">
        <div
          className="bg-black/50 backdrop-blur-sm fixed top-0 left-0 right-0 bottom-0"
          onClick={() => {
            setSlideInDetails(false);
          }}
        />

        <div
          className={`bg-white dark:bg-[#192a39] text-neutral-800 pb-10 dark:text-white rounded-t-2xl max-h-95-screen hidden-scrollbar overflow-y-auto fixed w-full md:max-w-lg safePadding-b transition-all left-0 max-md:right-0 md:right-1/2 md:translate-x-1/2 ${slideInDetails ? "bottom-0" : "-bottom-[80vh]"}`}
        >
          <div className="flex flex-col justify-between text-xs">
            
            <div className="mb-5 flex justify-between items-center pt-5 px-4 mb-4">

              {notificationSettingMode ? (
                <b className="font-semibold text-sm"> نحوه اطلاع رسانی شگفت انگیز </b>
              ):(
                <div />
              )}
            
              <button
                type="button"
                onClick={() => {
                  setSlideInDetails(false);
                }}
              >
                <CloseSimple className="w-6 h-6 fill-current" />
              </button>
            </div>

            <div className="px-4">
              {notificationSettingMode ? (
                <ProductNotificationSetting />
              ):(
                <>
                  <div className="py-4 border-b border-neutral-300 dark:border-white/30">
                    <AddToWishList productId={props.productId} />
                  </div>
                  <div className="py-4 border-b border-neutral-300 dark:border-white/30">
                    <Share
                      iconClassName="w-7 h-7 fill-current"
                      buttonClassName="inline-flex items-center gap-3" 
                      label="به اشتراک گذاری" 
                    />
                  </div>
                  <div className="py-4">
                    <button
                        type="button" 
                        className="flex w-full justify-between items-center"
                        onClick={()=>{setNotificationSettingMode(true)}}
                    >
                      <div className="inline-flex items-center gap-3">
                        <Bell className="w-7 h-7 fill-current" />
                        اطلاع رسانی شگفت انگیز
                      </div>

                      <div
                        className={`w-10 h-5 bg-white border border-neutral-300 dark:border-white block rounded-full flex p-0.5 dark:p-px ${notificationIsActive?"justify-end":"justify-start"}`}
                      >
                        <div className={`shrink-0 aspect-square rounded-full ${notificationIsActive?"bg-gradient-green":"bg-gradient-gray"}`} />
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </ModalPortal>
    </>
  );
};

export default More;
