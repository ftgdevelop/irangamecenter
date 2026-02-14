/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useAppSelector } from "@/hooks/use-store";
import { toPersianDigits } from "@/helpers";
import CheckboxGroup from "../../CheckboxGroup";
import { useState } from "react";
import { notificationUpsert } from "@/actions/commerce";
import Loading from "@/components/icons/Loading";

type Props = {
  className?: string;
  productId: number;
};

const ProductNotificationSetting: React.FC<Props> = (props) => {
  console.log(props);

  type ValidTypes = "Email" | "Sms" | "InAppNotification";

  const userInfo = useAppSelector((state) => state.authentication.user);

  const [selectedTypes, setSelectedTypes] = useState<ValidTypes[]>([]);
  const [loading, setLoading] = useState(false);

  const submitHandle = async () => {
    
    const userToken = localStorage.getItem("Token");
    if (!userToken) return;
    
    setLoading(true);
    const response: any = await notificationUpsert({
      channels:selectedTypes,
      productId:props.productId,
      type:"AmazingDiscount"
    }, userToken);
    
    setLoading(false);
    
    if (response.data){
      debugger;
    }
  }

  return (
    <div className="text-xs pb-5">

      <CheckboxGroup 
        items={[
          {
            label:`ارسال ایمیل به  ${userInfo?.emailAddress || "no email address founded"}`,
            value:"Email"
          },
          {
            label:`ارسال پیامک به   ${userInfo?.phoneNumber? toPersianDigits(userInfo.phoneNumber.replace("+98", "0")) : "no phoneNumber founded"} `,
            value:"Sms"
          },
          {
            label:"نمایش نوتیفیکیشن در اپلیکیشن",
            value:"Notification"
          }
        ]}
        onChange={v => {setSelectedTypes(v as ValidTypes[])}}
        values={selectedTypes}
        itemsClassname="mb-2"
      />

      <button
        type="button"
        className="block text-center bg-gradient-violet text-white rounded-full px-3 w-full text-sm py-3 my-7"
        onClick={submitHandle}
      >
        ثبت
        {loading && <Loading className="inline-block animate-spin w-5 h-5 mr-2 fill-current" />}
      </button>
    </div>
  );
};

export default ProductNotificationSetting;
