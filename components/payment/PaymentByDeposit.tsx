import { numberWithCommas } from "@/helpers";
import CheckIcon from "../icons/CheckIcon";
import InfoCircle from "../icons/InfoCircle";
import { useAppSelector } from "@/hooks/use-store";
import Skeleton from "../shared/Skeleton";

const PaymentByDeposit = () => {

    const isSelected = true;
    const balance = useAppSelector(state => state.authentication.balance);
    const getUserLoading = useAppSelector(state => state.authentication.getUserLoading);
    const balanceLoading = useAppSelector(state => state.authentication.balanceLoading);

  return (
    <div className="mb-7">
      <div className="flex flex-wrap gap-2 items-center justify-between mb-3">
        <h5>کیف پول</h5>

        <span className="text-[11px] text-[#aa3aff]">
          برداشت از موجودی کیف پول
        </span>
      </div>

      <p className="mb-2 text-sm">
        <InfoCircle className="inline-block w-5 h-5 fill-current ml-1" /> بازگشت
        وجه طبق قوانین محصول و پس از کسر جریمه انجام می‌شود.{" "}
      </p>

      <button
        type="button"
        className={`w-full p-[2px] rounded-[15px] mt-3 ${
          isSelected
            ? "bg-gradient-to-t from-[#01b59c] to-[#9afeab] text-white"
            : "bg-[#192a39]"
        }`}
        // onClick={() => {
        //   setSelectedGatewayId(gatewayItem.id);
        // }}
      >
        <div
          className={`flex rounded-[13px] items-center justify-between p-5 ${
            isSelected
              ? "bg-gradient-to-t from-[#012431] to-[#0f2b32] text-white"
              : ""
          }`}
        >
          <div className="flex gap-3 items-center">
            <div
              className={`w-7 h-7 rounded-full border inline-flex justify-center items-center ${
                isSelected
                  ? "bg-gradient-to-t from-[#01b59c] to-[#9afeab] border-[#01b59c]"
                  : "border-white"
              }`}
            >
              {isSelected && (
                <CheckIcon className="w-5 h-5 fill-current" />
              )}
            </div>
            ایران گیم سنتر
          </div>
          
          <div className="text-left">
            <div className="text-xs mb-2">
                موجودی
            </div>
            {balanceLoading || getUserLoading ? (
                <Skeleton className="w-24 h-3" dark />
            ): balance ? (
            <div className="text-[#2ac99f]"> {numberWithCommas(balance)} تومان </div>
            ) : (
                <div className="text-red-600 text-xs"> کیف پول شما خالی است </div>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default PaymentByDeposit;
