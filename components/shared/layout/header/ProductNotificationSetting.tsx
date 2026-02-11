import Checkbox from "../../Checkbox";
import { useAppSelector } from "@/hooks/use-store";
import { toPersianDigits } from "@/helpers";

type Props = {
  className?: string;
};

const ProductNotificationSetting: React.FC<Props> = (props) => {
  console.log(props);

  const userInfo = useAppSelector((state) => state.authentication.user);

  return (
    <div className="text-xs pb-5">
      <Checkbox
        label={`ارسال ایمیل به  ${userInfo?.emailAddress || "no email address founded"}`}
        value=""
        block
        onChange={() => {}}
        className="mb-2 mt-3"
      />

      {userInfo?.phoneNumber ? (
        <Checkbox
          label={`ارسال پیامک به   ${toPersianDigits(userInfo.phoneNumber.replace("+98", "0")) || "no phoneNumber founded"} `}
          value=""
          block
          onChange={() => {}}
          className="mb-2"
        />
      ) : (
        <div> شماره تلفنی ثبت نشده است. </div>
      )}

      <button
        type="button"
        className="block text-center bg-gradient-violet text-white rounded-full px-3 w-full text-sm py-3 my-5"
      >
        ثبت
      </button>
    </div>
  );
};

export default ProductNotificationSetting;
